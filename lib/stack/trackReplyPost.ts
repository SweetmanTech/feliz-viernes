import { FELIZ_VIERNES_ADDRESS } from "../consts";
import { trackEvent } from "./trackEvent";

export async function trackReplyPost(
  parentPost: string,
  content: string,
  postUrl: string
) {
  await trackEvent("reply_post", FELIZ_VIERNES_ADDRESS, {
    parentPost,
    content,
    postUrl,
  });
}
