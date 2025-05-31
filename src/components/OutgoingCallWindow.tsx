import React, { useState, useEffect } from 'react';

interface OutgoingCallWindowProps {
  onClose: () => void;
  callSid: string | null;
}

export const OutgoingCallWindow: React.FC<OutgoingCallWindowProps> = ({ onClose, callSid }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Simulate call connection after 3 seconds
    const connectionTimer = setTimeout(() => {
      setIsConnecting(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(connectionTimer);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Outgoing Call
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        
        {isConnecting ? (
          <div className="text-gray-600 dark:text-gray-400">
            Connecting...
          </div>
        ) : (
          <>
            <div className="text-2xl font-mono">{formatDuration(callDuration)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Call in progress...
            </div>
          </>
        )}
        
        <button
          onClick={onClose}
          className="btn-secondary text-red-600 hover:text-red-700 w-full"
        >
          End Call
        </button>
      </div>
    </div>
  );
}; 