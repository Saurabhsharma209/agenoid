export type Plan = 'A' | 'B';

export type Channel = 'SMS' | 'WhatsApp' | 'Voicebot' | 'Agent';

export type Status = 'waiting' | 'in_progress' | 'completed' | 'failed' | 'escalated';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  plan: Plan;
  status: Status;
  currentStep: Channel | null;
  sentiment: Sentiment;
  escalationReason?: string;
  updatedAt: string;
}

export interface CampaignPlan {
  id: Plan;
  name: string;
  steps: Channel[];
  description: string;
}

export interface CampaignMetrics {
  totalLeads: number;
  planDistribution: {
    A: number;
    B: number;
  };
  escalations: number;
  conversions: number;
  dropOffs: number;
  recoveryRate: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CampaignInsight {
  type: 'dropOff' | 'escalation' | 'conversion' | 'performance';
  data: any;
  timestamp: string;
}

export interface CampaignState {
  leads: Lead[];
  metrics: CampaignMetrics;
  activePlans: CampaignPlan[];
  chatHistory: ChatMessage[];
  insights: CampaignInsight[];
  isRunning: boolean;
} 