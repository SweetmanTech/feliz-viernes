import { type HubResult, type Message } from "@farcaster/hub-nodejs";
import farcasterClient from "./client";

export const submitMessage = async (message: HubResult<Message>) => {
  if (message.isErr()) {
    throw new Error(`Error creating message: ${message.error}`);
  }
  const messageSubmitResult = await farcasterClient.submitMessage(
    message.value
  );
  if (messageSubmitResult.isErr()) {
    throw new Error(
      `Error submitting message to hub: ${messageSubmitResult.error}`
    );
  }
};
