import React from 'react';
import { Badge } from '@shared/components';
import { Tag, Percent, DollarSign, Calendar, Edit, Trash2 } from '@shared/icons';
import { formatDate } from '../utils';
import type { ICoupon } from '../../../types';

interface CouponRowProps {
  coupon: ICoupon;
  onEdit: (coupon: ICoupon) => void;
  onDelete: (coupon: ICoupon) => void;
}

const CouponRow: React.FC<CouponRowProps> = ({ coupon, onEdit, onDelete }) => {
  const isExpired = new Date(coupon.expiresAt) < new Date();
  const statusText = coupon.isActive && !isExpired ? 'active' : 'inactive';
  const statusVariant = coupon.isActive && !isExpired ? 'success' : 'danger';

  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group">
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-tb-blue-light rounded-lg flex items-center justify-center">
            <Tag className="w-4 h-4 text-tb-blue" />
          </div>
          <span className="font-mono text-sm font-semibold text-tb-navy dark:text-white">{coupon.code}</span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-tb-navy dark:text-white">
            {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
          </span>
          {coupon.discountType === 'percentage' ? (
            <Percent className="w-3.5 h-3.5 text-tb-gray-400" />
          ) : (
            <DollarSign className="w-3.5 h-3.5 text-tb-gray-400" />
          )}
        </div>
      </td>
      <td className="py-3.5 px-4 text-right">
        <span className="text-tb-gray-700 font-medium">${coupon.minAmount.toLocaleString()}</span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-tb-gray-50 dark:bg-gray-700/50 rounded-lg text-xs font-medium text-tb-gray-600 dark:text-gray-300">
          <span className="font-semibold text-tb-navy dark:text-white">{coupon.usedCount}</span>
          <span className="text-tb-gray-400">/</span>
          <span>{coupon.usageLimit}</span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-1.5 text-xs text-tb-gray-500 dark:text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(coupon.startsAt)}</span>
          <span className="text-tb-gray-300">→</span>
          <span>{formatDate(coupon.expiresAt)}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-center">
        <Badge variant={statusVariant}>{statusText}</Badge>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(coupon)}
            className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(coupon)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-tb-red transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponRow;
