import adminApiClient from '../../../utils/apiClient';
import type { ICoupon, ICouponForm } from '../../../types';

export const fetchCoupons = async (): Promise<ICoupon[]> => {
  const response = await adminApiClient.get('/coupons');
  return response.data.data.coupons;
};

export const createCoupon = async (data: ICouponForm): Promise<ICoupon> => {
  const response = await adminApiClient.post('/coupons', data);
  return response.data.data;
};

export const updateCoupon = async (id: string, data: Partial<ICouponForm>): Promise<ICoupon> => {
  const response = await adminApiClient.patch(`/coupons/${id}`, data);
  return response.data.data;
};

export const deleteCoupon = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/coupons/${id}`);
  return id;
};
