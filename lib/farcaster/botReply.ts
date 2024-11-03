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
  // Generate magical response
  const response = await generateResponse({
    text: cast.text, // You'll need to add this to your Cast type
    username: cast.author.username,
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
  await submitMessage(castAdd);
};

export default botReply;
