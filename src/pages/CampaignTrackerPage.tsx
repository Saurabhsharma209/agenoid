import React from 'react';
import { useStore } from '../store/useStore';
import { TriggerBar, LeadTable, LiveTrackerGrid } from '../components';

export const CampaignTrackerPage: React.FC = () => {
  const { isRunning, metrics } = useStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Campaign Tracker
        </h1>
        <div className="flex items-center space-x-4">
          <span
            className={`badge ${
              isRunning ? 'badge-success' : 'badge-warning'
            }`}
          >
            {isRunning ? 'Running' : 'Paused'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {metrics.totalLeads} leads • {metrics.conversions} conversions
          </span>
        </div>
      </div>

      <TriggerBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Contacts */}
        <div className="lg:col-span-1">
          <div className="card">
            <LiveTrackerGrid />
          </div>
        </div>

        {/* Lead Table */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">All Leads</h2>
            <LeadTable />
          </div>
        </div>
      </div>
    </div>
  );
}; 