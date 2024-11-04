import {
  FarcasterNetwork,
  makeCastAdd,
  NobleEd25519Signer,
} from "@farcaster/hub-nodejs";
import { CastType } from "@farcaster/hub-nodejs";
import type { CastAddBody, Embed } from "@farcaster/hub-nodejs";
import { fromHex, type Address } from "viem";
import { submitMessage } from "./submitMessage";
import { trackCreatePost } from "../stack/trackCreatePost";
import { FELIZ_VIERNES_USERNAME } from "../consts";

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

const createPost = async ({
  text,
  embeds = [],
}: {
  text: string;
  embeds?: Embed[];
}) => {
  const castAddBody: CastAddBody = {
    text,
    embeds,
    type: CastType.CAST,
    mentions: [],
    mentionsPositions: [],
    embedsDeprecated: [],
  };
  console.log("text: response", text);

  const castAdd = await makeCastAdd(castAddBody, dataOptions, signer);
  const postHash = await submitMessage(castAdd);

  await trackCreatePost(
    text,
    `https://warpcast.com/${FELIZ_VIERNES_USERNAME}/${postHash}`
  );
};

export default createPost;
