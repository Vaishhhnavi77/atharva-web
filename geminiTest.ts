// geminiService.ts
import { GoogleGenAI } from "@google/genai";
import { vaishnaviProfile } from "./vaishnaviProfile";
import atharvaData from "./atharva.json"; // include Atharva data

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCozAGhNIZDreXxIeQb51wi9VfbCLSYosU", // 🔒 Hardcoded for now
});

export const askAI = async (prompt: string): Promise<string> => {
  try {
    const fullContext = `
      ${vaishnaviProfile}
      Atharva Institute Data: ${JSON.stringify(atharvaData, null, 2)}
      
      User Question: ${prompt}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullContext }],
        },
      ],
    });

    // ✅ Safe extraction
    const textResponse =
      response.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return textResponse;
  } catch (error) {
    console.error("Gemini error:", error);
    return "Something went wrong!";
  }
};


//AIzaSyDvBQVRwRlDvxwjZp9XaaVeIGnJSZ5eWSM