import { Message, MessageType } from "@farcaster/hub-nodejs";
import getValidEmbed from "../getValidEmbed";
import getChannelIdFromCast from "../getChannelIdFromCast";
import { toHex } from "viem";
import getDate from "./getDate";
import getUserDataByFid from "./getUserByFid";

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

  const cast = messageData.castAddBody;
  const validEmbed = await getValidEmbed(cast);
  if (!validEmbed) {
    return;
  }

  const channelId = getChannelIdFromCast(cast);
  const authorFid = messageData.fid;
  const author = await getUserDataByFid(authorFid);

  console.log({
    post_hash: toHex(message.hash),
    // likes,
    created_at: getDate(messageData.timestamp),
    embeds: [validEmbed],
    author,
    channelId,
    // alternativeEmbeds,
    authorFid,
  });
};

export default processMessage;
