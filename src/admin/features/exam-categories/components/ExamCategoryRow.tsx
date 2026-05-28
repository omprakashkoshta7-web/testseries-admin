import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IExamCategory } from '../../../types';

interface Props {
  category: IExamCategory;
  onEdit: (cat: IExamCategory) => void;
  onDelete: (id: string) => void;
}

const ExamCategoryRow: React.FC<Props> = ({ category: cat, onEdit, onDelete }) => {
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {cat.image ? (
          <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-xl object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center">
            <span className="text-white font-bold text-lg">{cat.name[0]}</span>
          </div>
        )}
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold">{cat.name}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">/{cat.slug} &middot; Order: {cat.order} &middot; {cat.isActive ? 'Active' : 'Inactive'}</p>
          {cat.description && <p className="text-xs text-tb-gray-400 mt-0.5">{cat.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onEdit(cat)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(cat._id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default ExamCategoryRow;
