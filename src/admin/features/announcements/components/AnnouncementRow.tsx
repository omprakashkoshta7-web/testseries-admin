import React from 'react';
import { Badge } from '@shared/components';
import { Pin, Edit, Trash2 } from '@shared/icons';
import { typeBadgeVariant } from '../constants';
import type { IAnnouncement } from '../../../types';

interface AnnouncementRowProps {
  announcement: IAnnouncement;
  onEdit: (announcement: IAnnouncement) => void;
  onDelete: (id: string, title: string) => void;
}

const AnnouncementRow: React.FC<AnnouncementRowProps> = ({ announcement: a, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-tb-gray-50 hover:bg-tb-gray-25 transition-colors">
      <td className="px-5 py-4 font-medium text-tb-navy dark:text-white">{a.title}</td>
      <td className="px-5 py-4">
        <Badge variant={typeBadgeVariant[a.type]}>{a.type}</Badge>
      </td>
      <td className="px-5 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
          a.priority === 'high' ? 'bg-red-100 text-red-700' :
          a.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {a.priority}
        </span>
      </td>
      <td className="px-5 py-4">
        {a.pinned ? <Pin className="w-4 h-4 text-tb-blue" /> : <span className="text-tb-gray-300">—</span>}
      </td>
      <td className="px-5 py-4 text-tb-gray-600 dark:text-gray-300 capitalize">{a.targetAudience}</td>
      <td className="px-5 py-4 text-tb-gray-600 dark:text-gray-300">{a.createdBy?.name ?? '—'}</td>
      <td className="px-5 py-4 text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
        {new Date(a.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => onEdit(a)} className="p-1.5 rounded-lg hover:bg-blue-50 text-tb-gray-400 hover:text-tb-blue transition-all" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(a._id, a.title)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AnnouncementRow;
