import React from 'react';
import { Modal, Input, Select, Textarea, Button } from '@shared/components';
import { discountTypeOptions } from '../constants';
import type { ICoupon, ICouponForm } from '../../../types';

interface CouponFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCoupon: ICoupon | null;
  form: ICouponForm;
  onChange: <K extends keyof ICouponForm>(field: K, value: ICouponForm[K]) => void;
  onSubmit: () => void;
}

const CouponFormModal: React.FC<CouponFormModalProps> = ({
  isOpen,
  onClose,
  editingCoupon,
  form,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editingCoupon ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          label="Coupon Code"
          value={form.code}
          onChange={(e) => onChange('code', e.target.value)}
          required
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => onChange('description', e.target.value)}
          fullWidth
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Discount Type"
            options={discountTypeOptions}
            value={form.discountType}
            onChange={(e) => onChange('discountType', e.target.value as 'percentage' | 'fixed')}
          />
          <Input
            label={form.discountType === 'percentage' ? 'Discount (%)' : 'Discount ($)'}
            type="number"
            value={form.discountValue || ''}
            onChange={(e) => onChange('discountValue', Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Amount ($)"
            type="number"
            value={form.minAmount || ''}
            onChange={(e) => onChange('minAmount', Number(e.target.value))}
          />
          <Input
            label="Max Discount ($)"
            type="number"
            value={form.maxDiscount || ''}
            onChange={(e) => onChange('maxDiscount', Number(e.target.value))}
          />
        </div>
        <Input
          label="Usage Limit"
          type="number"
          value={form.usageLimit || ''}
          onChange={(e) => onChange('usageLimit', Number(e.target.value))}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Starts At"
            type="date"
            value={form.startsAt ? form.startsAt.slice(0, 10) : ''}
            onChange={(e) => onChange('startsAt', e.target.value)}
          />
          <Input
            label="Expires At"
            type="date"
            value={form.expiresAt ? form.expiresAt.slice(0, 10) : ''}
            onChange={(e) => onChange('expiresAt', e.target.value)}
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => onChange('isActive', e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-secondary-700">Active</span>
        </label>
      </div>
    </Modal>
  );
};

export default CouponFormModal;
