import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IAdminSubject } from '../../../types';

interface Props {
  subject: IAdminSubject;
  categoryName?: string;
  onEdit: (sub: IAdminSubject) => void;
  onDelete: (id: string) => void;
}

const SubjectRow: React.FC<Props> = ({ subject: sub, categoryName, onEdit, onDelete }) => {
  const catName = categoryName || (typeof sub.categoryId === 'object' ? sub.categoryId?.name : '');
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: sub.color }}>
          <span className="text-white font-bold text-lg">{sub.name[0]}</span>
        </div>
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold">{sub.name}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">{catName && <>{catName} &middot; </>}Order: {sub.order} &middot; {sub.isActive ? 'Active' : 'Inactive'}</p>
          {sub.description && <p className="text-xs text-tb-gray-400 mt-0.5">{sub.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onEdit(sub)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(sub._id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default SubjectRow;
