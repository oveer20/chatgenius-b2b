export interface BotData {
  name: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  model: string;
  whatsappPhoneNumber: string;
  whatsappPhoneId: string;
  whatsappToken: string;
  whatsappVerifyToken: string;
  emailAlertsTo: string;
  isActive: boolean;
}

export interface Lead {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  score?: string;
  created_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type TabId = 'identidad' | 'cerebro' | 'entrenamiento' | 'despliegue';
