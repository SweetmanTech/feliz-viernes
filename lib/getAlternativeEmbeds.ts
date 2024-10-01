const getAlternativeEmbeds = async (url: string) => {
  const songLinkData = await fetch(
    `https://api.song.link/v1-alpha.1/links?url=${url}&userCountry=US&songIfSingle=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());

  const alternativeEmbeds = Object.values(songLinkData.linksByPlatform).map(
    ({ url }: any) => url
  );
  return alternativeEmbeds;
};

export default getAlternativeEmbeds;
