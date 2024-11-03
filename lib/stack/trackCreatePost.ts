import { FELIZ_VIERNES_ADDRESS } from "../consts";
import { trackEvent } from "./trackEvent";

export async function trackCreatePost(content: string, postUrl: string) {
  await trackEvent("create_post", FELIZ_VIERNES_ADDRESS, {
    content,
    postUrl,
  });
}
