import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import type { IAccessRule, IAccessRuleForm } from '../../../types';
import { roleOptions, entityOptions } from '../constants';

interface Props {
  isOpen: boolean;
  editing: IAccessRule | null;
  form: IAccessRuleForm & { startDate: string; endDate: string };
  onFormChange: (form: IAccessRuleForm & { startDate: string; endDate: string }) => void;
  onSave: () => void;
  onClose: () => void;
}

const AccessRuleFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Access Rule' : 'Add Access Rule'}>
      <div className="space-y-4 p-4">
        <Select label="User Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} options={roleOptions} />
        <Select label="Entity Type" value={form.entityType} onChange={(e) => setForm({ ...form, entityType: e.target.value })} options={entityOptions} />
        <Input label="Entity ID" value={form.entityId} onChange={(e) => setForm({ ...form, entityId: e.target.value })} placeholder="MongoDB ObjectId" />
        <Input label="Max Tests (for free users)" type="number" value={String(form.maxTests)} onChange={(e) => setForm({ ...form, maxTests: parseInt(e.target.value) || 0 })} />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isLocked} onChange={(v) => setForm({ ...form, isLocked: v })} /> Locked</label>
        <Input label="Start Date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <Input label="End Date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default AccessRuleFormModal;
