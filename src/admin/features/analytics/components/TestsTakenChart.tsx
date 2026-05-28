import React from 'react';
import { BookOpen } from '@shared/icons';

interface TestsTakenChartProps {
  data: number[];
  maxTestsTaken: number;
}

export const TestsTakenChart: React.FC<TestsTakenChartProps> = ({ data, maxTestsTaken }) => (
  <div className="admin-card-solid overflow-hidden">
    <div className="px-5 py-4 border-b border-tb-gray-100 flex items-center justify-between">
      <h3 className="text-base font-bold text-tb-navy dark:text-white">Tests Taken</h3>
      <BookOpen className="w-4 h-4 text-purple-500" />
    </div>
    <div className="p-5">
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((count, i) => {
            const val = typeof count === 'number' ? count : (count as any)?.count ?? 0;
            return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-tb-gray-600 font-medium">Period {i + 1}</span>
                <span className="font-bold text-tb-navy dark:text-white">{val}</span>
              </div>
              <div className="w-full bg-tb-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-2.5 transition-all duration-1000" style={{ width: `${(val / (maxTestsTaken || 1)) * 100}%` }} />
              </div>
            </div>
            );
          })}
        </div>
      ) : <p className="text-tb-gray-400 text-sm py-4 text-center">No test data</p>}
    </div>
  </div>
);

export default TestsTakenChart;
