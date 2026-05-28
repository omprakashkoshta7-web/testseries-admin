import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IAdminPlan } from '../../../types';

interface Props {
  plan: IAdminPlan;
  onEdit: (plan: IAdminPlan) => void;
  onDelete: (id: string) => void;
}

const PlanRow: React.FC<Props> = ({ plan, onEdit, onDelete }) => {
  return (
    <div className="admin-list-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold text-lg">{plan.name}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">/{plan.slug} &middot; {plan.durationMonths}mo</p>
        </div>
        {plan.isPopular && <span className="text-xs bg-tb-blue/20 text-tb-blue px-2 py-0.5 rounded-full">Popular</span>}
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-tb-navy dark:text-white">Rs. {plan.price}</span>
        {plan.originalPrice > plan.price && <span className="text-sm text-tb-gray-400 line-through">Rs. {plan.originalPrice}</span>}
        {plan.discount > 0 && <span className="text-xs font-medium text-tb-green">{plan.discount}% off</span>}
      </div>
      <ul className="space-y-1 mb-4">
        {plan.features.slice(0, 4).map((f, i) => <li key={i} className="text-xs text-tb-gray-600 dark:text-gray-300">&bull; {f}</li>)}
        {plan.features.length > 4 && <li className="text-xs text-tb-gray-400">+{plan.features.length - 4} more</li>}
      </ul>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${plan.isActive ? 'text-tb-green' : 'text-tb-red'}`}>{plan.isActive ? 'Active' : 'Inactive'}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(plan)}><Edit className="w-3.5 h-3.5" /></Button>
          <Button variant="ghost" size="sm" className="text-tb-red" onClick={() => onDelete(plan._id)}><Trash2 className="w-3.5 h-3.5" /></Button>
        </div>
      </div>
    </div>
  );
};

export default PlanRow;
