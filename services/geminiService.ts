import { GoogleGenAI } from "@google/genai";

// Strictly using process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: " "});

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Escreva uma descrição atraente e curta para um produto de delivery chamado "${productName}" na categoria "${category}". Use uma linguagem apetitosa e persuasiva.`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });
    return response.text || "Descrição não gerada.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao gerar descrição.";
  }
};

export const getSalesInsights = async (salesData: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise estes dados de vendas semanais e dê um insight curto e estratégico para o lojista: ${JSON.stringify(salesData)}`,
      config: {
        maxOutputTokens: 150,
      }
    });
    return response.text || "Nenhum insight disponível.";
  } catch (error) {
    return "Não foi possível gerar insights agora.";
  }
};