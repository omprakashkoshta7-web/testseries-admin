import React from 'react';
import { Input, Select } from '@shared/components';
import { Search } from '@shared/icons';

const categoryFilterOptions = [
  { value: '', label: 'All Categories' },
  { value: 'General', label: 'General' },
  { value: 'Account', label: 'Account' },
  { value: 'Payment', label: 'Payment' },
  { value: 'Exam', label: 'Exam' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Other', label: 'Other' },
];

interface FaqFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

const FaqFilters: React.FC<FaqFiltersProps> = ({ search, onSearchChange, categoryFilter, onCategoryFilterChange }) => (
  <div className="admin-card-solid p-4">
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input placeholder="Search FAQs..." value={search} onChange={(e) => onSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>
      <div className="flex gap-3">
        <div className="w-full sm:w-44">
          <Select options={categoryFilterOptions} value={categoryFilter} onChange={(e) => onCategoryFilterChange(e.target.value)} />
        </div>
      </div>
    </div>
  </div>
);

export default FaqFilters;
