import React from 'react';
import { useStore } from '../store/useStore';
import {
  KPIWidget,
  DonutChart,
  BarChart,
  LineChart,
  LiveTrackerGrid
} from '../components';

export const DashboardPage: React.FC = () => {
  const { metrics } = useStore();

  // Prepare data for charts
  const planDistributionData = [
    { name: 'Plan A', value: metrics.planDistribution.A },
    { name: 'Plan B', value: metrics.planDistribution.B },
  ];

  const escalationReasonsData = [
    { name: 'No Response', value: 45 },
    { name: 'Call Failed', value: 23 },
    { name: 'Message Not Delivered', value: 18 },
    { name: 'Other', value: 14 },
  ];

  const conversionsOverTimeData = [
    { time: '00:00', conversions: 10 },
    { time: '04:00', conversions: 15 },
    { time: '08:00', conversions: 25 },
    { time: '12:00', conversions: 35 },
    { time: '16:00', conversions: 40 },
    { time: '20:00', conversions: 45 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      </h1>

      {/* KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIWidget
          title="Total Leads"
          value={metrics.totalLeads}
          trend={5}
          trendLabel="vs last hour"
        />
        <KPIWidget
          title="Plan Switches"
          value={metrics.planDistribution.A + metrics.planDistribution.B}
          trend={-2}
          trendLabel="vs last hour"
        />
        <KPIWidget
          title="Escalations"
          value={metrics.escalations}
          trend={3}
          trendLabel="vs last hour"
        />
        <KPIWidget
          title="Conversions"
          value={metrics.conversions}
          trend={8}
          trendLabel="vs last hour"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Plan Distribution</h2>
          <DonutChart data={planDistributionData} />
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Escalation Reasons</h2>
          <BarChart data={escalationReasonsData} />
        </div>

        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Conversions Over Time</h2>
          <LineChart data={conversionsOverTimeData} />
        </div>
      </div>

      {/* Active Contacts */}
      <div className="card">
        <LiveTrackerGrid />
      </div>
    </div>
  );
}; 