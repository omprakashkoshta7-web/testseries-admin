import React from 'react';
import { Input } from '@shared/components';
import { Search } from '@shared/icons';

interface EnrollmentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const EnrollmentFilters: React.FC<EnrollmentFiltersProps> = ({ search, onSearchChange }) => (
  <div className="admin-card-solid p-4">
    <Input placeholder="Search by user name, email or test name..." value={search} onChange={(e) => onSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
  </div>
);

export default EnrollmentFilters;
