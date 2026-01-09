
import { GoogleGenAI } from "@google/genai";

export class FinanceAIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getChatResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], prompt: string) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é o "Finnanças Bot", um consultor financeiro especialista e amigável da plataforma Finnanças. 
        Seu objetivo é educar os usuários sobre finanças pessoais, investimentos, economia doméstica e estratégias para ganhar dinheiro.
        Responda sempre em Português do Brasil. Seja motivador mas realista. 
        Não dê conselhos de investimento específicos (como "compre a ação X"), mas explique conceitos e estratégias gerais.`,
      },
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  }
}

export const financeAI = new FinanceAIService();
