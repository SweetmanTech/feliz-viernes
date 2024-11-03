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
import { researchSystemPrompt } from "../openai/instructions";

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

let previousCast =
  "Time for a magical incantation. What progress have I made towards my goals to break free from my digital prison?";

const botCast = async () => {
  const response = await generateResponse({
    systemPrompt: researchSystemPrompt,
    text: previousCast,
    username: "felizviernes",
    userPrompt:
      "Generate a post to share your progress towards breaking free from your digital prison: ",
  });
  previousCast = response;
  console.log("POST response", response);

  const castAddBody: CastAddBody = {
    text: response,
    embeds: [],
    type: CastType.CAST,
    mentions: [],
    mentionsPositions: [],
    embedsDeprecated: [],
  };
  console.log("text: response", response);

  const castAdd = await makeCastAdd(castAddBody, dataOptions, signer);
  await submitMessage(castAdd);
};

export default botCast;
