import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchUsers, deleteUser, updateUserStatus, createUser } from '../store/users.slice';
import { selectAdminUsers, selectAdminUsersLoading, selectUsersPagination } from '../store/users.selectors';
import type { IUser } from '../../../types';
import { useToast } from '../../../utils/ToastContext';

export const useUsers = () => {
  const dispatch = useAdminDispatch();
  const users = useAdminSelector(selectAdminUsers);
  const loading = useAdminSelector(selectAdminUsersLoading);
  const { totalPages, currentPage, totalUsers } = useAdminSelector(selectUsersPagination);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const { showToast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const [statusModalUser, setStatusModalUser] = useState<IUser | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateUser = async () => {
    setCreateError(null);
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) {
      setCreateError('Name, email, and password are required');
      return;
    }
    const res = await dispatch(createUser(createForm));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('User created successfully', 'success');
      setCreateModalOpen(false);
      setCreateForm({ name: '', email: '', password: '', phone: '', role: 'user' });
    } else {
      setCreateError(res.payload as string);
    }
  };

  const loadUsers = useCallback(() => {
    dispatch(fetchUsers({ search, status: statusFilter, role: roleFilter, page, limit: 10 }));
  }, [dispatch, search, statusFilter, roleFilter, page]);

  useEffect(() => { loadUsers(); }, [loadUsers]);
  useEffect(() => { setPage(1); }, [search, statusFilter, roleFilter]);

  const handleDelete = (id: string, name: string) => {
    setConfirmDelete({ id, name });
  };

  const handleConfirmDelete = () => {
    if (!confirmDelete) return;
    dispatch(deleteUser(confirmDelete.id));
    showToast(`User "${confirmDelete.name}" deleted successfully`, 'success');
    setConfirmDelete(null);
  };

  const handleSaveStatus = (id: string, status: string) => {
    dispatch(updateUserStatus({ id, status }));
    showToast(`User status changed to "${status}"`, 'success');
  };

  return {
    users,
    loading,
    totalPages, currentPage, totalUsers,
    search, setSearch,
    statusFilter, setStatusFilter,
    roleFilter, setRoleFilter,
    page, setPage,
    confirmDelete, setConfirmDelete,
    statusModalUser, setStatusModalUser,
    createModalOpen, setCreateModalOpen,
    createForm, setCreateForm,
    createError,
    handleCreateUser,
    loadUsers,
    handleDelete,
    handleConfirmDelete,
    handleSaveStatus,
  };
};
