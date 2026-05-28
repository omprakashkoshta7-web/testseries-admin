import { useState, useEffect, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchCoupons, createCoupon, updateCoupon, deleteCoupon } from '../store/coupons.slice';
import { selectAdminCoupons, selectAdminCouponsLoading } from '../store/coupons.selectors';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';
import type { ICoupon, ICouponForm } from '../../../types';

export const useCoupons = () => {
  const dispatch = useAdminDispatch();
  const coupons = useAdminSelector(selectAdminCoupons);
  const loading = useAdminSelector(selectAdminCouponsLoading);
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<ICoupon | null>(null);
  const [form, setForm] = useState<ICouponForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const loadCoupons = useCallback(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  useEffect(() => { loadCoupons(); }, [loadCoupons]);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (coupon: ICoupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minAmount: coupon.minAmount,
      maxDiscount: coupon.maxDiscount,
      usageLimit: coupon.usageLimit,
      startsAt: coupon.startsAt,
      expiresAt: coupon.expiresAt,
      isActive: coupon.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCoupon) {
        await dispatch(updateCoupon({ id: editingCoupon._id, data: form })).unwrap();
        showToast('Coupon updated');
      } else {
        await dispatch(createCoupon(form)).unwrap();
        showToast('Coupon created');
      }
      setModalOpen(false);
    } catch (e: any) {
      showToast(e || 'Error', 'error');
    }
  };

  const handleDelete = (coupon: ICoupon) => {
    setConfirmDelete({ id: coupon._id, name: coupon.code });
  };

  const handleFormChange = useCallback(<K extends keyof ICouponForm>(field: K, value: ICouponForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteCoupon(confirmDelete.id)).unwrap();
      showToast('Coupon deleted');
    } catch (e: any) {
      showToast(e || 'Error', 'error');
    }
    setConfirmDelete(null);
  };

  return {
    coupons,
    loading,
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    editingCoupon,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    loadCoupons,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
    handleFormChange,
    handleConfirmDelete,
  };
};
