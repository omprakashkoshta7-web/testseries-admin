import React from 'react';
import { Button, Input, Loader } from '@shared/components';
import { Plus, Search, Home, Eye } from '@shared/icons';
import { useHomeContents, useHomeContentFilters } from '../hooks';
import type { IHomeContent, IHomeContentForm } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { HomeContentSection, HomeContentEmptyState, HomeContentFormModal } from '../components';

const AdminHomePage: React.FC = () => {
  const {
    items, loading, search, setSearch, modalOpen, setModalOpen,
    editingItem, form, setForm, confirmDelete, setConfirmDelete,
    openCreateModal, openEditModal, handleSave, handleConfirmDelete,
  } = useHomeContents();

  const { filtered, grouped, sortedSections } = useHomeContentFilters(items, search);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Home Content Management" subtitle={`${items.length} total content items`} actions={<div className="flex gap-3"><DeleteAllButton resource="home-content" displayName="Home Content" /><Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Content</Button></div>} />
      <div className="admin-card-solid p-4">
        <Input placeholder="Search by key, label, or section..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filtered.length === 0 ? (
        <HomeContentEmptyState search={search} onCreateClick={openCreateModal} />
      ) : (
        <div className="space-y-6">
          {sortedSections.map((section) => (
            <HomeContentSection key={section} section={section} items={grouped[section]} onEdit={openEditModal} onDelete={(item) => setConfirmDelete({ id: item._id, label: item.label })} />
          ))}
        </div>
      )}
      <HomeContentFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingItem={editingItem} form={form} onFormChange={setForm} onSave={handleSave} />
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Content" message={`Are you sure you want to delete "${confirmDelete?.label}"?`} confirmLabel="Delete" variant="danger" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminHomePage;
