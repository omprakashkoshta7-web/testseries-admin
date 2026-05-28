import React from 'react';
import { Button, Badge } from '@shared/components';
import { Mail, MessageSquare, Smartphone, Send, Loader2 as LoaderIcon } from '@shared/icons';
import { getTypeBadge, getStatusBadge, formatDate } from '../utils';
import type { INotification } from '../../../types';

interface NotificationRowProps {
  notification: INotification;
  onEdit: (n: INotification) => void;
  onSend: (id: string, title: string) => void;
  onDelete: (id: string, title: string) => void;
  sendingId: string | null;
}

const NotificationRow: React.FC<NotificationRowProps> = ({ notification: n, onEdit, onSend, onDelete, sendingId }) => {
  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-tb-navy dark:text-white truncate max-w-[200px]">{n.title}</p>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400 truncate max-w-[200px]">{n.body}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getTypeBadge(n.type)}`}>
          {n.type.replace('_', ' ')}
        </span>
      </td>
      <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300 capitalize">{n.targetAudience}</td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          {n.channels.includes('email') && <Mail className="w-4 h-4 text-tb-blue" />}
          {n.channels.includes('sms') && <MessageSquare className="w-4 h-4 text-green-500" />}
          {n.channels.includes('push') && <Smartphone className="w-4 h-4 text-orange-500" />}
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant={getStatusBadge(n.status)}>{n.status}</Badge>
      </td>
      <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{n.createdBy?.name || '—'}</td>
      <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300 text-xs whitespace-nowrap">{formatDate(n.createdAt)}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(n)}>
            Edit
          </Button>
          {n.status === 'draft' && (
            <Button
              size="sm"
              onClick={() => onSend(n._id, n.title)}
              disabled={sendingId === n._id}
            >
              {sendingId === n._id ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => onDelete(n._id, n.title)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default NotificationRow;
