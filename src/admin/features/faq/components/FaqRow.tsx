import React from 'react';
import { Badge } from '@shared/components';
import { Edit, HelpCircle, Trash2 } from '@shared/icons';
import type { IFaq } from '../../../types';

interface FaqRowProps {
  faq: IFaq;
  onEdit: (faq: IFaq) => void;
  onDelete: (faq: IFaq) => void;
}

const FaqRow: React.FC<FaqRowProps> = ({ faq, onEdit, onDelete }) => (
  <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-tb-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-4 h-4 text-tb-blue" />
        </div>
        <span className="font-medium text-tb-navy dark:text-white line-clamp-1">{faq.question}</span>
      </div>
    </td>
    <td className="py-3.5 px-4"><Badge variant="default">{faq.category}</Badge></td>
    <td className="py-3.5 px-4 text-center"><span className="font-mono font-medium text-tb-navy dark:text-white">{faq.order}</span></td>
    <td className="py-3.5 px-4 text-center"><Badge variant={faq.isActive ? 'success' : 'danger'}>{faq.isActive ? 'Active' : 'Inactive'}</Badge></td>
    <td className="py-3.5 px-4 text-right">
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(faq)} className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
        <button onClick={() => onDelete(faq)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
      </div>
    </td>
  </tr>
);

export default FaqRow;
