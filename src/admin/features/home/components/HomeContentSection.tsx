import React from 'react';
import { Badge } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';

const getTypeBadge = (type: string) => {
  const map: Record<string, string> = {
    text: 'bg-gray-100 text-gray-700',
    'rich-text': 'bg-purple-100 text-purple-700',
    image: 'bg-green-100 text-green-700',
    json: 'bg-orange-100 text-orange-700',
  };
  return map[type] || 'bg-gray-100 text-gray-700';
};

const truncate = (str: string, len: number) => str.length <= len ? str : str.slice(0, len) + '...';

interface HomeContentSectionProps {
  section: string;
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const HomeContentSection: React.FC<HomeContentSectionProps> = ({ section, items, onEdit, onDelete }) => (
  <div className="admin-card-solid overflow-hidden">
    <div className="px-4 py-3 bg-tb-gray-50/80 border-b border-tb-gray-200/60">
      <h2 className="text-sm font-semibold text-tb-navy dark:text-white uppercase tracking-wider">{section}</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-tb-gray-50/50">
            <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Key</th>
            <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Label</th>
            <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Value</th>
            <th className="text-center px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Type</th>
            <th className="text-center px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Order</th>
            <th className="text-center px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Status</th>
            <th className="text-right px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-gray-100">
          {items.map((item: any) => (
            <tr key={item._id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-4 py-3"><span className="font-mono text-xs font-medium text-tb-navy dark:text-white">{item.key}</span></td>
              <td className="px-4 py-3"><span className="font-medium text-tb-navy dark:text-white">{item.label}</span></td>
              <td className="px-4 py-3"><span className="text-tb-gray-500 dark:text-gray-400 text-xs">{truncate(item.value, 60)}</span></td>
              <td className="px-4 py-3 text-center"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getTypeBadge(item.type)}`}>{item.type}</span></td>
              <td className="px-4 py-3 text-center"><span className="font-mono font-medium text-tb-navy dark:text-white">{item.order}</span></td>
              <td className="px-4 py-3 text-center"><Badge variant={item.isActive ? 'success' : 'danger'}>{item.isActive ? 'Active' : 'Inactive'}</Badge></td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onEdit(item)} className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(item)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HomeContentSection;
