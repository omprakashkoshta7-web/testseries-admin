import React from 'react';
import { Hash, Calendar, Users, Check, X, Edit, Trash2 } from '@shared/icons';
import { formatDate } from '../utils';
import type { IBatch } from '../../../types';

interface BatchCardProps {
  batch: IBatch;
  onEdit: (batch: IBatch) => void;
  onDelete: (id: string, name: string) => void;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-tb-gray-50 hover:bg-tb-gray-25 transition-colors">
      <td className="px-5 py-4 font-medium text-tb-navy dark:text-white">{batch.name}</td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-tb-gray-50 rounded-lg text-xs font-mono text-tb-gray-600 dark:text-gray-300">
          <Hash className="w-3 h-3" />
          {batch.code}
        </span>
      </td>
      <td className="px-5 py-4 text-tb-gray-600 dark:text-gray-300 max-w-[200px] truncate">
        {batch.subjects.join(', ')}
      </td>
      <td className="px-5 py-4 text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(batch.startDate)}
        </span>
      </td>
      <td className="px-5 py-4 text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
        {batch.endDate ? (
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(batch.endDate)}
          </span>
        ) : (
          <span className="text-tb-gray-300">—</span>
        )}
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1 text-tb-gray-600 dark:text-gray-300">
          <Users className="w-3.5 h-3.5" />
          {batch.studentCount}
        </span>
      </td>
      <td className="px-5 py-4">
        {batch.isActive ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            <Check className="w-3 h-3" />Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            <X className="w-3 h-3" />Inactive
          </span>
        )}
      </td>
      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onEdit(batch)}
            className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(batch.id, batch.name)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BatchCard;
