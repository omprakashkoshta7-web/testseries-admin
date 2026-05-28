import React from 'react';
import { Badge } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IAdminSubject, IAdminStudyMaterial } from '../../../types';

interface StudyMaterialRowProps {
  material: IAdminStudyMaterial;
  subjects: IAdminSubject[];
  onEdit: (material: IAdminStudyMaterial) => void;
  onDelete: (id: string, title: string) => void;
}

const StudyMaterialRow: React.FC<StudyMaterialRowProps> = ({ material, subjects, onEdit, onDelete }) => {
  const subName = typeof material.subject === 'object'
    ? material.subject?.name
    : subjects.find((s: IAdminSubject) => s.id === material.subject)?.name || 'Unknown';

  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50">
      <td className="px-4 py-3"><p className="text-sm font-medium text-tb-navy dark:text-white max-w-xs truncate" title={material.title}>{material.title}</p></td>
      <td className="px-4 py-3 text-sm text-tb-gray-600 dark:text-gray-300">{subName}</td>
      <td className="px-4 py-3"><Badge variant="info">{material.category}</Badge></td>
      <td className="px-4 py-3 text-center text-sm text-tb-gray-600 dark:text-gray-300">{material.duration}m</td>
      <td className="px-4 py-3 text-center"><Badge variant={material.isActive ? 'success' : 'danger'}>{material.isActive ? 'Yes' : 'No'}</Badge></td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => onEdit(material)} className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue" title="Edit"><Edit className="w-4 h-4" /></button>
          <button onClick={() => onDelete(material.id, material.title)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );
};

export default StudyMaterialRow;
