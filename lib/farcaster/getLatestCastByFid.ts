import farcasterClient from "./client";
import { toHex } from "viem";
import getDate from "./getDate";
import type { Cast } from "@/types";
import getUserByFid from "./getUserByFid";

const getLatestCastByFid = async (fid: number): Promise<Cast | null> => {
  const castsResult = await farcasterClient.getCastsByFid({
    fid,
    pageSize: 1,
    reverse: true,
  });

  if (!castsResult.isOk()) {
    throw new Error(`Failed to get casts: ${castsResult.error}`);
  }

  const messages = castsResult.value.messages;
  if (messages.length === 0) {
    return null;
  }

  const message = messages[0];
  const messageData = message.data;

  if (!messageData) {
    return null;
  }

  const author = await getUserByFid(fid);

  const cast: Cast = {
    post_hash: toHex(message.hash),
    likes: 0, // We would need a separate call to get likes count
    created_at: getDate(messageData.timestamp),
    author,
    authorFid: fid,
    embeds: [],
    alternativeEmbeds: [],
    text: messageData.castAddBody?.text || "",
  };

  return cast;
};

export default getLatestCastByFid;
