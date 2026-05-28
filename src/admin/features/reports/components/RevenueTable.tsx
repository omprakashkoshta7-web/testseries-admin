import React from 'react';
import type { IRevenueReport } from '../../../types';

interface RevenueTableProps {
  revenueReport: IRevenueReport[];
}

const RevenueTable: React.FC<RevenueTableProps> = ({ revenueReport }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="bg-tb-gray-50/80">
        <th className="text-left py-3 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
        <th className="text-right py-3 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
        <th className="text-right py-3 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Count</th>
        <th className="text-right py-3 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Refunds</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-tb-gray-50">
      {revenueReport.map((item: IRevenueReport, idx: number) => (
        <tr key={idx} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50">
          <td className="py-3 px-4 text-tb-gray-600 dark:text-gray-300">
            {new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </td>
          <td className="py-3 px-4 text-right font-semibold text-tb-navy dark:text-white">₹{item.revenue}</td>
          <td className="py-3 px-4 text-right text-tb-gray-600 dark:text-gray-300">{item.count}</td>
          <td className="py-3 px-4 text-right text-tb-red">{item.refunds}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RevenueTable;
