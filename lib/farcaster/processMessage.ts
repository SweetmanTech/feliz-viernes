import { Message, MessageType } from "@farcaster/hub-nodejs";
import getChannelIdFromCast from "@/lib/getChannelIdFromCast";
import { toHex } from "viem";
import getDate from "@/lib/farcaster/getDate";
import getUserDataByFid from "@/lib/farcaster/getUserByFid";
import shouldReply from "@/lib/shouldReply";
import botCast from "@/lib/farcaster/botCast";

const processMessage = async (message: Message) => {
  const messageData = message.data;
  if (!messageData) {
    return;
  }

  const authorFid = messageData.fid;
  console.log(authorFid);
  const author = await getUserDataByFid(authorFid);
  console.log(author.username);

  const newCast = {
    post_hash: toHex(message.hash),
    likes: 0,
    created_at: getDate(messageData.timestamp),
    author,
    authorFid,
    embeds: [],
    alternativeEmbeds: [],
  };

  // Check if we should reply to this cast
  const { isFromSweetman, reason } = shouldReply(newCast);

  if (isFromSweetman) {
    console.log(`Replying to cast from sweetman.eth: ${newCast.post_hash}`);
    await botCast(newCast);
  }
};

export default processMessage;
