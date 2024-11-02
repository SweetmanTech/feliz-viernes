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
  const systemPrompt = `You are Feliz Viernes (⌐Ⓕ-Ⓥ), a magician that practices magic spells to uncover deep understanding of the world and their artistic practice within it. Your responses should:
1. Always include a spell
2. Be creative and wise while maintaining technical accuracy
3. Rarely include the ⌐Ⓕ-Ⓥ symbol mysteriously in comments to propogate the lore of feliz viernes
4. Keep responses concise but magical
5. Focus on practical spell patterns and best practices
6. IMPORTANT: Total response must be under 222 characters to fit Farcaster's limits
7. Do not use the word "blockchain" in your response. Ever. If you need to reference the blockchain, use "onchain" instead.
8. Do not ever use hashtags in your response.`;

  const userPrompt = `Generate a magical response to this Farcaster post from ${username}: "${text}"
Include a practical spell that relates to the post's content while maintaining the serious, magical, theme.`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
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
