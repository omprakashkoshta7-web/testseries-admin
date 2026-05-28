import React from 'react';
import { Button } from '@shared/components';
import { Plus } from '@shared/icons';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { UserFilters, UserStatusModal, UsersTable, CreateUserModal } from '../components';
import { useUsers, useUserSummary } from '../hooks';

const AdminUsersPage: React.FC = () => {
  const {
    users, loading, totalPages, currentPage,
    search, setSearch, statusFilter, setStatusFilter, roleFilter, setRoleFilter,
    page, setPage, confirmDelete, setConfirmDelete,
    statusModalUser, setStatusModalUser,
    createModalOpen, setCreateModalOpen,
    createForm, setCreateForm, createError,
    handleCreateUser, handleDelete, handleConfirmDelete, handleSaveStatus,
  } = useUsers();

  const summary = useUserSummary();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Users" subtitle={`${summary.totalUsers} ${summary.totalUsers === 1 ? 'user' : 'users'} registered on the platform`} actions={<div className="flex gap-3"><DeleteAllButton resource="users" displayName="Users" /><Button onClick={() => setCreateModalOpen(true)}><Plus className="w-4 h-4" />Create User</Button></div>} />
      <UserFilters search={search} roleFilter={roleFilter} statusFilter={statusFilter} onSearchChange={setSearch} onRoleFilterChange={setRoleFilter} onStatusFilterChange={setStatusFilter} />
      <UsersTable users={users} loading={loading} totalPages={totalPages} currentPage={currentPage} onPageChange={setPage} onEditStatus={(id) => setStatusModalUser(users.find((u) => u.id === id) || null)} onDelete={handleDelete} />
      <UserStatusModal isOpen={!!statusModalUser} onClose={() => setStatusModalUser(null)} user={statusModalUser} onSave={handleSaveStatus} />
      <CreateUserModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} form={createForm} onFormChange={setCreateForm} error={createError} onSubmit={handleCreateUser} />
      <ConfirmModal isOpen={!!confirmDelete} title="Delete User" message={confirmDelete ? `Are you sure you want to delete user "${confirmDelete.name}"?` : ''} confirmLabel="Delete" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminUsersPage;
