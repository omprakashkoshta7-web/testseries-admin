import React from 'react';
import { Input, Select } from '@shared/components';
import { Search } from '@shared/icons';
import { USER_STATUS_OPTIONS, USER_ROLE_OPTIONS } from '../constants';

interface UserFiltersProps {
  search: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  search,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
}) => {
  return (
    <div className="admin-card-solid p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex gap-3">
          <div className="w-full sm:w-44">
            <Select
              options={USER_STATUS_OPTIONS}
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={USER_ROLE_OPTIONS}
              value={roleFilter}
              onChange={(e) => onRoleFilterChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
