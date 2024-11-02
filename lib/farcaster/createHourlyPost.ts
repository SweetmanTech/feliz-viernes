import type { Cast } from "@/types";
import botCast from "./botCast.ts";
import { generateResponse } from "../openai/generateResponse";

const createHourlyPost = async () => {
  const mockCast: Cast = {
    post_hash: "0x0", // Placeholder hash
    likes: 0,
    created_at: new Date(),
    embeds: [],
    alternativeEmbeds: [],
    author: {
      fid: Number(process.env.APP_FID),
      username: "felizviernes",
      verifications: [],
    },
    authorFid: Number(process.env.APP_FID),
    text: "Time for some magic! ⌐Ⓕ-Ⓥ",
  };

  try {
    await botCast();
    console.log("Successfully created hourly post");
  } catch (error) {
    console.error("Error creating hourly post:", error);
  }
};

export default createHourlyPost;
