import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchMaterialPurchases, selectMaterialPurchases, selectMaterialPurchasesTotal, selectMaterialPurchasesLoading } from '../store';

export const useMaterialPurchases = () => {
  const dispatch = useAdminDispatch();
  const purchases = useAdminSelector(selectMaterialPurchases);
  const total = useAdminSelector(selectMaterialPurchasesTotal);
  const loading = useAdminSelector(selectMaterialPurchasesLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchMaterialPurchases());
  }, [dispatch]);

  const filtered = purchases.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.userId?.name?.toLowerCase().includes(q) || p.userId?.email?.toLowerCase().includes(q) || p.materialId?.title?.toLowerCase().includes(q);
  });

  return { purchases, total, loading, search, setSearch, filtered };
};
