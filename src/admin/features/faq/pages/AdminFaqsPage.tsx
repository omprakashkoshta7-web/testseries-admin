import React from 'react';
import { useFaqs, useFaqFilters } from '../hooks';
import { Button, Loader } from '@shared/components';
import { Plus, HelpCircle } from '@shared/icons';
import PageHeader from '../../../components/PageHeader';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import { FaqRow, FaqFormModal, FaqFilters } from '../components';

const AdminFaqsPage: React.FC = () => {
  const {
    faqs, loading, modalOpen, setModalOpen, editingFaq, form, setForm,
    confirmDelete, setConfirmDelete, openCreateModal, openEditModal,
    handleSave, handleDelete, handleConfirmDelete,
  } = useFaqs();

  const { search, setSearch, categoryFilter, setCategoryFilter, filteredFaqs } = useFaqFilters(faqs);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="FAQs" subtitle={`${faqs.length} total FAQs`} actions={<div className="flex gap-3"><DeleteAllButton resource="faqs" displayName="FAQs" /><Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create FAQ</Button></div>} />
      <FaqFilters search={search} onSearchChange={setSearch} categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filteredFaqs.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <HelpCircle className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No FAQs found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">{search ? 'No FAQs match your search' : 'Create your first FAQ to get started'}</p>
            {!search && <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create FAQ</Button>}
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Question</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50">
                {filteredFaqs.map((faq: any) => (
                  <FaqRow key={faq._id} faq={faq} onEdit={openEditModal} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <FaqFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingFaq={editingFaq} form={form} onFormChange={setForm} onSave={handleSave} />
      <ConfirmModal isOpen={!!confirmDelete} title="Delete FAQ" message={`Are you sure you want to delete the FAQ "${confirmDelete?.title}"?`} confirmLabel="Delete" variant="danger" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminFaqsPage;
