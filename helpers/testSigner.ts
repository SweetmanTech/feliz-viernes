import { fromHex, type Address } from "viem";
import {
  CastAddBody,
  CastType,
  FarcasterNetwork,
  makeCastAdd,
  NobleEd25519Signer,
} from "@farcaster/hub-nodejs";
import { submitMessage } from "@/lib/farcaster/submitMessage";

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

const castAddBody: CastAddBody = {
  text: `Hello World!`,
  embeds: [],
  type: CastType.CAST,
  mentions: [],
  mentionsPositions: [],
  embedsDeprecated: [],
};

const castAdd = await makeCastAdd(castAddBody, dataOptions, signer);
await submitMessage(castAdd);
console.log("Casted Successfully!");
