import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchBatches, createBatch, updateBatch, deleteBatch, fetchGroups, createGroup, deleteGroup } from '../store/batches.slice';
import { selectAdminBatches, selectAdminGroups, selectAdminBatchesLoading } from '../store/batches.selectors';
import type { IBatch, IBatchForm, IGroupForm } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyBatchForm, emptyGroupForm } from '../constants';
import type { Tab } from '../components';

export const useBatchesGroups = () => {
  const dispatch = useAdminDispatch();
  const batches = useAdminSelector(selectAdminBatches);
  const groups = useAdminSelector(selectAdminGroups);
  const loading = useAdminSelector(selectAdminBatchesLoading);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>('batches');

  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<IBatch | null>(null);
  const [batchForm, setBatchForm] = useState<IBatchForm>(emptyBatchForm);

  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupForm, setGroupForm] = useState<IGroupForm>(emptyGroupForm);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string; type: 'batch' | 'group' } | null>(null);

  const loadData = useCallback(() => {
    dispatch(fetchBatches());
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => { loadData(); }, [loadData]);

  const openCreateBatch = () => {
    setEditingBatch(null);
    setBatchForm(emptyBatchForm);
    setBatchModalOpen(true);
  };

  const openEditBatch = (batch: IBatch) => {
    setEditingBatch(batch);
    setBatchForm({
      name: batch.name,
      description: batch.description,
      code: batch.code,
      subjects: batch.subjects,
      startDate: batch.startDate,
      endDate: batch.endDate ?? '',
      isActive: batch.isActive,
    });
    setBatchModalOpen(true);
  };

  const handleSaveBatch = async () => {
    try {
      if (editingBatch) {
        await dispatch(updateBatch({ id: editingBatch.id, data: batchForm })).unwrap();
      } else {
        await dispatch(createBatch(batchForm)).unwrap();
      }
      showToast('Batch ' + (editingBatch ? 'updated' : 'created') + ' successfully', 'success');
      setBatchModalOpen(false);
    } catch (err: any) {
      showToast(err?.message || 'Failed to save batch', 'error');
    }
  };

  const handleDeleteBatch = (id: string, name: string) => {
    setConfirmDelete({ id, name, type: 'batch' });
  };

  const handleBatchFormChange = (field: keyof IBatchForm, value: any) => {
    setBatchForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCreateGroup = () => {
    setGroupForm(emptyGroupForm);
    setGroupModalOpen(true);
  };

  const handleSaveGroup = async () => {
    try {
      await dispatch(createGroup(groupForm)).unwrap();
      showToast('Group created successfully', 'success');
      setGroupModalOpen(false);
    } catch (err: any) {
      showToast(err?.message || 'Failed to save group', 'error');
    }
  };

  const handleDeleteGroup = (id: string, name: string) => {
    setConfirmDelete({ id, name, type: 'group' });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      if (confirmDelete.type === 'batch') {
        await dispatch(deleteBatch(confirmDelete.id)).unwrap();
      } else {
        await dispatch(deleteGroup(confirmDelete.id)).unwrap();
      }
      showToast((confirmDelete.type === 'batch' ? 'Batch' : 'Group') + ' "' + confirmDelete.name + '" deleted successfully', 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete', 'error');
    }
    setConfirmDelete(null);
  };

  return {
    batches,
    groups,
    loading,
    activeTab, setActiveTab,
    batchModalOpen, setBatchModalOpen,
    editingBatch,
    batchForm,
    groupModalOpen, setGroupModalOpen,
    groupForm, setGroupForm,
    confirmDelete, setConfirmDelete,
    loadData,
    openCreateBatch,
    openEditBatch,
    handleBatchFormChange,
    handleSaveBatch,
    handleDeleteBatch,
    openCreateGroup,
    handleSaveGroup,
    handleDeleteGroup,
    handleConfirmDelete,
  };
};
