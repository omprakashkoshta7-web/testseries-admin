import React from 'react';
import { Input, Select } from '@shared/components';
import { Search } from '@shared/icons';
import type { IExamCategory, IAdminSubject, ITest } from '../../../types';

interface QuestionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterTestId: string;
  onFilterTestIdChange: (value: string) => void;
  filterCategory: string;
  onFilterCategoryChange: (value: string) => void;
  filterSubject: string;
  onFilterSubjectChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  tests: ITest[];
  categories: IExamCategory[];
  filteredSubjects: IAdminSubject[];
  typeFilterOptions: { value: string; label: string }[];
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  search,
  onSearchChange,
  filterTestId,
  onFilterTestIdChange,
  filterCategory,
  onFilterCategoryChange,
  filterSubject,
  onFilterSubjectChange,
  typeFilter,
  onTypeFilterChange,
  tests,
  categories,
  filteredSubjects,
  typeFilterOptions,
}) => {
  return (
    <div className="admin-card-solid p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="w-full sm:w-40">
            <Select
              options={[{ value: '', label: 'All Tests' }, ...tests.map((t: ITest) => ({ value: t.id, label: t.title }))]}
              value={filterTestId}
              onChange={(e) => onFilterTestIdChange(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              options={[{ value: '', label: 'All Categories' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]}
              value={filterCategory}
              onChange={(e) => onFilterCategoryChange(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              options={[{ value: '', label: 'All Subjects' }, ...filteredSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]}
              value={filterSubject}
              onChange={(e) => onFilterSubjectChange(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-36">
            <Select
              options={typeFilterOptions}
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionFilters;
