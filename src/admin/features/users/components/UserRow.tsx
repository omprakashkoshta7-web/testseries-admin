import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@shared/components';
import { Mail, Phone, UserCheck, Calendar, Edit, Ban, Trash2 } from '@shared/icons';
import type { IUser } from '../../../types';
import { USER_STATUS_BADGE } from '../constants';

interface UserRowProps {
  user: IUser;
  onEditStatus: (id: string, currentStatus: string) => void;
  onDelete: (id: string, name: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEditStatus, onDelete }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-blue-50/40 dark:hover:from-indigo-900/20 dark:hover:to-blue-900/20 transition-all duration-200 cursor-pointer group"
      onClick={() => navigate(`/admin/users/${user.id}`)}
    >
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-admin-primary to-indigo-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0">
            {user.name?.charAt(0)?.toUpperCase() ?? '?'}
          </div>
          <div>
            <p className="font-semibold text-tb-navy dark:text-white group-hover:text-admin-primary transition-colors">{user.name}</p>
            <div className="flex items-center gap-1 text-tb-gray-500 dark:text-gray-400 text-xs mt-0.5">
              <Mail className="w-3 h-3" />
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-1.5 text-tb-gray-600 dark:text-gray-300">
          <Phone className="w-3.5 h-3.5 text-tb-gray-400" />
          <span className="text-sm">{user.phone || '\u2014'}</span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          user.role === 'admin'
            ? 'bg-purple-50 text-purple-700'
            : 'bg-tb-gray-100 text-tb-gray-600 dark:text-gray-300'
        }`}>
          <UserCheck className="w-3 h-3" />
          {user.role}
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <span className="inline-flex items-center justify-center w-8 h-8 bg-tb-gray-100 rounded-lg text-sm font-bold text-tb-navy dark:text-white">
          {user.testsCompleted}
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <Badge variant={USER_STATUS_BADGE[user.status] || 'primary'}>{user.status}</Badge>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-1.5 text-tb-gray-500 dark:text-gray-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '\u2014'}
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${user.id}`); }}
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-tb-gray-400 hover:text-admin-primary transition-all"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEditStatus(user.id, user.status); }}
            className="p-2 rounded-lg hover:bg-orange-50 text-tb-gray-400 hover:text-orange-500 transition-all"
            title={user.status === 'disabled' ? 'Enable' : 'Disable'}
          >
            <Ban className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(user.id, user.name); }}
            className="p-2 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
