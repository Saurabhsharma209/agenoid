import axios from 'axios';

const EXOTEL_API_URL = 'https://api.in.exotel.com/v1/Accounts/ameyo5m/Calls/connect';
const EXOTEL_AUTH = {
  username: '399117e47411d9f0f9120de1181323056e55b88c664d2f67',
  password: '80711a9d4562955dc3591f1ada24790f3b5088dbaa3263db'
};

export interface ExotelCallResponse {
  Call: {
    Sid: string;
    Status: string;
    From: string;
    To: string;
    CallerId: string;
    CallType: string;
    TimeLimit: string;
    TimeOut: string;
    Priority: string;
  };
}

export const exotelService = {
  // async makeCall(phoneNumber: string): Promise<ExotelCallResponse> {
  //   try {
  //     // Ensure phone number is in Indian format (+91XXXXXXXXXX)
  //     const formattedNumber = phoneNumber.startsWith('+91') 
  //       ? phoneNumber 
  //       : `+91${phoneNumber.replace(/^0+/, '')}`;

  //     const params = new URLSearchParams();
  //     params.append('From', 'sip:saurabhsf258cafa');
  //     params.append('To', formattedNumber);
  //     params.append('CallerId', '+912247788868'); // Indian caller ID
  //     params.append('CallType', 'trans');
  //     params.append('TimeLimit', '3600');
  //     params.append('TimeOut', '30');
  //     params.append('Priority', 'normal');

  //     const response = await axios.post<ExotelCallResponse>(EXOTEL_API_URL, params, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       auth: EXOTEL_AUTH
  //     });

  //     console.log('Exotel API Response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Exotel Call Error:', error);
  //     throw new Error('Failed to initiate Exotel call');
  //   }
  // }
}; 