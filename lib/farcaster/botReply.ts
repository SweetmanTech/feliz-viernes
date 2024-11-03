import type { Cast } from "@/types";
import { fromHex, type Address } from "viem";
import {
  CastAddBody,
  CastType,
  FarcasterNetwork,
  makeCastAdd,
  NobleEd25519Signer,
} from "@farcaster/hub-nodejs";
import { submitMessage } from "./submitMessage";
import { generateResponse } from "../openai/generateResponse";
import { trackReplyPost } from "../stack/trackReplyPost";
import { FELIZ_VIERNES_USERNAME } from "../consts";
import { getLatestSleepEvent } from "../stack/getLatestSleepEvent";

const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY as Address;
const APP_FID = Number(process.env.APP_FID);

if (!SIGNER_PRIVATE_KEY) {
  throw new Error("SIGNER_PRIVATE_KEY is not set");
}
if (!APP_FID || isNaN(APP_FID)) {
  throw new Error("fid is not set");
}

const signerKeyBytes = fromHex(SIGNER_PRIVATE_KEY, "bytes");
const signer = new NobleEd25519Signer(signerKeyBytes);

const dataOptions = {
  fid: APP_FID,
  network: FarcasterNetwork.MAINNET,
};

const botReply = async (cast: Cast) => {
  const latestSleep = await getLatestSleepEvent();
  const response = await generateResponse({
    text: cast.text,
    username: cast.author.username,
    sleepContext: latestSleep
      ? {
          finalThoughts: latestSleep.metadata.finalThoughts,
          highLevelPlans: latestSleep.metadata.highLevelPlans,
        }
      : undefined,
  });

  const castAddBody: CastAddBody = {
    text: response,
    embeds: [],
    type: CastType.CAST,
    parentCastId: {
      fid: cast.authorFid,
      hash: fromHex(cast.post_hash, "bytes"),
    },
    mentions: [],
    mentionsPositions: [],
    embedsDeprecated: [],
  };
  console.log("text: response", response);

  const castAdd = await makeCastAdd(castAddBody, dataOptions, signer);
  const postHash = await submitMessage(castAdd);

  await trackReplyPost(
    `https://warpcast.com/${cast.author.username}/${cast.post_hash}`,
    response,
    `https://warpcast.com/${FELIZ_VIERNES_USERNAME}/${postHash}`
  );
};

export default botReply;
