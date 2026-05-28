import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchUserDetails, updateUserStatus, clearUserDetail } from '../store/users.slice';
import { useToast } from '../../../utils/ToastContext';
import { selectUserDetails } from '../store/users.selectors';

export const useUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAdminDispatch();
  const user = useAdminSelector(selectUserDetails);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchUserDetails(id)).finally(() => setLoading(false));
    }
    return () => { dispatch(clearUserDetail()); };
  }, [dispatch, id]);

  const handleStatusToggle = useCallback(async () => {
    if (!user) return;
    const newStatus = user.status === 'active' ? 'inactive' : user.status === 'inactive' ? 'disabled' : 'active';
    try {
      await dispatch(updateUserStatus({ id: user.id, status: newStatus })).unwrap();
      showToast(`User status changed to "${newStatus}"`, 'success');
      dispatch(fetchUserDetails(user.id));
    } catch (e: any) {
      showToast(typeof e === 'string' ? e : e?.message || 'Failed to update user status', 'error');
    }
  }, [user, dispatch, showToast]);

  return { user, loading, handleStatusToggle, navigate };
};
