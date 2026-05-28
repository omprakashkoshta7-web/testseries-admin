import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2, Lock } from '@shared/icons';
import type { IAccessRule } from '../../../types';

interface Props {
  rule: IAccessRule;
  onEdit: (rule: IAccessRule) => void;
  onDelete: (id: string) => void;
}

const AccessRuleRow: React.FC<Props> = ({ rule, onEdit, onDelete }) => {
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rule.isLocked ? 'bg-gradient-to-br from-red-500 to-orange-600' : 'bg-gradient-to-br from-green-500 to-emerald-600'}`}>
          <Lock className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold capitalize">{rule.role} - {rule.entityType.replace('_', ' ')}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">Entity: {rule.entityId} &middot; Max Tests: {rule.maxTests} &middot; {rule.isLocked ? 'Locked' : 'Unlocked'}</p>
          {(rule.startDate || rule.endDate) && <p className="text-xs text-tb-gray-400 mt-0.5">{rule.startDate ? 'From: ' + rule.startDate.split('T')[0] : ''} {rule.endDate ? 'To: ' + rule.endDate.split('T')[0] : ''}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onEdit(rule)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(rule._id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default AccessRuleRow;
