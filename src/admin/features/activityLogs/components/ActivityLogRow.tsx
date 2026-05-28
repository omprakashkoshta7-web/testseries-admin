import React from 'react';
import { Mail, Clock } from '@shared/icons';
import type { IActivityLog } from '../../../types';

interface Props {
  log: IActivityLog;
}

const ActivityLogRow: React.FC<Props> = ({ log }) => {
  return (
    <tr className="hover:bg-tb-blue-light/20 transition-colors">
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-tb-blue to-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0">
            {log.userId?.name?.charAt(0)?.toUpperCase() ?? '?'}
          </div>
          <div>
            <p className="font-semibold text-tb-navy dark:text-white">{log.userId?.name ?? 'Unknown'}</p>
            <div className="flex items-center gap-1 text-tb-gray-500 dark:text-gray-400 text-xs mt-0.5">
              <Mail className="w-3 h-3" />
              {log.userId?.email ?? '—'}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-tb-blue-light/30 text-tb-blue">
          {log.action}
        </span>
      </td>
      <td className="py-3.5 px-4 text-tb-gray-600 dark:text-gray-300">{log.resource}</td>
      <td className="py-3.5 px-4">
        <code className="text-xs bg-tb-gray-100 px-2 py-0.5 rounded text-tb-gray-600 dark:text-gray-300 font-mono">
          {log.resourceId || '—'}
        </code>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5 text-tb-gray-500 dark:text-gray-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          {new Date(log.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </td>
    </tr>
  );
};

export default ActivityLogRow;
