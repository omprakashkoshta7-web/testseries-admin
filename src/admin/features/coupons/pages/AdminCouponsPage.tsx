import React from 'react';
import { useCoupons } from '../hooks';
import type { ICoupon } from '../../../types';
import { Button, Input, Loader } from '@shared/components';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { Tag, Plus, Clock, Check, Search } from '@shared/icons';
import CouponRow from '../components/CouponRow';
import CouponFormModal from '../components/CouponFormModal';

const AdminCouponsPage: React.FC = () => {
  const {
    coupons,
    loading,
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    editingCoupon,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
    handleFormChange,
    handleConfirmDelete,
  } = useCoupons();

  const activeCount = coupons.filter((c) => c.isActive).length;
  const expiredCount = coupons.filter((c) => !c.isActive || new Date(c.expiresAt) < new Date()).length;

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    { label: 'Total Coupons', value: coupons.length, icon: Tag, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Active Coupons', value: activeCount, icon: Check, gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Expired Coupons', value: expiredCount, icon: Clock, gradient: 'from-red-500 to-rose-600', bg: 'bg-red-50', textColor: 'text-red-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Coupons"
        subtitle={`${coupons.length} total coupons`}
        actions={
          <div className="flex gap-3">
            <DeleteAllButton resource="coupons" displayName="Coupons" />
            <Button onClick={openCreateModal}>
              <Plus className="w-4 h-4" />
              Create Coupon
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="group bg-white dark:bg-gray-800 rounded-xl shadow-tb hover:shadow-tb-lg transition-all duration-300 p-5 border border-tb-gray-100/60 dark:border-gray-700/60 hover:-translate-y-0.5">
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${card.textColor}`} />
              </div>
              <p className="text-xl font-bold text-tb-navy dark:text-white mt-3">{card.value}</p>
              <p className="text-sm text-tb-gray-500 dark:text-gray-400">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="admin-card-solid p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by code or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filteredCoupons.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Tag className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No coupons found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">{search ? 'No coupons match your search' : 'Create your first coupon to get started'}</p>
            {!search && <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Coupon</Button>}
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80 dark:bg-gray-800/50">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Discount</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Min Amount</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Valid Period</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50 dark:divide-gray-700/30">
                {filteredCoupons.map((coupon: ICoupon) => (
                  <CouponRow
                    key={coupon._id}
                    coupon={coupon}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CouponFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingCoupon={editingCoupon}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleSave}
      />
      <ConfirmModal
        isOpen={confirmDelete !== null}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Coupon"
        message={`Are you sure you want to delete "${confirmDelete?.name}"?`}
      />
    </div>
  );
};

export default AdminCouponsPage;
