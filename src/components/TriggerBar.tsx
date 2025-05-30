import React from 'react';
import { useStore } from '../store/useStore';
import { PlayIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

export const TriggerBar: React.FC = () => {
  const { isRunning, startCampaign, stopCampaign, leads } = useStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').slice(1); // Skip header
      
      rows.forEach((row) => {
        const [name, phone] = row.split(',').map((cell) => cell.trim());
        if (name && phone) {
          useStore.getState().addLead({
            name,
            phone,
            plan: Math.random() < 0.6 ? 'A' : 'B' // 60% Plan A, 40% Plan B
          });
        }
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="btn-secondary cursor-pointer flex items-center space-x-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
          <span>Upload CSV</span>
        </label>
        
        <button
          type="button"
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
          <span>Fetch CRM Leads</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {leads.length} leads loaded
        </div>
        
        {isRunning ? (
          <button
            onClick={stopCampaign}
            className="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <StopIcon className="h-5 w-5" />
            <span>Stop Campaign</span>
          </button>
        ) : (
          <button
            onClick={startCampaign}
            disabled={leads.length === 0}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayIcon className="h-5 w-5" />
            <span>Start Campaign</span>
          </button>
        )}
      </div>
    </div>
  );
}; 