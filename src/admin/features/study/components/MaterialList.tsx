import React from 'react';
import { Button, Input, Select, Loader } from '@shared/components';
import { Plus, Search, BookOpen } from '@shared/icons';
import type { IAdminSubject } from '../../../types';
import StudyMaterialRow from './StudyMaterialRow';

interface MaterialListProps {
  materials: any[];
  filteredMaterials: any[];
  materialSearch: string;
  selectedSubject: string;
  subjects: IAdminSubject[];
  loading: boolean;
  onMaterialSearchChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onAddMaterial: () => void;
  onEditMaterial: (material: any) => void;
  onDeleteMaterial: (id: string, title: string) => void;
}

const MaterialList: React.FC<MaterialListProps> = ({ materials, filteredMaterials, materialSearch, selectedSubject, subjects, loading, onMaterialSearchChange, onSubjectChange, onAddMaterial, onEditMaterial, onDeleteMaterial }) => (
  <>
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex gap-3 flex-1">
        <div className="w-full sm:w-72">
          <Input placeholder="Search materials..." value={materialSearch} onChange={(e) => onMaterialSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-full sm:w-44">
          <Select options={[{ value: '', label: 'All Subjects' }, ...subjects.map((s: IAdminSubject) => ({ value: s.id, label: s.name }))]} value={selectedSubject} onChange={(e) => onSubjectChange(e.target.value)} />
        </div>
      </div>
      <Button onClick={onAddMaterial}><Plus className="w-4 h-4" /> Add Material</Button>
    </div>

    {loading ? (
      <div className="flex justify-center py-12"><Loader size="lg" /></div>
    ) : filteredMaterials.length === 0 ? (
      <div className="admin-card-solid p-12 text-center">
        <BookOpen className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
        <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No materials found.</p>
      </div>
    ) : (
      <div className="admin-card-solid overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-tb-gray-50 border-b border-tb-gray-200/60">
              <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Subject</th>
              <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Category</th>
              <th className="text-center text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Duration</th>
              <th className="text-center text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Active</th>
              <th className="text-right text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tb-gray-100">
            {filteredMaterials.map((m: any) => (
              <StudyMaterialRow key={m.id} material={m} subjects={subjects} onEdit={onEditMaterial} onDelete={onDeleteMaterial} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);

export default MaterialList;
