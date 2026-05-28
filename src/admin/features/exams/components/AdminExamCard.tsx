import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IAdminExam } from '../../../types';
import { getCategoryName } from '../utils';

interface Props {
  exam: IAdminExam;
  onEdit: (exam: IAdminExam) => void;
  onDelete: (id: string) => void;
}

const AdminExamCard: React.FC<Props> = ({ exam, onEdit, onDelete }) => {
  const catName = getCategoryName(exam);
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {exam.bannerUrl ? (
          <img src={exam.bannerUrl} alt={exam.name} className="w-14 h-14 rounded-xl object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center">
            <span className="text-white font-bold text-lg">{exam.name[0]}</span>
          </div>
        )}
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold">{exam.name}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">
            {catName} &middot; {exam.difficulty} &middot; {exam.isActive ? 'Active' : 'Inactive'} &middot; Tests: {exam.totalTests} &middot; Subjects: {exam.totalSubjects}
          </p>
          {exam.description && <p className="text-xs text-tb-gray-400 mt-0.5">{exam.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onEdit(exam)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(exam._id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default AdminExamCard;
