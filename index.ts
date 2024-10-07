import getStream from "@/lib/farcaster/client/getStream";
import processMessage from "@/lib/farcaster/processMessage";
import farcasterClient from "./lib/farcaster/client";
import clientReady from "./lib/farcaster/client/clientReady";

const init = async () => {
  console.log("Starting Farcaster GRPC Indexer");
  let messageCount = 0;
  await clientReady(farcasterClient);
  const stream = await getStream(farcasterClient);

  for await (const event of stream) {
    messageCount++;
    if (messageCount % 1000 === 0) {
      console.log("Processed", messageCount, "messages");
    }
    try {
      const message = event.mergeMessageBody.message;
      await processMessage(message);
    } catch (error: any) {
      console.error("Error processing message:", error.message);
    }
  }
};

init();
