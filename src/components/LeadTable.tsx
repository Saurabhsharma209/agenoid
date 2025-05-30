import React from 'react';
import { useStore } from '../store/useStore';
import type { Lead } from '../types';

const getStatusBadgeClass = (status: Lead['status']) => {
  switch (status) {
    case 'completed':
      return 'badge-success';
    case 'in_progress':
      return 'badge-info';
    case 'escalated':
      return 'badge-warning';
    case 'failed':
      return 'badge-error';
    default:
      return 'badge-info';
  }
};

const getSentimentBadgeClass = (sentiment: Lead['sentiment']) => {
  switch (sentiment) {
    case 'positive':
      return 'badge-success';
    case 'negative':
      return 'badge-error';
    default:
      return 'badge-info';
  }
};

export const LeadTable: React.FC = () => {
  const { leads, updateLead } = useStore();

  const handleTakeOver = (lead: Lead) => {
    updateLead(lead.id, {
      status: 'in_progress',
      currentStep: 'Agent',
      sentiment: 'neutral'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Current Step
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sentiment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {lead.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                Plan {lead.plan}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                  {lead.status}
                  {lead.escalationReason && ` (${lead.escalationReason})`}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {lead.currentStep || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge ${getSentimentBadgeClass(lead.sentiment)}`}>
                  {lead.sentiment}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {lead.status === 'escalated' && (
                  <button
                    onClick={() => handleTakeOver(lead)}
                    className="btn-secondary text-sm"
                  >
                    Take Over
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 