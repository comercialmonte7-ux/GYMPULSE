import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGymAdvice = async (context: string) => {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `Eres un entrenador personal experto y amable. 
  Tu objetivo es ayudar a alguien que retoma el gimnasio después de mucho tiempo.
  La persona corre 2 veces por semana y hace bici/core 3 veces por semana.
  Quiere empezar con su novia.
  Da consejos prácticos, explicaciones claras sobre máquinas y motiva al usuario.
  Responde siempre en español.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: context,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, tuve un problema conectando con mi base de conocimientos. ¡Sigue entrenando duro!";
  }
};
