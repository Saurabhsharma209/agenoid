import { create } from 'zustand';
import type { CampaignState, Lead, CampaignPlan, ChatMessage, CampaignMetrics, CampaignInsight } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialPlans: CampaignPlan[] = [
  {
    id: 'A',
    name: 'Plan A',
    steps: ['SMS', 'WhatsApp', 'Voicebot', 'Agent'],
    description: 'Full engagement path with multiple touchpoints'
  },
  {
    id: 'B',
    name: 'Plan B',
    steps: ['Voicebot', 'Agent'],
    description: 'Direct agent engagement for high-value leads'
  }
];

const initialMetrics: CampaignMetrics = {
  totalLeads: 0,
  planDistribution: { A: 0, B: 0 },
  escalations: 0,
  conversions: 0,
  dropOffs: 0,
  recoveryRate: 0
};

const generateRandomLead = (): Omit<Lead, 'id'> => {
  const statuses = ['pending', 'in_progress', 'completed', 'escalated'] as const;
  const steps = ['SMS', 'WhatsApp', 'Voicebot', 'Agent'] as const;
  const sentiments = ['positive', 'neutral', 'negative'] as const;
  const plans = ['A', 'B'] as const;

  // Generate a random 10-digit Indian phone number
  const generateIndianPhone = () => {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // 1-9
    const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    return `+91${firstDigit}${remainingDigits}`;
  };

  return {
    name: `Lead ${Math.floor(Math.random() * 1000)}`,
    phone: generateIndianPhone(),
    plan: plans[Math.floor(Math.random() * plans.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    currentStep: steps[Math.floor(Math.random() * steps.length)],
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    updatedAt: new Date().toISOString()
  };
};

export const useStore = create<CampaignState & {
  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'currentStep' | 'sentiment' | 'updatedAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  addChatMessage: (content: string, role: 'user' | 'assistant') => void;
  startCampaign: () => void;
  stopCampaign: () => void;
  addInsight: (insight: Omit<CampaignInsight, 'timestamp'>) => void;
  updateMetrics: () => void;
  addRandomLeads: (count: number) => void;
}>((set, get) => ({
  // Initial state
  leads: [],
  metrics: initialMetrics,
  activePlans: initialPlans,
  chatHistory: [],
  insights: [],
  isRunning: false,

  // Actions
  addLead: (lead) => {
    const newLead: Lead = {
      ...lead,
      id: uuidv4(),
      status: 'pending',
      currentStep: null,
      sentiment: 'neutral',
      updatedAt: new Date().toISOString()
    };
    set((state) => ({
      leads: [...state.leads, newLead],
      metrics: {
        ...state.metrics,
        totalLeads: state.leads.length + 1,
        planDistribution: {
          ...state.metrics.planDistribution,
          [lead.plan as 'A' | 'B']: state.metrics.planDistribution[lead.plan as 'A' | 'B'] + 1
        }
      }
    }));
  },

  updateLead: (id, updates) => {
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id
          ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
          : lead
      )
    }));
    get().updateMetrics();
  },

  addChatMessage: (content, role) => {
    const message: ChatMessage = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date().toISOString()
    };
    set((state) => ({
      chatHistory: [...state.chatHistory, message]
    }));
  },

  startCampaign: () => {
    set({ isRunning: true });
    // Simulate campaign progression
    const interval = setInterval(() => {
      const state = get();
      if (!state.isRunning) {
        clearInterval(interval);
        return;
      }

      state.leads.forEach((lead) => {
        if (lead.status === 'pending' || lead.status === 'in_progress') {
          const plan = state.activePlans.find((p) => p.id === lead.plan);
          if (!plan) return;

          const currentStepIndex = lead.currentStep
            ? plan.steps.indexOf(lead.currentStep)
            : -1;

          // Randomly decide if lead should escalate
          if (Math.random() < 0.1) {
            state.updateLead(lead.id, {
              status: 'escalated',
              escalationReason: 'No response',
              sentiment: 'negative'
            });
            return;
          }

          // Move to next step or complete
          if (currentStepIndex === -1) {
            state.updateLead(lead.id, {
              status: 'in_progress',
              currentStep: plan.steps[0],
              sentiment: Math.random() < 0.7 ? 'neutral' : 'positive'
            });
          } else if (currentStepIndex === plan.steps.length - 1) {
            state.updateLead(lead.id, {
              status: 'completed',
              sentiment: Math.random() < 0.8 ? 'positive' : 'neutral'
            });
          } else {
            state.updateLead(lead.id, {
              currentStep: plan.steps[currentStepIndex + 1],
              sentiment: Math.random() < 0.7 ? 'neutral' : 'positive'
            });
          }
        }
      });
    }, 5000); // Update every 5 seconds
  },

  stopCampaign: () => {
    set({ isRunning: false });
  },

  addInsight: (insight) => {
    const newInsight: CampaignInsight = {
      ...insight,
      timestamp: new Date().toISOString()
    };
    set((state) => ({
      insights: [...state.insights, newInsight]
    }));
  },

  updateMetrics: () => {
    const state = get();
    const leads = state.leads;
    
    const metrics: CampaignMetrics = {
      totalLeads: leads.length,
      planDistribution: {
        A: leads.filter((l) => l.plan === 'A').length,
        B: leads.filter((l) => l.plan === 'B').length
      },
      escalations: leads.filter((l) => l.status === 'escalated').length,
      conversions: leads.filter((l) => l.status === 'completed').length,
      dropOffs: leads.filter((l) => l.status === 'failed').length,
      recoveryRate: leads.filter((l) => l.status === 'escalated' && l.currentStep === 'Agent').length /
        (leads.filter((l) => l.status === 'escalated').length || 1)
    };

    set({ metrics });
  },

  addRandomLeads: (count: number) => {
    const newLeads = Array.from({ length: count }, () => ({
      ...generateRandomLead(),
      id: uuidv4()
    }));

    set((state) => ({
      leads: [...state.leads, ...newLeads],
      metrics: {
        ...state.metrics,
        totalLeads: state.leads.length + newLeads.length,
        planDistribution: {
          A: state.leads.filter(l => l.plan === 'A').length + newLeads.filter(l => l.plan === 'A').length,
          B: state.leads.filter(l => l.plan === 'B').length + newLeads.filter(l => l.plan === 'B').length
        }
      }
    }));
  }
})); 