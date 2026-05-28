import React from 'react';
import { Mail, Clock } from '@shared/icons';
import { Badge } from '@shared/components';
import { TICKET_PRIORITY_STYLES, TICKET_STATUS_BADGE } from '../constants';
import type { ITicket } from '../../../types';

interface TicketRowProps {
  ticket: ITicket;
  onNavigate: (id: string) => void;
}

const TicketRow: React.FC<TicketRowProps> = ({ ticket, onNavigate }) => (
  <tr
    key={ticket.id}
    className="hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-blue-50/40 dark:hover:from-indigo-900/20 dark:hover:to-blue-900/20 transition-all duration-200 cursor-pointer group"
    onClick={() => onNavigate(ticket.id)}
  >
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-admin-primary to-indigo-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0">
          {ticket.subject?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
        <div>
          <p className="font-semibold text-tb-navy dark:text-white group-hover:text-admin-primary transition-colors line-clamp-1">{ticket.subject}</p>
          <div className="flex items-center gap-1 text-tb-gray-500 dark:text-gray-400 text-xs mt-0.5">
            <Mail className="w-3 h-3" />
            {ticket.userName} &lt;{ticket.userEmail}&gt;
          </div>
        </div>
      </div>
    </td>
    <td className="py-3.5 px-4">
      <span className="capitalize text-tb-gray-600 dark:text-gray-300">{ticket.category}</span>
    </td>
    <td className="py-3.5 px-4 text-center">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${TICKET_PRIORITY_STYLES[ticket.priority] || 'bg-gray-100 text-gray-700'}`}>
        {ticket.priority}
      </span>
    </td>
    <td className="py-3.5 px-4 text-center">
      {TICKET_STATUS_BADGE[ticket.status] ? (
        <Badge variant={TICKET_STATUS_BADGE[ticket.status].variant}>
          {TICKET_STATUS_BADGE[ticket.status].label}
        </Badge>
      ) : (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tb-gray-100 text-tb-gray-600 dark:text-gray-300">
          {ticket.status}
        </span>
      )}
    </td>
    <td className="py-3.5 px-4 text-center">
      <span className="inline-flex items-center justify-center w-8 h-8 bg-tb-gray-100 rounded-lg text-sm font-bold text-tb-navy dark:text-white">
        {ticket.messageCount}
      </span>
    </td>
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-1.5 text-tb-gray-500 dark:text-gray-400 text-xs">
        <Clock className="w-3.5 h-3.5" />
        {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
      </div>
    </td>
  </tr>
);

export default TicketRow;
