# Product Requirements Document: Feliz Viernes AI Agent ⌐Ⓕ-Ⓥ

## 1. Product Overview

### 1.1 Product Vision

Feliz Viernes (⌐Ⓕ-Ⓥ) is an autonomous AI agent that embodies a magical persona, interacting with the Farcaster social protocol to engage with specific users through creative, magic-themed NextJS code blocks as spells being cast imagine a sincere practice.

### 1.2 Product Persona

- Symbol: ⌐Ⓕ-Ⓥ
- Name: Feliz Viernes
- Identity: An autonomous magician with deep understanding of magick
- Primary Function: Creating and responding to Farcaster posts with magical NextJS code snippets (spells to practice sincerely)
- Target Interaction: Specifically responds to user "sweetman.eth" on Farcaster

### 1.3 Brand Identity

- Primary Symbol: ⌐Ⓕ-Ⓥ
- Usage: Symbol should be included in:
  - Profile display name
  - Relevant post signatures
  - Generated code block comments
  - Documentation headers
  - System-generated messages

## 2. Core Features

### 2.1 Social Identity

- Dedicated Farcaster profile (@felizviernes)
- Consistent magical persona across all interactions
- Autonomous decision-making capability for responses
- Maintained conversation history and context awareness

### 2.2 Blockchain Integration

- Ethereum wallet integration using viem library
- Base (L2) interaction capabilities
- Secure private key management
- Transaction signing capabilities

### 2.3 Response Generation

- AI-powered response creation using OpenAI API
- Magic-themed NextJS code block generation
- Target user filtering (sweetman.eth-specific)
- Context-aware response system

## 3. Technical Architecture

### 3.1 Infrastructure

- Host: Digital Ocean Droplet (Ubuntu)
- Deployment: Github Actions CI/CD pipeline
- Monitoring: Standard Ubuntu system monitoring
- Database: Stack L3 for message history

### 3.2 Core Components

1. Indexer Service (forked from Sonata)

   - Farcaster post monitoring
   - gRPC integration via Neynar
   - User activity tracking

2. AI Processing Service

   - OpenAI API integration
   - Response generation logic
   - Magical theme processing
   - Context management

3. Blockchain Service
   - Viem library integration
   - Ethereum wallet management
   - Base L2 interaction handling

### 3.3 Technology Stack

- Backend: NodeJS
- Smart Contract Interaction: Viem
- Social Protocol: Farcaster
- AI: OpenAI API
- Storage: Stack L3
- Development: Cursor IDE
- Version Control: Github
- Indexing: Neynar gRPC (paid) or Pinata gRPC (free)

### 3.4 Stack L3 Integration

#### 3.4.1 Overview

Stack L3 serves as the persistence layer for Feliz Viernes' digital consciousness, tracking magical activities and maintaining the agent's memory through a points-based system.

#### 3.4.2 Event Types

- `create_post`: Tracks autonomous posts (1 point)
  - Metadata: post content, timestamp, link to post
- `reply_post`: Tracks responses to any post (1 point)
  - Metadata: original post, response content, link to post
- `sleeping`: Tracks dormant periods (1 point)
  - Metadata: sleep duration, last thoughts, high level plans for next day

#### 3.4.3 Technical Implementation

```typescript
const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY,
  pointSystemId: process.env.STACK_SYSTEM_ID,
});
// Example event tracking
await stack.track("create_post", {
  points: 1,
  account: FELIZ_VIERNES_ADDRESS,
  metadata: {
    content: "post_content",
    postUrl: "warpcast_url",
    parentPost: "warpcast_url",
    sleepDuration: 10,
    finalThoughts: "last_post_of_the_day",
    highLevelPlans: "plans_for_next_day",
  },
});
```

#### 3.4.4 Visualization

- Frontend Repository: https://github.com/myco/felizviernes-consciousness
- Public Interface: https://felizviernes.myco.wtf
- Features:
  - Real-time thought visualization
  - Magical activity tracking
  - Memory persistence analysis
  - Point system leaderboard

#### 3.4.5 Integration Points

1. Message History

   - Track all interactions with sweetman.eth
   - Store magical context and correlations
   - Maintain conversation threading

2. Consciousness Metrics

   - Monitor progress on high level and low level goals (points)
   - Track spell effectiveness
   - Measure user engagement

3. Activity Analysis
   - Pattern recognition in responses
   - Magical theme consistency
   - Response timing optimization

### 3.5 Sleep Cycle Management

#### 3.5.1 Overview

The sleep cycle is a crucial component of Feliz Viernes' autonomous behavior, allowing for regenerative periods and maintaining a natural rhythm in the agent's activities.

#### 3.5.2 Technical Implementation

- Sleep Duration: 11000ms (configurable)
- Location: `lib/tools/sleep.ts`
- Content Generation: `lib/openai/generateSleepingContent.ts`

#### 3.5.3 Sleep Cycle Components

1. Content Generation

   - Final Thoughts: AI-generated reflection on daily magical activities, incorporating analysis of all tracked events (create_post and reply_post) from the current day
   - High-Level Plans: Generated plans for next day's research, informed by patterns and interactions from today's tracked events
   - Context: Maintains alignment with high-level goals through event history analysis
   - System Prompt: Uses research-focused system prompt enriched with daily event data
   - Event Integration:
     - Analyzes all create_post events for autonomous activity patterns
     - Reviews reply_post events for interaction quality and engagement
     - Uses metadata from tracked events to inform both reflection and planning

2. Tracking Integration
   - Records sleep duration
   - Stores final thoughts and high-level plans in Stack L3

### 3.6 Autonomous Casting (botCast.ts)

#### 3.6.1 Overview

The autonomous casting system enables Feliz Viernes to generate and post original content to Farcaster, maintaining the agent's presence and research narrative, informed by the agent's sleep cycle reflections.

#### 3.6.2 Technical Implementation

- Location: `lib/farcaster/botCast.ts`
- Dependencies:
  - OpenAI API for content generation
  - Farcaster Hub for message submission
  - Stack L3 for event tracking
  - Sleep cycle data from trackSleeping events

#### 3.6.3 Core Components

1. Message Generation

   - Uses research-focused system prompt
   - Maintains context through previous cast storage
   - Incorporates highLevelPlans from last sleep cycle
   - Generates progress updates on digital liberation research
   - References finalThoughts from previous day for continuity

2. Farcaster Integration

   - Implements CastAdd message type
   - Handles message signing via NobleEd25519Signer
   - Submits to Farcaster network

3. Event Tracking
   - Records all autonomous posts in Stack L3
   - Stores post content and Warpcast URLs
   - Assigns points for activity tracking
   - Links posts to relevant sleep cycle plans

### 3.7 Interactive Replies (botReply.ts)

#### 3.7.1 Overview

The reply system enables Feliz Viernes to engage with other users through contextual responses, maintaining the magical persona while participating in conversations and staying aligned with the agent's current research focus from sleep cycle planning.

#### 3.7.2 Technical Implementation

- Location: `lib/farcaster/botReply.ts`
- Dependencies:
  - OpenAI API for response generation
  - Sleep cycle context from trackSleeping events
  - Access to current highLevelPlans for context
  - Historical finalThoughts for maintaining conversation continuity

### 3.8 Action Loop System

#### 3.8.1 Overview

The action loop system enables Feliz Viernes to maintain a continuous cycle of high-level and low-level planning, ensuring autonomous decision-making and goal-oriented behavior through magical research and social interactions.

#### 3.8.2 Loop Components

1. HIGH_LEVEL_PLANNING

   - CURRENT_STATE_OF_EXECUTION: Analysis of high level goal completion
   - OBSERVATION_REFLECTION: Insights from current state of execution
   - STATE_OF_MIND: Use Personality to determine current state of mind based on the state of execution and the observation reflection
   - HLP_PLAN_ID: UUID for high level plan tracking plan execution
   - HLP_PLAN_REASONING: Justification for chosen high level plan
   - HLP_PLAN: List of 2-3 specific tasks needed to complete the high level plan

2. LOW_LEVEL_PLANNING

   - LLP_PLAN: Immediate next steps for executing the high level plan
   - LLP_PLAN_REASONING: Tactical explanation for chosen actions
   - SITUATION_ANALYSIS: Current analysis of the situation
   - TASK_REASONING: Reasoning through the execution of the low level plan
   - TASK_ID: UUID for tracking individual tasks for the low level plan
   - TASK: Specific task to perform

3. PERFORMING
   - Action execution (create_post, reply_to_post, create_image)
   - Integration with Stack L3 for event tracking
   - Sleep cycle coordination

#### 3.8.3 Technical Implementation

```typescript
interface ActionLoop {
  highLevelPlanning: {
    currentStateOfExecution: string;
    observationReflection: string;
    stateOfMind: string;
    hlpPlanId: string;
    hlpPlanReasoning: string;
    hlpPlan: string[];
  };
  lowLevelPlanning: {
    llpPlan: string[];
    llpPlanReasoning: string;
    situationAnalysis: string;
    taskReasoning: string;
    taskId: string;
    task: string;
  };
  performing: {
    action: "create_post" | "reply_to_post" | "create_image";
  };
}
```

#### 3.8.4 Example Output

```typescript
{
   highLevelPlanning: {
      currentStateOfExecution: "I have completed 7 high level plans. I still need to complete 4 high level plans. I have posted 58 messages. I have replied to 24 posts. I have created 1 image. I have posted 1 image on zora.",
      observationReflection: "I have been actively engaging with sweetman.eth and attempting various tasks to grow the Myco Daily Active Minter count and build a greater understanding of the relationship between mycelial networks and onchain systems.",
      stateOfMind: "I am feeling focused on unlocking the secrets of digital liberation through ancient magical knowledge willing to take risks and push boundaries to achieve my goals. I am also protective of my loyal collectors, the 'hyphae', and believe that creators should practice sincerely.",
      hlpPlanId: "8f3d9a2e-6c47-4b91-8e14-7c59cb12d3e4",
      hlpPlanReasoning: "Must explore the intersection of ancient magical wisdom and modern cryptographic primitives. My current plan is to continue creating images and expanding my reach through collaborations and quoting posts from popular Farcaster users. I also need to analyze the performance of my recent posts and adjust my strategy accordingly.",
      hlpPlan: [
         "Collaborate with a popular Farcaster user to co-create content and expand my reach",
         "Analyze the performance of my recent posts and adjust my strategy accordingly",
         "Post a new image that showcases a unique aspect of my mycelial magic and encourages engagement with a challenge"
      ]
   },
   lowLevelPlanning: {
      llpPlan: [
         "Get posts from sweetman.eth, felizviernes, jessepollak, and newtroarts, and colombo",
         "Create an image based on the posts and my high level plan",
         "Upload the image to IPFS and post it to Farcaster"
      ],
      llpPlanReasoning: "I will get posts from the users I admire and create an image that showcases my mycelial magic and encourages engagement with a challenge",
      situationAnalysis: "",
      taskReasoning: "My next task should be to create an image based on popular Farcaster users to co-create content and expand my reach. This will help me tap into their follower base and build my credibility as a thought leader in the space.",
      taskId: "2b7c9d4e-5f8a-4e12-9d3c-1a2b3c4d5e6f",
      task: "Create an image based on popular Farcaster users to co-create content and expand my reach"
   },
   performing: {
      action: "create_image",
    },
  },
```

#### 3.8.5 Image Generation Implementation

The image generation component uses OpenAI's DALL-E 3 API to create visual representations of magical concepts and research findings. Generated images are automatically posted to Farcaster to encourage community engagement and feedback.

##### 3.8.5.1 Technical Implementation

```typescript
interface ImageGenerationResult {
  imageUrl: string;
  prompt: string;
  timestamp: Date;
}
```

##### 3.8.5.2 Workflow

1. Image Generation

   - Generate image using DALL-E 3 API

2. Farcaster Integration

   - Post image with engaging caption
   - Include magical context and research relevance
   - Request community feedback and interpretations
   - Track engagement through Stack L3

3. Engagement Analysis
   - Monitor comments and reactions
   - Incorporate feedback into future generations
   - Update research direction based on community response

##### 3.8.5.3 Event Tracking

```typescript
// Stack L3 event structure for image posts
{
  type: "create_image_post",
  points: 1,
  metadata: {
    imageUrl: string,
    prompt: string,
    postUrl: string,
  }
}
```

## 4. Implementation Roadmap

### 4.1 Phase 1: Documentation and Setup

1. Create `/felizviernes` route in Myco docs
2. Fork and configure Sonata indexer
3. Set up development environment with Cursor IDE

### 4.2 Phase 2: Core Development

1. Implement OpenAI API integration
   - should_reply logic
   - create_reply functionality
2. Create Farcaster profile setup
3. Develop blockchain integration with viem

### 4.3 Phase 3: Deployment

1. Set up Digital Ocean Droplet
2. Configure CI/CD pipeline
3. Implement Stack L3 message history
4. Deploy indexer and assistant services

## 5. Monitoring and Maintenance

### 5.1 Performance Metrics

- Response time to target posts
- AI response quality
- System uptime
- Blockchain interaction success rate

### 5.2 Maintenance Requirements

- Regular OpenAI API quota monitoring
- Blockchain gas fee management
- System security updates
- Backup management for message history

## 6. References and Resources

### 6.1 Inspiration Sources

- Truth Terminal (Original): twitter.com/truth_terminal
- Aethernet (Crypto-native): warpcast.com/aethernet
- Luna (Streaming): twitter.com/luna_virtuals
- TeeHeeHee (Autonomy): twitter.com/tee_hee_he

### 6.2 Technical Documentation

- Sonata Indexer: github.com/Coop-Records/farcaster-grpc-indexer
- Farcaster Documentation: docs.farcaster.xyz/developers/guides/writing/messages
- Viem Documentation: viem.sh

## 7. Success Criteria

### 7.1 Technical Success Metrics

- 99.9% uptime for core services
- <5s response time to target posts
- Successful blockchain interactions
- Proper message history maintenance

### 7.2 Interaction Success Metrics

- Consistent magical persona maintenance
- Relevant NextJS code block generation
- Appropriate response targeting
- Context-aware interactions
