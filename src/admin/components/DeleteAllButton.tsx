import React, { useState } from 'react';
import { Button } from '@shared/components';
import { Trash2 } from '@shared/icons';
import { adminApiClient } from '../utils';
import { ConfirmModal } from './index';
import { useToast } from '../utils/ToastContext';

interface DeleteAllButtonProps {
  resource: string;
  displayName: string;
  onSuccess?: () => void;
}

const DeleteAllButton: React.FC<DeleteAllButtonProps> = ({ resource, displayName, onSuccess }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      await adminApiClient.delete(`/delete-all/${resource}`);
      showToast(`All ${displayName} deleted successfully`, 'success');
      setShowConfirm(false);
      onSuccess?.();
    } catch (err: any) {
      showToast(err?.response?.data?.message || `Failed to delete ${displayName}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirm(true)}>
        <Trash2 className="h-4 w-4" /> Delete All {displayName}
      </Button>
      <ConfirmModal
        isOpen={showConfirm}
        title={`Delete All ${displayName}?`}
        message={`This will permanently delete all ${displayName} from the database. This action cannot be undone. Are you sure?`}
        confirmLabel={loading ? 'Deleting...' : 'Delete All'}
        variant="danger"
        isLoading={loading}
        onConfirm={handleDeleteAll}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default DeleteAllButton;
