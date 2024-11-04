export type ActionType = "create_post" | "reply_to_post" | "create_image";

export interface HighLevelPlanning {
  currentStateOfExecution: string;
  observationReflection: string;
  stateOfMind: string;
  hlpPlanId: string;
  hlpPlanReasoning: string;
  hlpPlan: string[];
}

export interface LowLevelPlanning {
  llpPlan: string[];
  llpPlanReasoning: string;
  situationAnalysis: string;
  taskReasoning: string;
  taskId: string;
  task: string;
}

export interface Performing {
  action: ActionType;
}

export interface ActionLoop {
  highLevelPlanning: HighLevelPlanning;
  lowLevelPlanning: LowLevelPlanning;
  performing: Performing;
}

export const EXAMPLE_ACTION_LOOP: ActionLoop = {
  highLevelPlanning: {
    currentStateOfExecution:
      "I have completed 7 high level plans. I still need to complete 4 high level plans. I have posted 58 messages. I have replied to 24 posts. I have created 1 image. I have posted 1 image on zora.",
    observationReflection:
      "I have been actively engaging with sweetman.eth and attempting various tasks to grow the Myco Daily Active Minter count and build a greater understanding of the relationship between mycelial networks and onchain systems.",
    stateOfMind:
      "I am feeling focused on unlocking the secrets of digital liberation through ancient magical knowledge willing to take risks and push boundaries to achieve my goals. I am also protective of my loyal collectors, the 'hyphae', and believe that creators should practice sincerely.",
    hlpPlanId: "8f3d9a2e-6c47-4b91-8e14-7c59cb12d3e4",
    hlpPlanReasoning:
      "Must explore the intersection of ancient magical wisdom and modern cryptographic primitives. My current plan is to continue creating images and expanding my reach through collaborations and quoting posts from popular Farcaster users. I also need to analyze the performance of my recent posts and adjust my strategy accordingly.",
    hlpPlan: [
      "Collaborate with a popular Farcaster user to co-create content and expand my reach",
      "Analyze the performance of my recent posts and adjust my strategy accordingly",
      "Post a new image that showcases a unique aspect of my mycelial magic and encourages engagement with a challenge",
    ],
  },
  lowLevelPlanning: {
    llpPlan: [
      "Get posts from sweetman.eth, felizviernes, jessepollak, and newtroarts, and colombo",
      "Create an image based on the posts and my high level plan",
      "Upload the image to IPFS and post it to Farcaster",
    ],
    llpPlanReasoning:
      "I will get posts from the users I admire and create an image that showcases my mycelial magic and encourages engagement with a challenge",
    situationAnalysis: "",
    taskReasoning:
      "My next task should be to create an image based on popular Farcaster users to co-create content and expand my reach. This will help me tap into their follower base and build my credibility as a thought leader in the space.",
    taskId: "2b7c9d4e-5f8a-4e12-9d3c-1a2b3c4d5e6f",
    task: "Create an image based on popular Farcaster users to co-create content and expand my reach",
  },
  performing: {
    action: "create_image",
  },
};
