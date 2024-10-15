import farcasterClient from "@/lib/farcaster/client";
import { UserDataType } from "@farcaster/hub-nodejs";
import { type User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { toHex } from "viem";

const getUserByFid = async (fid: number, retry = 0) => {
  const user: Partial<User> = {
    fid,
    verifications: [],
  };

  const userDataResult = await farcasterClient.getAllUserDataMessagesByFid({
    fid,
  });
  userDataResult.map((userData) => {
    userData.messages.forEach((message) => {
      const body = message?.data?.userDataBody;
      if (!body) return;
      const dataValue = body.value;
      const dataType = body.type;

      if (dataType === UserDataType.USERNAME) {
        user.username = dataValue;
      } else if (dataType === UserDataType.PFP) {
        user.pfp_url = dataValue;
      } else if (dataType === UserDataType.DISPLAY) {
        user.display_name = dataValue;
      } else if (dataType === UserDataType.BIO) {
        user.profile = { bio: { text: dataValue, mentioned_profiles: [] } };
      }
    });
  });

  const verificationsResult = await farcasterClient.getVerificationsByFid({
    fid,
  });

  verificationsResult.map((verifications) => {
    verifications.messages.forEach((message) => {
      const body = message?.data?.verificationAddAddressBody;
      if (!body) return;
      const address = toHex(body.address);
      user.verifications!.push(address);
    });
  });

  if (!(user.username && user.display_name && user.pfp_url)) {
    if (retry === 2) {
      throw new Error("User not found");
    }
    return getUserByFid(fid, retry + 1);
  }
  return user;
};

export default getUserByFid;
