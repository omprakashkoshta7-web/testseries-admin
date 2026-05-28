import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminPlans, createAdminPlan, updateAdminPlan, deleteAdminPlan } from '../store/plans.slice';
import type { IAdminPlan } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyPlanForm } from '../constants';

export const usePlans = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.adminPlans);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IAdminPlan | null>(null);
  const [form, setForm] = useState(emptyPlanForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchAdminPlans()); }, [dispatch]);

  const filtered = items.filter((p: IAdminPlan) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm(emptyPlanForm); setModalOpen(true); };

  const openEdit = (plan: IAdminPlan) => {
    setEditing(plan); setForm({ name: plan.name, slug: plan.slug, durationMonths: plan.durationMonths, price: plan.price, originalPrice: plan.originalPrice, discount: plan.discount, features: plan.features.join('\n'), isPopular: plan.isPopular, isActive: plan.isActive, order: plan.order }); setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form, features: form.features.split('\n').filter(Boolean) };
    const res = editing ? await dispatch(updateAdminPlan({ id: editing._id, form: payload })) : await dispatch(createAdminPlan(payload));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Plan updated' : 'Plan created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteAdminPlan(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Plan deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, search, setSearch, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
