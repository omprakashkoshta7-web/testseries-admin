import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAccessRules, createAccessRule, updateAccessRule, deleteAccessRule } from '../store/accessRules.slice';
import type { IAccessRule } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';

export const useAccessRules = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.accessRules);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterType, setFilterType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IAccessRule | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchAccessRules(undefined)); }, [dispatch]);

  const filtered = items.filter((r: IAccessRule) => {
    if (search && !r._id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterRole && r.role !== filterRole) return false;
    if (filterType && r.entityType !== filterType) return false;
    return true;
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (rule: IAccessRule) => {
    setEditing(rule); setForm({ role: rule.role, entityType: rule.entityType, entityId: rule.entityId, maxTests: rule.maxTests, isLocked: rule.isLocked, startDate: rule.startDate ? rule.startDate.split('T')[0] : '', endDate: rule.endDate ? rule.endDate.split('T')[0] : '' }); setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form, startDate: form.startDate || undefined, endDate: form.endDate || undefined };
    const res = editing ? await dispatch(updateAccessRule({ id: editing._id, form: payload })) : await dispatch(createAccessRule(payload));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Rule updated' : 'Rule created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteAccessRule(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Rule deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, search, setSearch, filterRole, setFilterRole, filterType, setFilterType, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
