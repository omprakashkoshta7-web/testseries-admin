import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchEnrollments, selectEnrollments, selectEnrollmentsTotal, selectEnrollmentsLoading } from '../store';

export const useEnrollments = () => {
  const dispatch = useAdminDispatch();
  const enrollments = useAdminSelector(selectEnrollments);
  const total = useAdminSelector(selectEnrollmentsTotal);
  const loading = useAdminSelector(selectEnrollmentsLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const filtered = enrollments.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.userId?.name?.toLowerCase().includes(q) || e.userId?.email?.toLowerCase().includes(q) || e.testId?.name?.toLowerCase().includes(q);
  });

  return { enrollments, total, loading, search, setSearch, filtered };
};
