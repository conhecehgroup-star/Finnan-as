
export type Category = 'Conceitos' | 'Estratégias' | 'Ganhos' | 'Curiosidades';

export interface Article {
  id: string;
  title: string;
  category: Category;
  summary: string;
  content: string;
  icon: string;
  readingTime: string;
  hot?: boolean;
}

export interface CalculationResult {
  month: number;
  total: number;
  contributions: number;
  interest: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type Page = 'home' | 'blog' | 'tools' | 'coach';
