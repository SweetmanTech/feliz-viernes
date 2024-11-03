import { Message } from "@farcaster/hub-nodejs";
import { toHex } from "viem";
import getDate from "@/lib/farcaster/getDate";
import getUserDataByFid from "@/lib/farcaster/getUserByFid";
import botReply from "@/lib/farcaster/botReply";

const processMessage = async (message: Message) => {
  const messageData = message.data;
  if (!messageData) {
    return;
  }

  const authorFid = messageData.fid;
  const author = await getUserDataByFid(authorFid);

  const newCast = {
    post_hash: toHex(message.hash),
    likes: 0,
    created_at: getDate(messageData.timestamp),
    author,
    authorFid,
    embeds: [],
    alternativeEmbeds: [],
    text: (messageData as any)?.text || "",
  };

  console.log(`Replying to cast from sweetman.eth: ${newCast.post_hash}`);
  await botReply(newCast);
};

export default processMessage;
