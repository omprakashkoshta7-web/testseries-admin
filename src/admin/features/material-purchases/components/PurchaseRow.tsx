import React from 'react';
import { Users, DollarSign } from '@shared/icons';

interface PurchaseRowProps {
  purchase: {
    _id: string;
    userId?: { name?: string; email?: string };
    materialId?: { title?: string };
    amount?: number;
    purchasedAt: string;
  };
}

const PurchaseRow: React.FC<PurchaseRowProps> = ({ purchase: p }) => (
  <tr key={p._id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-tb-gray-400" />
        <span className="font-medium text-tb-navy dark:text-white">{p.userId?.name || '—'}</span>
      </div>
    </td>
    <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{p.userId?.email || '—'}</td>
    <td className="px-4 py-3 font-medium text-tb-navy dark:text-white">{p.materialId?.title || '—'}</td>
    <td className="px-4 py-3">
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
        <DollarSign className="w-3 h-3" />{p.amount || 0}
      </span>
    </td>
    <td className="px-4 py-3 text-right text-tb-gray-500 dark:text-gray-400 whitespace-nowrap">
      {new Date(p.purchasedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
    </td>
  </tr>
);

export default PurchaseRow;
