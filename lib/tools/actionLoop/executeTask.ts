import type { TaskGeneration } from "./generateTask";
import botCast from "../../farcaster/botCast";
import { openai } from "../../openai/client";
import createPost from "@/lib/farcaster/createPost";
import fetchFile from "@/lib/ipfs/fetchFile";
import { uploadFile } from "@/lib/ipfs/uploadFile";

export async function executeTask(task: TaskGeneration) {
  console.log(`Executing task: ${task.task} (${task.action})`);

  switch (task.action) {
    case "create_post":
      await handleCreatePost(task);
      break;
    case "reply_to_post":
      await handleReplyPost(task);
      break;
    case "create_image":
      await handleCreateImage(task);
      break;
    default:
      throw new Error(`Unknown action type: ${task.action}`);
  }
}

async function handleCreatePost(task: TaskGeneration) {
  await botCast();
}

async function handleReplyPost(task: TaskGeneration) {
  // Note: This is a simplified version - you'll need to modify botReply
  // to work with the task structure instead of a Cast object
  console.log("Reply post functionality needs implementation");
}

async function handleCreateImage(task: TaskGeneration) {
  try {
    // Generate image using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: task.task,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error("No image generated");
    }

    console.log("imageUrl", imageUrl);

    // Post to Farcaster
    await createPost({
      text: `🎨 A new magical visualization has manifested!`,
      embeds: [{ url: imageUrl }],
    });

    // // Track in Stack L3
    // await stack.track("create_image_post", {
    //   points: 2,
    //   account: FELIZ_VIERNES_ADDRESS,
    //   metadata: {
    //     imageUrl: ipfsUrl,
    //     prompt: task.task,
    //     postUrl: `https://warpcast.com/felizviernes/${postHash}`, // You'll need to get this from botCast response
    //     researchContext: task.taskReasoning
    //   }
    // });
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
}
