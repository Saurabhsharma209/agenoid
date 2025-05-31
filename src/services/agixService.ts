import axios from 'axios';

const AGIX_API_URL = 'http://129.154.232.7:8000';

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
        
      const response = await agixClient.get(`/prompt?q=${(message)}`);
      const responseData = response.data;
      if (!responseData || !Array.isArray(responseData.data)) {
        throw new Error('Invalid response format');
      }

      const messages = responseData.data;

      // Find the last assistant message with content
        const lastAssistant = [...messages]
        .reverse()
    .find(entry => entry.role === 'assistant' && entry.content);

    const finalContent = lastAssistant?.content || 'No assistant content found';

      console.log(response.data);
      console.log(finalContent);
      return {
        response: finalContent || 'No response received',
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
  },



  async makeCall(phoneNumber: string): Promise<AgixResponse> {
    try {
      const response = await agixClient.get(`/call?phone=${encodeURIComponent(phoneNumber)}`);
      const responseData = response.data;
      console.log('Call response:', responseData);
      
      if (!responseData) {
        throw new Error('Invalid response format');
      }

      return {
        response: 'Success',
        confidence: 1,
        metadata: { Call: { Sid: responseData.sid || 'mock-call-sid' } }
      };
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to get response');
    }
  }

}; 
