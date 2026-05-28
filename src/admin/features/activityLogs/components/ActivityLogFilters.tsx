import React from 'react';
import { Search } from '@shared/icons';
import { Input } from '@shared/components';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

const ActivityLogFilters: React.FC<Props> = ({ search, onSearchChange }) => {
  return (
    <div className="admin-toolbar flex flex-col gap-4 lg:flex-row">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search activity logs..."
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default ActivityLogFilters;
