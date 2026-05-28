import React from 'react';
import { Search } from '@shared/icons';
import { Input, Select } from '@shared/components';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'test', label: 'Test' },
  { value: 'question', label: 'Question' },
  { value: 'study_material', label: 'Study Material' },
  { value: 'exam', label: 'Exam' },
];

const ReviewFilters: React.FC<Props> = ({ search, onSearchChange, statusFilter, onStatusFilterChange, typeFilter, onTypeFilterChange }) => {
  return (
    <div className="admin-toolbar flex flex-col gap-4 lg:flex-row">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by entity ID..."
          className="pl-10"
        />
      </div>
      <Select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        options={statusOptions}
        className="w-36"
      />
      <Select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        options={typeOptions}
        className="w-40"
      />
    </div>
  );
};

export default ReviewFilters;
