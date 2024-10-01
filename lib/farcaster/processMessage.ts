import { Message, MessageType } from "@farcaster/hub-nodejs";
import getValidEmbed from "../getValidEmbed";
import getChannelIdFromCast from "../getChannelIdFromCast";
import { toHex } from "viem";
import getDate from "./getDate";
import getUserDataByFid from "./getUserByFid";
import getAlternativeEmbeds from "../getAlternativeEmbeds";

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
  if (!(validEmbed && validEmbed.url)) {
    return;
  }

  const channelId = getChannelIdFromCast(cast);
  const authorFid = messageData.fid;
  const author = await getUserDataByFid(authorFid);

  const alternativeEmbeds = await getAlternativeEmbeds(validEmbed.url);

  console.log({
    post_hash: toHex(message.hash),
    likes: 0,
    created_at: getDate(messageData.timestamp),
    embeds: [validEmbed],
    author,
    channelId,
    alternativeEmbeds,
    authorFid,
  });
};

export default processMessage;
