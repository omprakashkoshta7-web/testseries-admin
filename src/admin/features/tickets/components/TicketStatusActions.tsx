import React from 'react';
import { Select } from '@shared/components';
import { TICKET_STATUS_OPTIONS, TICKET_PRIORITY_OPTIONS } from '../constants';

interface TicketStatusActionsProps {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

const TicketStatusActions: React.FC<TicketStatusActionsProps> = ({ status, priority, onStatusChange, onPriorityChange }) => (
  <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[180px]">
    <div>
      <label className="block text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
      <Select
        options={TICKET_STATUS_OPTIONS}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      />
    </div>
    <div>
      <label className="block text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Priority</label>
      <Select
        options={TICKET_PRIORITY_OPTIONS}
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      />
    </div>
  </div>
);

export default TicketStatusActions;
