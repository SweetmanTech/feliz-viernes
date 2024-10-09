import * as ed from "@noble/ed25519";
import axios from "axios";
import { toHex } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { sha512 } from "@noble/hashes/sha512";

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const privateKey = ed.utils.randomPrivateKey();
console.log("pvt key", toHex(privateKey));
const publicKeyBytes = ed.getPublicKey(privateKey);
const publicKey = toHex(publicKeyBytes);

/*** Generating a Signed Key Request signature ***/

const appFid = process.env.APP_FID;
const appMnemonic = process.env.APP_MNEMONIC;

if (!appFid || !appMnemonic) {
  throw new Error("APP_FID or APP_MNEMONIC is not set");
}

const account = mnemonicToAccount(appMnemonic);
const deadline = Math.floor(Date.now() / 1000) + 86400;
// signature is valid for 1 day

const signature = await account.signTypedData({
  domain: {
    name: "Farcaster SignedKeyRequestValidator",
    version: "1",
    chainId: 10,
    verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
  },
  types: {
    SignedKeyRequest: [
      { name: "requestFid", type: "uint256" },
      { name: "key", type: "bytes" },
      { name: "deadline", type: "uint256" },
    ],
  },
  primaryType: "SignedKeyRequest",
  message: {
    requestFid: BigInt(appFid),
    key: publicKey,
    deadline: BigInt(deadline),
  },
});

/*** Creating a Signed Key Request ***/

const {
  data: { result },
} = await axios.post(`https://api.warpcast.com/v2/signed-key-requests`, {
  requestFid: appFid,
  key: publicKey,
  deadline,
  signature,
});

console.log(result);
