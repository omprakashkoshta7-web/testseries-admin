export const COUPON_TYPES = ['percentage', 'fixed'] as const;
export const COUPON_STATUSES = ['active', 'expired', 'disabled'] as const;

export const discountTypeOptions = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed Amount' },
];

export const emptyForm = {
  code: '',
  description: '',
  discountType: 'percentage' as const,
  discountValue: 0,
  minAmount: 0,
  maxDiscount: 0,
  usageLimit: 0,
  startsAt: '',
  expiresAt: '',
  isActive: true,
};
