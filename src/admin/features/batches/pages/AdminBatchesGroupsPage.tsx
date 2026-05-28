import React from 'react';
import { Button, Modal, Input, Textarea, Loader } from '@shared/components';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import {
  Plus,
  BookOpen,
  Users,
} from '@shared/icons';
import type { IBatch, IGroup } from '../../../types';
import PageHeader from '../../../components/PageHeader';
import { TabNav, BatchCard, GroupCard, BatchFormModal } from '../components';
import { useBatchesGroups } from '../hooks';

const AdminBatchesGroupsPage: React.FC = () => {
  const {
    batches,
    groups,
    loading,
    activeTab, setActiveTab,
    batchModalOpen, setBatchModalOpen,
    editingBatch,
    batchForm,
    groupModalOpen, setGroupModalOpen,
    groupForm, setGroupForm,
    confirmDelete, setConfirmDelete,
    openCreateBatch,
    openEditBatch,
    handleBatchFormChange,
    handleSaveBatch,
    handleDeleteBatch,
    openCreateGroup,
    handleSaveGroup,
    handleDeleteGroup,
    handleConfirmDelete,
  } = useBatchesGroups();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Batches & Groups" subtitle="Manage batches and student groups" actions={<div className="flex gap-3"><DeleteAllButton resource={activeTab === 'batches' ? 'batches' : 'groups'} displayName={activeTab === 'batches' ? 'Batches' : 'Groups'} /><Button onClick={activeTab === 'batches' ? openCreateBatch : openCreateGroup}><Plus className="w-4 h-4" />{activeTab === 'batches' ? 'Create Batch' : 'Create Group'}</Button></div>} />

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : activeTab === 'batches' ? (
        batches.length === 0 ? (
          <div className="admin-card-solid">
            <div className="flex flex-col items-center justify-center py-16">
              <BookOpen className="w-12 h-12 text-tb-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No batches found</h3>
              <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first batch to get started</p>
              <Button onClick={openCreateBatch}><Plus className="w-4 h-4" />Create Batch</Button>
            </div>
          </div>
        ) : (
          <div className="admin-card-solid overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Code</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Subjects</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Start Date</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">End Date</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Students</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b: IBatch) => (
                    <BatchCard key={b.id} batch={b} onEdit={openEditBatch} onDelete={handleDeleteBatch} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        groups.length === 0 ? (
          <div className="admin-card-solid">
            <div className="flex flex-col items-center justify-center py-16">
              <Users className="w-12 h-12 text-tb-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No groups found</h3>
              <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first group to get started</p>
              <Button onClick={openCreateGroup}><Plus className="w-4 h-4" />Create Group</Button>
            </div>
          </div>
        ) : (
          <div className="admin-card-solid overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Description</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Members</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Created At</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g: IGroup) => (
                    <GroupCard key={g.id} group={g} onDelete={handleDeleteGroup} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      <BatchFormModal
        isOpen={batchModalOpen}
        onClose={() => setBatchModalOpen(false)}
        editing={editingBatch !== null}
        values={batchForm}
        onChange={handleBatchFormChange}
        onSubmit={handleSaveBatch}
      />

      {/* Group Modal */}
      <Modal
        isOpen={groupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        title="Create Group"
        size="md"
        footer={
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setGroupModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveGroup}>Create</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Group Name" value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} required />
          <Textarea label="Description" value={groupForm.description} onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })} />
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmDelete !== null}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        title={'Delete ' + (confirmDelete?.type === 'batch' ? 'Batch' : 'Group')}
        message={'Are you sure you want to delete "' + confirmDelete?.name + '"? This action cannot be undone.'}
      />
    </div>
  );
};

export default AdminBatchesGroupsPage;
