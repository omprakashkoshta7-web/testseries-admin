import React from 'react';
import { Button, Input, Select, Modal, Loader, Badge } from '@shared/components';
import { Plus, CheckCircle, XCircle } from '@shared/icons';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { ReviewRow, ReviewFilters } from '../components';
import { useReviews } from '../hooks';
import { statusColors, entityTypeOptions } from '../constants';

const AdminReviewsPage: React.FC = () => {
  const {
    filtered,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    modalOpen,
    setModalOpen,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    viewing,
    setViewing,
    openCreate,
    handleSave,
    handleApproval,
    handleDelete,
  } = useReviews();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review & Approval"
        subtitle="Draft to Review to Approve/Reject workflow"
        actions={<div className="flex gap-3"><DeleteAllButton resource="reviews" displayName="Reviews" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> New Review</Button></div>}
      />

      <ReviewFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      <div className="grid gap-4">
        {filtered.map((review: any) => (
          <ReviewRow
            key={review._id}
            review={review}
            onApprove={(id) => handleApproval(id, 'approved')}
            onReject={(id) => handleApproval(id, 'rejected')}
            onView={setViewing}
            onDelete={setConfirmDelete}
          />
        ))}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No reviews found</p>}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Review">
        <div className="space-y-4 p-4">
          <Select label="Entity Type" value={form.entityType} onChange={(e) => setForm({ ...form, entityType: e.target.value })} options={entityTypeOptions} />
          <Input label="Entity ID" value={form.entityId} onChange={(e) => setForm({ ...form, entityId: e.target.value })} placeholder="MongoDB ObjectId" />
          <Select label="Initial Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={[{ value: 'draft', label: 'Draft' }, { value: 'review', label: 'In Review' }]} />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-tb-gray-600 dark:text-gray-300">Comments</label>
            <textarea value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} className="bg-white dark:bg-gray-800 border border-tb-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm text-tb-navy dark:text-white h-20 focus:outline-none focus:ring-2 focus:ring-tb-blue" />
          </div>
          <Button onClick={handleSave} className="w-full mt-2">Submit for Review</Button>
        </div>
      </Modal>

      <Modal isOpen={!!viewing} onClose={() => setViewing(null)} title="Review Details">
        {viewing && (
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-tb-gray-500 dark:text-gray-400">Type:</span> <span className="text-tb-navy dark:text-white capitalize">{viewing.entityType}</span></div>
              <div><span className="text-tb-gray-500 dark:text-gray-400">Status:</span> <Badge className={statusColors[viewing.status]}>{viewing.status}</Badge></div>
              <div className="col-span-2"><span className="text-tb-gray-500 dark:text-gray-400">Entity ID:</span> <span className="text-tb-navy dark:text-white text-xs">{viewing.entityId}</span></div>
              <div className="col-span-2"><span className="text-tb-gray-500 dark:text-gray-400">Reviewer:</span> <span className="text-tb-navy dark:text-white">{viewing.reviewerId?.name || 'N/A'}</span></div>
              {viewing.comments && <div className="col-span-2"><span className="text-tb-gray-500 dark:text-gray-400">Comments:</span> <p className="text-tb-navy dark:text-white text-sm mt-1">{viewing.comments}</p></div>}
              <div className="col-span-2"><span className="text-tb-gray-500 dark:text-gray-400">Created:</span> <span className="text-tb-navy dark:text-white">{new Date(viewing.createdAt).toLocaleString()}</span></div>
            </div>
            {viewing.status === 'draft' && (
              <div className="flex gap-2">
                <Button onClick={() => { handleApproval(viewing._id, 'approved'); setViewing(null); }} className="flex-1"><CheckCircle className="w-4 h-4" /> Approve</Button>
                <Button onClick={() => { handleApproval(viewing._id, 'rejected'); setViewing(null); }} variant="secondary" className="flex-1"><XCircle className="w-4 h-4" /> Reject</Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete Review?"
        message="This will permanently delete this review entry."
      />
    </div>
  );
};

export default AdminReviewsPage;
