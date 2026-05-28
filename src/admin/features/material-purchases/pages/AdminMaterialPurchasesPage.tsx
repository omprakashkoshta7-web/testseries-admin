import React from 'react';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { Loader, Input } from '@shared/components';
import { Search, ShoppingCart, BookOpen } from '@shared/icons';
import { useMaterialPurchases } from '../hooks/useMaterialPurchases';
import { PurchaseRow, PurchaseFilters } from '../components';

const AdminMaterialPurchasesPage: React.FC = () => {
  const { total, loading, search, setSearch, filtered } = useMaterialPurchases();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Material Purchases" subtitle={`${total} total purchases`} actions={<DeleteAllButton resource="material-purchases" displayName="Material Purchases" />} />
      <PurchaseFilters search={search} onSearchChange={setSearch} />
      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card-solid"><div className="flex flex-col items-center justify-center py-16"><BookOpen className="w-12 h-12 text-tb-gray-300 mb-4" /><h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No purchases found</h3><p className="text-tb-gray-500 dark:text-gray-400 text-sm">No study material purchases yet.</p></div></div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Material</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-right px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Purchased At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-100">
                {filtered.map((p) => (
                  <PurchaseRow key={p._id} purchase={p} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMaterialPurchasesPage;
