import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateResponse(prompt) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  });
  return interaction.output_text;
}
