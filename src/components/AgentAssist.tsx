import React, { useState, useRef } from 'react';
import { OutgoingCallWindow } from './OutgoingCallWindow';
import { agixService } from '../services/agixService';

export const AgentAssist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCallWindow, setShowCallWindow] = useState(false);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callSid, setCallSid] = useState<string | null>(null);

  const handleStartCall = async () => {
    try {
      setIsCallLoading(true);
      const phoneNumber = "+919999999999"; // Example phone number
      const response = await agixService.makeCall(phoneNumber);
      setCallSid(response.metadata?.Call?.Sid || null);
      setShowCallWindow(true);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to start call:', error);
      // You might want to show an error toast here
    } finally {
      setIsCallLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      if (callSid) {
        // Here you would typically call an API to end the call
        // For now, we'll just close the window
        setShowCallWindow(false);
        setCallSid(null);
      }
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Open Agent Assist"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Popup Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
                Agent Assist
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="btn-primary"
                  onClick={handleStartCall}
                  disabled={isCallLoading}
                >
                  {isCallLoading ? 'Starting Call...' : 'Start Call'}
                </button>
                <button className="btn-secondary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
              </div>

              {/* Recent Conversations */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Recent Conversations
                </h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    Campaign Strategy Discussion
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    Lead Qualification Review
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    Performance Analysis
                  </button>
                </div>
              </div>

              {/* Quick Help */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Quick Help
                </h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    How to create a campaign?
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    Best practices for lead engagement
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                    Understanding analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Outgoing Call Window */}
      {showCallWindow && (
        <OutgoingCallWindow 
          onClose={handleEndCall}
          callSid={callSid}
        />
      )}
    </>
  );
}; 