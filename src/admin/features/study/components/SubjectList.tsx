import React from 'react';
import { Button, Input } from '@shared/components';
import { Plus, Edit, Trash2, Search, GraduationCap } from '@shared/icons';
import type { IAdminSubject } from '../../../types';

interface SubjectListProps {
  subjects: IAdminSubject[];
  filteredSubjects: IAdminSubject[];
  subjectSearch: string;
  onSubjectSearchChange: (value: string) => void;
  onAddSubject: () => void;
  onEditSubject: (subject: IAdminSubject) => void;
  onDeleteSubject: (id: string, name: string) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, filteredSubjects, subjectSearch, onSubjectSearchChange, onAddSubject, onEditSubject, onDeleteSubject }) => (
  <>
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="w-full sm:w-72">
        <Input placeholder="Search subjects..." value={subjectSearch} onChange={(e) => onSubjectSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>
      <Button onClick={onAddSubject}><Plus className="w-4 h-4" /> Add Subject</Button>
    </div>

    <div className="admin-card-solid overflow-hidden">
      {subjects.length === 0 ? (
        <div className="p-12 text-center">
          <GraduationCap className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No subjects yet. Create your first subject.</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-tb-gray-50 border-b border-tb-gray-200/60">
              <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Icon</th>
              <th className="text-center text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Materials</th>
              <th className="text-right text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tb-gray-100">
            {filteredSubjects.map((s: IAdminSubject) => (
              <tr key={s.id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: s.color + '20', color: s.color }}>{s.name.charAt(0)}</div>
                    <div><p className="text-sm font-medium text-tb-navy dark:text-white">{s.name}</p><p className="text-xs text-tb-gray-400">{s.description}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-tb-gray-600 dark:text-gray-300">{s.icon}</td>
                <td className="px-4 py-3 text-center"><span className="px-2.5 py-1 bg-tb-blue-light text-tb-blue rounded-full text-xs font-semibold">{s.materialCount}</span></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onEditSubject(s)} className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue" title="Edit"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => onDeleteSubject(s.id, s.name)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </>
);

export default SubjectList;
