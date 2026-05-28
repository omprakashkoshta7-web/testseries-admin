export interface ICoupon {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  planIds: string[];
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponForm {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount: number;
  maxDiscount: number;
  usageLimit: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface ICouponsState {
  coupons: ICoupon[];
  loading: boolean;
  error: string | null;
}
