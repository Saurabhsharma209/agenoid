import axios from 'axios';

const AGIX_API_URL = 'https://eobfbwlh3djtihd.m.pipedream.net';

const agixClient = axios.create({
  baseURL: AGIX_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface AgixResponse {
  response: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export const agixService = {
  async sendMessage(message: string): Promise<AgixResponse> {
    try {
      const response = await agixClient.post('/postChat', {
        message: message
      });
      return {
        response: 'random repy will come here',
        confidence: 1,
        metadata: response.data
      };
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to get response');
    }
  },

  async startCampaign(campaignData: any): Promise<any> {
    try {
      const response = await agixClient.get('');
      return response.data;
    } catch (error) {
      console.error('Campaign Error:', error);
      throw new Error('Failed to start campaign');
    }
  },

  async getCampaignStatus(campaignId: string): Promise<any> {
    try {
      const response = await agixClient.get('');
      return response.data;
    } catch (error) {
      console.error('Status Error:', error);
      throw new Error('Failed to get campaign status');
    }
  }
}; 