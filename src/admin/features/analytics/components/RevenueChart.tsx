import React from 'react';
import { DollarSign } from '@shared/icons';

interface RevenueChartProps {
  data: { month: string; revenue: number; subscriptions: number; oneTime: number }[];
  maxRevenue: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, maxRevenue }) => (
  <div className="admin-card-solid overflow-hidden">
    <div className="px-5 py-4 border-b border-tb-gray-100 flex items-center justify-between">
      <h3 className="text-base font-bold text-tb-navy dark:text-white">Revenue Overview</h3>
      <DollarSign className="w-4 h-4 text-green-500" />
    </div>
    <div className="p-5">
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, i) => {
            const revenue = item.revenue ?? 0;
            const subscriptions = item.subscriptions ?? 0;
            const oneTime = item.oneTime ?? 0;
            return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-tb-gray-600 font-medium">{item.month}</span>
                <span className="font-bold text-tb-navy dark:text-white">${revenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-tb-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-2.5 transition-all duration-1000" style={{ width: `${(revenue / (maxRevenue || 1)) * 100}%` }} />
              </div>
              <div className="flex gap-4 text-xs text-tb-gray-400 mt-1.5">
                <span>Subscriptions: ${subscriptions.toLocaleString()}</span>
                <span>One-time: ${oneTime.toLocaleString()}</span>
              </div>
            </div>
            );
          })}
        </div>
      ) : <p className="text-tb-gray-400 text-sm py-4 text-center">No revenue data</p>}
    </div>
  </div>
);

export default RevenueChart;
