import React from 'react';
import { Input, Select } from '@shared/components';
import { Search } from '@shared/icons';
import type { IAdminExam } from '../../../types';

const statusFilterOptions = [
  { value: '', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const testTypeFilterOptions = [
  { value: '', label: 'All Types' },
  { value: 'subject', label: 'Subject Wise' },
  { value: 'chapter', label: 'Chapter Wise' },
  { value: 'full', label: 'Full Length' },
];

interface TestFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  testType: string;
  onTestTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  exams: IAdminExam[];
}

const TestFilters: React.FC<TestFiltersProps> = ({ search, onSearchChange, category, onCategoryChange, testType, onTestTypeChange, statusFilter, onStatusFilterChange, exams }) => (
  <div className="admin-card-solid p-4">
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input placeholder="Search tests..." value={search} onChange={(e) => onSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>
      <div className="flex gap-3">
        <div className="w-full sm:w-44">
          <Select options={[{ value: '', label: 'All Exams' }, ...exams.map((e: IAdminExam) => ({ value: e.name, label: e.name }))]} value={category} onChange={(e) => onCategoryChange(e.target.value)} />
        </div>
        <div className="w-full sm:w-44">
          <Select options={testTypeFilterOptions} value={testType} onChange={(e) => onTestTypeChange(e.target.value)} />
        </div>
        <div className="w-full sm:w-44">
          <Select options={statusFilterOptions} value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value)} />
        </div>
      </div>
    </div>
  </div>
);

export default TestFilters;
