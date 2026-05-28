import adminApiClient from '../../../utils/apiClient';
import type { IMaterialPurchasesData } from '../../../types';

export const fetchMaterialPurchases = async (page = 1, limit = 50): Promise<IMaterialPurchasesData> => {
  const response = await adminApiClient.get('/material-purchases', { params: { page, limit } });
  return response.data.data;
};
