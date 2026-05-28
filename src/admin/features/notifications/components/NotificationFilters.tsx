import React from 'react';
import { Input, Select } from '@shared/components';
import { Search } from '@shared/icons';

interface Option {
  value: string;
  label: string;
}

interface NotificationFiltersProps {
  search: string;
  typeFilter: string;
  audienceFilter: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onAudienceFilterChange: (value: string) => void;
  typeOptions: Option[];
  audienceOptions: Option[];
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  search,
  typeFilter,
  audienceFilter,
  onSearchChange,
  onTypeFilterChange,
  onAudienceFilterChange,
  typeOptions,
  audienceOptions,
}) => {
  return (
    <div className="admin-card-solid p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex gap-3">
          <div className="w-full sm:w-44">
            <Select options={typeOptions} value={typeFilter} onChange={(e) => onTypeFilterChange(e.target.value)} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={audienceOptions} value={audienceFilter} onChange={(e) => onAudienceFilterChange(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;
