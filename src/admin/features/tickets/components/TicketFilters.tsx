import React from 'react';
import { Select } from '@shared/components';
import { TICKET_STATUS_FILTER_OPTIONS } from '../constants';

interface TicketFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({ statusFilter, onStatusFilterChange }) => (
  <div className="admin-card-solid p-4">
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="w-full sm:w-48">
        <Select
          options={TICKET_STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default TicketFilters;
