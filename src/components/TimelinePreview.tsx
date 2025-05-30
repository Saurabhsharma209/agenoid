import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export const TimelinePreview: React.FC = () => {
  const { activePlans } = useStore();

  return (
    <div className="space-y-6">
      {activePlans.map((plan) => (
        <div key={plan.id} className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {plan.name}
            </h3>
            <span className="badge badge-info">Active</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {plan.description}
          </p>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {plan.steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex-shrink-0">
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white">
                    {step}
                  </div>
                </div>
                {index < plan.steps.length - 1 && (
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 