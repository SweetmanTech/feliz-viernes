import { CONTENT_PLATFORMS } from "./consts";

const getPlatformFromUrl = (url: string) => {
  const platform = CONTENT_PLATFORMS.find((platform) =>
    url.includes(platform.url)
  );
  return platform?.title;
};

export default getPlatformFromUrl;
