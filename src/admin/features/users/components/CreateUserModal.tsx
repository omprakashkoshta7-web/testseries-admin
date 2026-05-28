import React from 'react';
import { Button, Input, Modal, Select } from '@shared/components';
import { AlertCircle } from '@shared/icons';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: { name: string; email: string; password: string; phone: string; role: string };
  onFormChange: (form: any) => void;
  error: string | null;
  onSubmit: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, form, onFormChange, error, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Create User"
    footer={<div className="flex gap-3"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={onSubmit}>Create</Button></div>}>
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <Input label="Name" value={form.name} onChange={(e) => onFormChange({ ...form, name: e.target.value })} required />
      <Input label="Email" type="email" value={form.email} onChange={(e) => onFormChange({ ...form, email: e.target.value })} required />
      <Input label="Password" type="password" value={form.password} onChange={(e) => onFormChange({ ...form, password: e.target.value })} required />
      <Input label="Phone" value={form.phone} onChange={(e) => onFormChange({ ...form, phone: e.target.value })} />
      <Select label="Role" value={form.role} onChange={(e) => onFormChange({ ...form, role: e.target.value })} options={[{ value: 'user', label: 'User' }, { value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }, { value: 'support', label: 'Support' }]} />
    </div>
  </Modal>
);

export default CreateUserModal;
