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

const botCast = async (cast: Cast) => {
  const castAddBody: CastAddBody = {
    text: `This song is now available on  where you earn NOTES when people tip you.\n\nSee you over there!\n\nhttps://sonata.tips/cast/${
      cast.author.username
    }/${cast.post_hash.substring(0, 8)}`,
    embeds: [
      {
        url: `https://www.sonata.tips/api/frame?post_hash=${cast.post_hash.substring(
          0,
          8
        )}`,
      },
    ],
    type: CastType.CAST,
    parentCastId: {
      fid: cast.authorFid,
      hash: fromHex(cast.post_hash, "bytes"),
    },
    mentions: [],
    mentionsPositions: [],
    embedsDeprecated: [],
  };

  const castAdd = await makeCastAdd(castAddBody, dataOptions, signer);
  await submitMessage(castAdd);
};

export default botCast;
