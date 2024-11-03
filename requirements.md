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
- Public Interface: https://felizviernez.myco.wtf
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
