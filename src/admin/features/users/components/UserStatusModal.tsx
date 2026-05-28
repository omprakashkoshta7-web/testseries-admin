import React, { useState, useEffect } from 'react';
import { Modal, Select, Button } from '@shared/components';
import type { IUser } from '../../../types';
import { USER_STATUS_OPTIONS } from '../constants';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
  onSave: (id: string, status: string) => void;
}

type UserStatus = 'active' | 'inactive' | 'disabled';

const UserStatusModal: React.FC<UserStatusModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>((user?.status as UserStatus) || 'active');

  useEffect(() => {
    if (user) setSelectedStatus(user.status);
  }, [user]);

  const handleSave = () => {
    if (user) onSave(user.id, selectedStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Change Status - ${user?.name || ''}`}
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as UserStatus)}
          options={USER_STATUS_OPTIONS.filter((opt) => opt.value !== '')}
        />
      </div>
    </Modal>
  );
};

export default UserStatusModal;
