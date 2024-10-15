import type { CastAddBody } from "@farcaster/hub-nodejs";
import getPlatformFromUrl from "./getPlatformFromUrl";
import { CHANNELS } from "./consts";
import getChannelIdFromCast from "./getChannelIdFromCast";
import getZoraMetadata from "./zora/getZoraMetadata";

export default async function getValidEmbed(cast: CastAddBody) {
  const embeds = cast.embeds;

  for (const embed of embeds) {
    const { url } = embed;
    if (!url) continue;

    const platform = getPlatformFromUrl(url);
    if (!platform) continue;

    if (platform === "youtube") {
      const channelId = getChannelIdFromCast(cast);
      if (
        !CHANNELS.some(
          (supportedChannel) => supportedChannel.value === channelId
        )
      ) {
        continue;
      }
    }

    if (platform === "zora") {
      const metadata = await getZoraMetadata(url);
      if (
        !(
          metadata &&
          metadata?.content &&
          metadata.content?.mime &&
          metadata.content?.uri &&
          metadata.content?.mime.includes("audio")
        )
      ) {
        continue;
      }
    }

    return { ...embed, platform };
  }

  return undefined;
}
