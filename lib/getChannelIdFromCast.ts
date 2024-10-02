import type { CastAddBody } from "@farcaster/hub-nodejs";
import { CHANNELS } from "./consts";

export default function getChannelIdFromCast(cast: CastAddBody) {
  const parentUrl = cast.parentUrl;

  if (parentUrl) {
    const match = /\/channel\/([^/]+)$/.exec(parentUrl);
    if (match) return match[1];

    return CHANNELS.find((val) => val.parentUrl == parentUrl)?.value;
  }
}
