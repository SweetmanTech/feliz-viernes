import { Message, MessageType } from "@farcaster/hub-nodejs";
import getValidEmbed from "@/lib/getValidEmbed";
import getChannelIdFromCast from "@/lib/getChannelIdFromCast";
import { toHex } from "viem";
import getDate from "@/lib/farcaster/getDate";
import getUserDataByFid from "@/lib/farcaster/getUserByFid";
import getAlternativeEmbeds from "@/lib/getAlternativeEmbeds";
import botCast from "@/lib/farcaster/botCast";

const processMessage = async (message: Message) => {
  const messageData = message.data;
  if (
    !(
      messageData &&
      messageData.type === MessageType.CAST_ADD &&
      messageData.castAddBody
    )
  ) {
    return;
  }

  const { castAddBody } = messageData;
  // TODO: filer on posts from SWEETMAN_ETH in a geners shouldReply filter lib.
  // const validEmbed = await getValidEmbed(castAddBody);
  // if (!(validEmbed && validEmbed.url)) {
  //   return;
  // }

  const channelId = getChannelIdFromCast(castAddBody);
  const authorFid = messageData.fid;
  const author = await getUserDataByFid(authorFid);

  const newCast = {
    post_hash: toHex(message.hash),
    likes: 0,
    created_at: getDate(messageData.timestamp),
    author,
    channelId,
    authorFid,
  };

  console.log(newCast);
  // await botCast(newCast);
};

export default processMessage;
