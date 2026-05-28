import React from 'react';
import { Button, Input, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { usePlans } from '../hooks/usePlans';
import PlanRow from '../components/PlanRow';
import PlanFormModal from '../components/PlanFormModal';

const AdminPlansPage: React.FC = () => {
  const { items, loading, search, setSearch, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = usePlans();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Subscription Plans" subtitle="Manage pricing plans" actions={<div className="flex gap-3"><DeleteAllButton resource="plans" displayName="Plans" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Plan</Button></div>} />
      <div className="admin-toolbar">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search plans..." className="pl-10" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((plan: any) => (
          <PlanRow key={plan._id} plan={plan} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />
        ))}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8 md:col-span-2 xl:col-span-3">No plans found</p>}
      </div>
      <PlanFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Plan?" message="This will permanently delete this plan." />
    </div>
  );
};
export default AdminPlansPage;
