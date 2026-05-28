import React from 'react';
import { Button, Input, Select, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useAccessRules } from '../hooks/useAccessRules';
import AccessRuleRow from '../components/AccessRuleRow';
import AccessRuleFormModal from '../components/AccessRuleFormModal';
import { roleOptions, entityOptions } from '../constants';

const AdminAccessRulesPage: React.FC = () => {
  const { items, loading, search, setSearch, filterRole, setFilterRole, filterType, setFilterType, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = useAccessRules();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Content Access Rules" subtitle="Control access to exams, tests, and materials per user role" actions={<div className="flex gap-3"><DeleteAllButton resource="access-rules" displayName="Access Rules" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Rule</Button></div>} />
      <div className="admin-toolbar flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID..." className="pl-10" />
        </div>
        <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} options={[{ value: '', label: 'All Roles' }, ...roleOptions]} className="w-40" />
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} options={[{ value: '', label: 'All Types' }, ...entityOptions]} className="w-40" />
      </div>
      <div className="grid gap-4">
        {filtered.map((rule: any) => (
          <AccessRuleRow key={rule._id} rule={rule} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />
        ))}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No access rules found</p>}
      </div>
      <AccessRuleFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Rule?" message="This will permanently delete this access rule." />
    </div>
  );
};
export default AdminAccessRulesPage;
