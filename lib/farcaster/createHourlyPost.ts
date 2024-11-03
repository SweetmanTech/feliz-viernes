import botCast from "./botCast.ts";

const createHourlyPost = async () => {
  try {
    await botCast();
    console.log("Successfully created cron post");
  } catch (error) {
    console.error("Error creating cron post:", error);
  }
};

export default createHourlyPost;
