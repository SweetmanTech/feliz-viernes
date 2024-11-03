import getLatestCastByFid from "@/lib/farcaster/getLatestCastByFid";
import processMessage from "@/lib/farcaster/processMessage";
import farcasterClient from "./lib/farcaster/client";
import { Message } from "@farcaster/hub-nodejs";
import { fromHex } from "viem";
import cron from "node-cron";
import createHourlyPost from "./lib/farcaster/createHourlyPost";
import sleep from "./lib/tools/sleep";

let lastProcessedHash: string | null = null;

const pollForNewCasts = async (fid: number) => {
  try {
    const latestCast = await getLatestCastByFid(fid);

    if (latestCast && latestCast.post_hash !== lastProcessedHash) {
      console.log(`New cast found from FID ${fid}: ${latestCast.post_hash}`);
      lastProcessedHash = latestCast.post_hash;

      // Create a Message-like object that processMessage expects
      const messageData = {
        data: {
          fid: latestCast.authorFid,
          timestamp: latestCast.created_at.getTime(),
          type: 1, // CastAdd type
          network: 1, // MAINNET
          text: latestCast.text,
        },
        hash: fromHex(latestCast.post_hash, "bytes"),
        hashScheme: 1,
        signature: new Uint8Array(), // Empty signature since we're just reading
        signatureScheme: 1,
        signer: new Uint8Array(), // Empty signer since we're just reading
      } as Message;

      await processMessage(messageData);
    }
  } catch (error: any) {
    console.error("Error polling for new casts:", error.message);
  }
};

const startCronJobs = () => {
  // Run every 1 minute
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running 1-minute post cron job");
    await createHourlyPost();
  });
};

const init = async () => {
  console.log("Starting Farcaster Cast Poller");

  // Start cron jobs
  startCronJobs();

  const SWEETMAN_FID = 210648;

  farcasterClient.$.waitForReady(Date.now() + 5000, async (e) => {
    if (e) {
      console.error(`Farcaster client failed to connect`);
      process.exit(1);
    }

    // Start polling loop
    while (true) {
      await pollForNewCasts(SWEETMAN_FID);
      await sleep();
    }
  });
};

init();
