import { Message, MessageType } from "@farcaster/hub-nodejs";
import getValidEmbed from "../getValidEmbed";
import getChannelIdFromCast from "../getChannelIdFromCast";
import { toHex } from "viem";
import getDate from "./getDate";
import getUserDataByFid from "./getUserByFid";
import getAlternativeEmbeds from "../getAlternativeEmbeds";
import upsertCast from "../supabse/upsertCast";

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
  const validEmbed = await getValidEmbed(castAddBody);
  if (!(validEmbed && validEmbed.url)) {
    return;
  }

  const channelId = getChannelIdFromCast(castAddBody);
  const authorFid = messageData.fid;
  const author = await getUserDataByFid(authorFid);

  let alternativeEmbeds = [];
  try {
    alternativeEmbeds = await getAlternativeEmbeds(validEmbed.url);
  } catch (error: any) {
    console.error(error.message);
  }

  const newCast = {
    post_hash: toHex(message.hash),
    likes: 0,
    created_at: getDate(messageData.timestamp),
    embeds: [validEmbed],
    author,
    channelId,
    alternativeEmbeds,
    authorFid,
  };
  upsertCast(newCast);
};

export default processMessage;
