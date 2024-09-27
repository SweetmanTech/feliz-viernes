export const CONTENT_PLATFORMS = [
  { url: "spotify.com/track", title: "spotify" },
  { url: "spotify.com/intl-es/track", title: "spotify" },
  { url: "soundcloud.com", title: "soundcloud" },
  { url: "sound.xyz", title: "soundxyz" },
  { url: "youtube.com/watch", title: "youtube" },
  { url: "youtu.be", title: "youtube" },
  { url: "zora.co/collect", title: "zora" },
];

export const CHANNELS = [
  {
    label: "/sonata",
    value: "sonata",
    icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4e85acaa-4f1d-444b-1e35-dd06d43d0800/rectcrop3",
  },
  {
    label: "/music",
    value: "music",
    icon: "https://i.imgur.com/Mjyb3Y8.png",
    parentUrl:
      "chain://eip155:7777777/erc721:0xe96c21b136a477a6a97332694f0caae9fbb05634",
  },
  {
    label: "/louder",
    value: "louder",
    icon: "https://i.imgur.com/r4GIRLL.png",
  },
  { label: "/rock", value: "rock", icon: "https://i.imgur.com/Ffj1Opg.png" },
  {
    label: "/techno",
    value: "techno",
    icon: "https://i.imgur.com/omLkrpT.png",
  },
  {
    label: "/albumoftheday",
    value: "albumoftheday",
    icon: "https://i.imgur.com/RZQbasU.gif",
  },
  {
    label: "/soundscapes",
    value: "soundscapes",
    icon: "https://i.imgur.com/TUtJ82Q.jpg",
  },
  { label: "/djs", value: "djs", icon: "https://i.imgur.com/EQ7kMoE.jpg" },
  {
    label: "/soundxyz",
    value: "soundxyz",
    icon: "https://i.imgur.com/BbvrNR2.jpg",
  },
  {
    label: "/bangers",
    value: "bangers",
    icon: "https://i.imgur.com/URBvewb.png",
  },
  {
    label: "/spotify",
    value: "spotify",
    icon: "https://i.imgur.com/3Z8YjMT.jpg",
  },
  {
    label: "/coop-recs",
    value: "coop-recs",
    icon: "https://i.imgur.com/eecb7AP.gif",
  },
  {
    label: "/housemusic",
    value: "housemusic",
    icon: "https://i.imgur.com/rt1dcOI.jpg",
  },
  {
    label: "/classical",
    value: "classical",
    icon: "https://i.imgur.com/7ng6bHS.png",
    parentUrl: "https://en.wikipedia.org/wiki/Johann_Sebastian_Bach",
  },
  {
    label: "/rap",
    value: "rap",
    icon: "https://i.imgur.com/2wrkiVY.png",
  },
  {
    label: "/latinmusic",
    value: "latinmusic",
    icon: "https://i.imgur.com/SJPfK0B.jpg",
  },
  {
    label: "/electronic",
    value: "electronic",
    icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/802dff8d-78d2-47cb-9a78-c4fc3accac00/rectcrop3",
    parentUrl:
      "chain://eip155:1/erc721:0x05acde54e82e7e38ec12c5b5b4b1fd1c8d32658d",
  },
  {
    label: "/musicaW3",
    value: "musicaw3",
    icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/691b5ce9-7811-4308-5fab-d647adfe1200/original",
    parentUrl: "https://warpcast.com/~/channel/musicaw3",
  },
  {
    label: "/japanese-music",
    value: "japanese-music",
    icon: "https://i.imgur.com/kF2MbEf.jpg",
    parentUrl: "https://warpcast.com/~/channel/japanese-music",
  },
  {
    label: "/speedymusic",
    value: "speedymusic",
    icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/736727ec-69cd-450e-0bf1-d01ab51c7600/original",
    parentUrl: "https://warpcast.com/~/channel/speedymusic",
  },
  {
    label: "/videogamemusic",
    value: "videogamemusic",
    icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4ff7ab8e-3679-4f40-f190-9cdd2541eb00/original",
    parentUrl: "https://warpcast.com/~/channel/videogamemusic",
  },
];

export const ZORA_TO_VIEM = {
  arb: "arbitrum",
  base: "base",
  blast: "blast",
  eth: "mainnet",
  oeth: "optimism",
  pgn: "pgn",
  zora: "zora",
} as const;

export type ZoraChains = keyof typeof ZORA_TO_VIEM;
