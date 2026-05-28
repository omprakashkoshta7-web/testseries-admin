import React from 'react';
import { UserPlus, Trash2 } from '@shared/icons';
import { formatDate } from '../utils';
import type { IGroup } from '../../../types';

interface GroupCardProps {
  group: IGroup;
  onEdit?: (group: IGroup) => void;
  onDelete: (id: string, name: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onDelete }) => {
  return (
    <tr className="border-b border-tb-gray-50 hover:bg-tb-gray-25 transition-colors">
      <td className="px-5 py-4 font-medium text-tb-navy dark:text-white">{group.name}</td>
      <td className="px-5 py-4 text-tb-gray-600 dark:text-gray-300 max-w-[300px] truncate">
        {group.description || <span className="text-tb-gray-300">—</span>}
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1 text-tb-gray-600 dark:text-gray-300">
          <UserPlus className="w-3.5 h-3.5" />
          {group.memberCount}
        </span>
      </td>
      <td className="px-5 py-4 text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
        {formatDate(group.createdAt)}
      </td>
      <td className="px-5 py-4 text-right">
        <button
          onClick={() => onDelete(group.id, group.name)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default GroupCard;
