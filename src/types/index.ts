export type Plan = 'A' | 'B';

export type Channel = 'SMS' | 'WhatsApp' | 'Voicebot' | 'Agent';

export type Status = 'pending' | 'in_progress' | 'completed' | 'escalated' | 'failed';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  plan: string;
  status: Status;
  currentStep?: Channel;
  sentiment: Sentiment;
  updatedAt: string;
  escalationReason?: string;
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