import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface KPIWidgetProps {
  title: string;
  value: number;
  trend: number;
  trendLabel: string;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  trend,
  trendLabel
}) => {
  const isPositive = trend > 0;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="card">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value.toLocaleString()}
        </p>
        <span
          className={`ml-2 flex items-baseline text-sm font-semibold ${trendColor}`}
        >
          <TrendIcon className="h-4 w-4 flex-shrink-0 self-center" />
          <span className="ml-1">{Math.abs(trend)}%</span>
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {trendLabel}
      </p>
    </div>
  );
}; 