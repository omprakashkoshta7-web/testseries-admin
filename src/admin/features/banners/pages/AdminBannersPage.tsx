import React, { useEffect, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchBanners, deleteBanner } from '../store/banners.slice';
import { useAdminBannersState, useBannerForm, useBannerFilters } from '../hooks';
import { Button, Input, Select, Loader } from '@shared/components';
import { Image, Plus, Search } from '@shared/icons';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import type { IBanner } from '../../../types';
import PageHeader from '../../../components/PageHeader';
import { positionFilterOptions } from '../constants';
import { BannerRow, BannerFormModal } from '../components';

const AdminBannersPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { banners, loading } = useAdminBannersState();
  const { showToast } = useToast();

  const {
    modalOpen, setModalOpen,
    editingBanner,
    form, setForm,
    openCreateModal,
    openEditModal,
    handleSave,
  } = useBannerForm();

  const { search, setSearch, positionFilter, setPositionFilter, filteredBanners } = useBannerFilters(banners);

  const [confirmDelete, setConfirmDelete] = React.useState<{ id: string; title: string } | null>(null);

  const loadBanners = useCallback(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => { loadBanners(); }, [loadBanners]);

  const handleDelete = (banner: IBanner) => {
    setConfirmDelete({ id: banner._id, title: banner.title });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteBanner(confirmDelete.id)).unwrap();
      showToast('Banner deleted successfully', 'success');
    } catch {
      showToast('Failed to delete banner', 'error');
    }
    setConfirmDelete(null);
  };



  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Banners" subtitle={`${banners.length} total banners`} actions={<div className="flex gap-3"><DeleteAllButton resource="banners" displayName="Banners" /><Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Banner</Button></div>} />

      <div className="admin-card-solid p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search banners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-3">
            <div className="w-full sm:w-44">
              <Select options={positionFilterOptions} value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filteredBanners.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Image className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No banners found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">{search ? 'No banners match your search' : 'Create your first banner to get started'}</p>
            {!search && <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Banner</Button>}
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Subtitle</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50">
                {filteredBanners.map((banner: IBanner) => (
                  <BannerRow key={banner._id} banner={banner} onEdit={openEditModal} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <BannerFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        form={form}
        onChange={setForm}
        onSubmit={handleSave}
        editingBanner={editingBanner}
      />
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Delete Banner"
        message={`Are you sure you want to delete the banner "${confirmDelete?.title}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
};

export default AdminBannersPage;
