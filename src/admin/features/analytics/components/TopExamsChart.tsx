import React from 'react';
import { Award, Target, Users } from '@shared/icons';
import type { ITopExam } from '../../../types';

interface TopExamsChartProps {
  data: ITopExam[];
}

export const TopExamsChart: React.FC<TopExamsChartProps> = ({ data }) => (
  <div className="admin-card-solid overflow-hidden">
    <div className="px-5 py-4 border-b border-tb-gray-100 flex items-center justify-between">
      <h3 className="text-base font-bold text-tb-navy dark:text-white">Top Exams</h3>
      <Award className="w-4 h-4 text-orange-500" />
    </div>
    <div className="p-5">
      {data && data.length > 0 ? (
        <div className="space-y-3">
          {data.map((exam, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-tb-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm"
                style={{ backgroundColor: exam.color + '20', color: exam.color }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-tb-navy dark:text-white truncate">{exam.name}</p>
                <div className="flex items-center gap-3 text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{exam.attempts} attempts</span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" />Avg {exam.avgScore}%</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="w-20 bg-tb-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-admin-primary to-indigo-500 rounded-full h-2" style={{ width: `${exam.avgScore}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <p className="text-tb-gray-400 text-sm py-4 text-center">No exam data</p>}
    </div>
  </div>
);

export default TopExamsChart;
