import React from 'react';
import { Input } from '@shared/components';
import { Search } from '@shared/icons';

interface PurchaseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const PurchaseFilters: React.FC<PurchaseFiltersProps> = ({ search, onSearchChange }) => (
  <div className="admin-card-solid p-4">
    <Input placeholder="Search by user name, email or material title..." value={search} onChange={(e) => onSearchChange(e.target.value)} icon={<Search className="w-4 h-4" />} />
  </div>
);

export default PurchaseFilters;
