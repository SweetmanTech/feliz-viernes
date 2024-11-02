import type { Address } from "viem";

export type Cast = {
  post_hash: Address;
  likes: number;
  created_at: Date;
  embeds: Embed[];
  author: User;
  channelId?: string;
  alternativeEmbeds: Embed[];
  authorFid: number;
  text: string;
};
