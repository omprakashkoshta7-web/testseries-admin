import React from 'react';
import { Users } from '@shared/icons';
import { Badge } from '@shared/components';

interface UserGrowthChartProps {
  data: { date: string; newUsers: number; totalUsers: number; activeUsers: number }[];
  maxUsers: number;
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data, maxUsers }) => (
  <div className="admin-card-solid overflow-hidden">
    <div className="px-5 py-4 border-b border-tb-gray-100 flex items-center justify-between">
      <h3 className="text-base font-bold text-tb-navy dark:text-white">User Growth</h3>
      <Users className="w-4 h-4 text-blue-500" />
    </div>
    <div className="p-5">
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, i) => {
            const newUsers = item.newUsers ?? 0;
            const totalUsers = item.totalUsers ?? 0;
            const activeUsers = item.activeUsers ?? 0;
            return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-tb-gray-600 font-medium">{item.date}</span>
                <div className="flex gap-3">
                  <Badge variant="success">+{newUsers}</Badge>
                  <span className="font-bold text-tb-navy dark:text-white">{totalUsers}</span>
                </div>
              </div>
              <div className="w-full bg-tb-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-2.5 transition-all duration-1000" style={{ width: `${(totalUsers / (maxUsers || 1)) * 100}%` }} />
              </div>
              <p className="text-xs text-tb-gray-400 mt-1.5">{activeUsers} active</p>
            </div>
            );
          })}
        </div>
      ) : <p className="text-tb-gray-400 text-sm py-4 text-center">No user growth data</p>}
    </div>
  </div>
);

export default UserGrowthChart;
