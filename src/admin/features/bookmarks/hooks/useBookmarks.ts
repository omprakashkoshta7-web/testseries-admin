import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchBookmarks, selectBookmarksUsers, selectBookmarksTotal, selectBookmarksLoading } from '../store';

export const useBookmarks = () => {
  const dispatch = useAdminDispatch();
  const users = useAdminSelector(selectBookmarksUsers);
  const totalBookmarks = useAdminSelector(selectBookmarksTotal);
  const loading = useAdminSelector(selectBookmarksLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return { users, totalBookmarks, loading, search, setSearch, filtered };
};
