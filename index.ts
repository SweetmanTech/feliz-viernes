import getStream from "@/lib/farcaster/client/getStream";
import processMessage from "@/lib/farcaster/processMessage";
import farcasterClient from "./lib/farcaster/client";

let messageCount = 0;
const lastEventFile = Bun.file("./lastEventId.txt");

const init = async () => {
  console.log("Starting Farcaster GRPC Indexer");
  farcasterClient.$.waitForReady(Date.now() + 5000, async (e) => {
    if (e) {
      console.error(`Farcaster client failed to connect`);
      process.exit(1);
    }
    const lastEventId = (await lastEventFile.exists())
      ? Number(await lastEventFile.text())
      : undefined;

    if (lastEventId) {
      console.log(`Resuming from event ${lastEventId}`);
    }

    const stream = await getStream(farcasterClient, lastEventId);

    for await (const event of stream) {
      messageCount++;
      if (messageCount % 10000 === 0) {
        console.log("Processed", messageCount, "messages");
      }
      try {
        const message = event.mergeMessageBody.message;
        await processMessage(message);
        lastEventFile.writer().write(event.id.toString());
      } catch (error: any) {
        console.error("Error processing message:", error.message);
      }
    }
    farcasterClient.close();
  });
};

init();
