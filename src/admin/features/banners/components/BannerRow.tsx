import React from 'react';
import { Badge } from '@shared/components';
import { Image, Edit, Trash2 } from '@shared/icons';
import { formatDate } from '../utils';
import type { IBanner } from '../../../types';

interface BannerRowProps {
  banner: IBanner;
  onEdit: (banner: IBanner) => void;
  onDelete: (banner: IBanner) => void;
}

const BannerRow: React.FC<BannerRowProps> = ({ banner, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
      <td className="py-3.5 px-4">
        <div className="w-12 h-8 rounded-lg overflow-hidden bg-tb-gray-100 flex items-center justify-center">
          {banner.image ? (
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          ) : (
            <Image className="w-4 h-4 text-tb-gray-400" />
          )}
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className="font-medium text-tb-navy dark:text-white">{banner.title}</span>
      </td>
      <td className="py-3.5 px-4">
        <span className="text-tb-gray-500 dark:text-gray-400">{banner.subtitle || '—'}</span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <Badge variant="default" className="capitalize">{banner.position}</Badge>
      </td>
      <td className="py-3.5 px-4 text-center">
        <span className="font-mono font-medium text-tb-navy dark:text-white">{banner.priority}</span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <Badge variant={banner.isActive ? 'success' : 'danger'}>
          {banner.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td className="py-3.5 px-4">
        <span className="text-xs text-tb-gray-500 dark:text-gray-400">
          {formatDate(banner.startsAt)} → {formatDate(banner.expiresAt)}
        </span>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(banner)}
            className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(banner)}
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

export default BannerRow;
