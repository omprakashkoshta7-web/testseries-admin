import React from 'react';
import { Users } from '@shared/icons';

interface EnrollmentRowProps {
  enrollment: {
    _id: string;
    userId?: { name?: string; email?: string };
    testId?: { name?: string; category?: string };
    enrolledAt: string;
  };
}

const EnrollmentRow: React.FC<EnrollmentRowProps> = ({ enrollment: e }) => (
  <tr key={e._id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-tb-gray-400" />
        <span className="font-medium text-tb-navy dark:text-white">{e.userId?.name || '—'}</span>
      </div>
    </td>
    <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{e.userId?.email || '—'}</td>
    <td className="px-4 py-3 font-medium text-tb-navy dark:text-white">{e.testId?.name || '—'}</td>
    <td className="px-4 py-3">
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-tb-blue">{e.testId?.category || '—'}</span>
    </td>
    <td className="px-4 py-3 text-right text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
      {new Date(e.enrolledAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
    </td>
  </tr>
);

export default EnrollmentRow;
