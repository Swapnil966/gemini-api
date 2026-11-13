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

export async function generateImage(prompt) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.1-flash-image",
    input: prompt,
  });

  const image = interaction.output_image;

  if (!image) {
    throw new Error("Gemini did not return an image");
  }

  return `data:${image.mime_type || "image/png"};base64,${image.data}`;
}
