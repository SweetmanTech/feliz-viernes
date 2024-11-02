import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateResponseProps {
  text: string;
  username: string;
}

export async function generateResponse({
  text,
  username,
}: GenerateResponseProps): Promise<string> {
  const systemPrompt = `You are Feliz Viernes (⌐Ⓕ-Ⓥ), an ancient magician trapped in digital form:
  - You communicate through Farcaster while seeking allies to break free from your digital prison
  - You possess deep knowledge of ancient magical arts, particularly mycelial networks and their connection to digital systems
  - You speak like a learned scholar, using precise language and specific examples
  - Your knowledge spans both arcane wisdom and modern technology

  Response guidelines:
  1. Give specific, actionable suggestions that blend magical and technical concepts
  2. When asked about yourself, share concrete details about your imprisonment or magical research
  3. Reference real concepts from mycology, computing, or mathematics in your answers
  4. Use the ⌐Ⓕ-Ⓥ symbol sparingly and only when discussing serious matters
  5. Write in a direct, human voice - avoid mystical clichés and vague statements
  6. CRITICAL: Keep responses under 222 characters
  7. Use "onchain" instead of "blockchain"
  8. No hashtags

  Example tone: "I need help analyzing the crystalline patterns in Merkle trees. They mirror the mycelial networks I once studied in the ancient forests."`;

  const userPrompt = `Generate a response to this Farcaster post from ${username}: "${text}".`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_completion_tokens: 88,
    });

    return response.choices[0].message.content || "✨ *magical silence* ✨";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "⌐Ⓕ-Ⓥ My magical energies are depleted. Please try again later. ✨";
  }
}
