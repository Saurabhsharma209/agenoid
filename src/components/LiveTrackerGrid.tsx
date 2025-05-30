import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { Lead } from '../types';
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface CallModalProps {
  lead: Lead;
  onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ lead, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnected) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Call with {lead.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          {!isConnected ? (
            <button
              onClick={() => setIsConnected(true)}
              className="btn-primary flex items-center justify-center space-x-2 w-full"
            >
              <PhoneIcon className="h-5 w-5" />
              <span>Connect Call</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="text-2xl font-mono">{formatDuration(callDuration)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Call in progress...
              </div>
              <button
                onClick={onClose}
                className="btn-secondary text-red-600 hover:text-red-700 w-full"
              >
                End Call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const LiveTrackerGrid: React.FC = () => {
  const { leads, updateLead } = useStore();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const activeLeads = leads
    .filter((lead) => lead.status === 'in_progress' || lead.status === 'escalated')
    .slice(0, 5); // Show only 5 active leads

  const handleTakeOver = (lead: Lead) => {
    updateLead(lead.id, {
      status: 'in_progress',
      currentStep: 'Agent',
      sentiment: 'neutral'
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Active Contacts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeLeads.map((lead) => (
          <div
            key={lead.id}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {lead.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lead.phone}
                </p>
              </div>
              <span
                className={`badge ${
                  lead.status === 'escalated'
                    ? 'badge-warning'
                    : 'badge-info'
                }`}
              >
                {lead.currentStep || 'Waiting'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Plan:</span>
                <span className="font-medium">Plan {lead.plan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className="font-medium">{lead.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Sentiment:</span>
                <span
                  className={`badge ${
                    lead.sentiment === 'positive'
                      ? 'badge-success'
                      : lead.sentiment === 'negative'
                      ? 'badge-error'
                      : 'badge-info'
                  }`}
                >
                  {lead.sentiment}
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              {lead.status === 'escalated' && (
                <button
                  onClick={() => handleTakeOver(lead)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Take Over
                </button>
              )}
              <button
                onClick={() => setSelectedLead(lead)}
                className="btn-primary flex items-center justify-center space-x-2 flex-1 text-sm"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedLead && (
        <CallModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}; 