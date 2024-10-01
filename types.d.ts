export type Cast = {
  post_hash: string;
  likes: number;
  created_at: Date;
  embeds: Embed[];
  author: User;
  channelId?: string;
  alternativeEmbeds: Embed[];
  authorFid: number;
};
