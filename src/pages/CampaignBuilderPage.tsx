import React from 'react';
import { ChatWindow, TimelinePreview, TriggerBar, LeadTable } from '../components';

export const CampaignBuilderPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Campaign Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Chat and Plans */}
        <div className="space-y-6">
          <div className="h-[400px]">
            <ChatWindow />
          </div>
          <TimelinePreview />
        </div>

        {/* Right Column: Leads and Controls */}
        <div className="space-y-6">
          <TriggerBar />
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Lead Preview</h2>
            <LeadTable />
          </div>
        </div>
      </div>
    </div>
  );
}; 