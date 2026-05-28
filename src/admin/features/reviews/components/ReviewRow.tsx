import React from 'react';
import { Button, Badge } from '@shared/components';
import { Edit, CheckCircle, XCircle, Trash2, Eye } from '@shared/icons';
import { statusColors } from '../constants';
import type { IReviewItem } from '../../../types';

interface Props {
  review: IReviewItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (review: IReviewItem) => void;
  onDelete: (id: string) => void;
}

const ReviewRow: React.FC<Props> = ({ review, onApprove, onReject, onView, onDelete }) => {
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Eye className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-tb-navy dark:text-white font-semibold capitalize">{review.entityType}</h3>
            <Badge className={statusColors[review.status] || ''}>{review.status}</Badge>
          </div>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">
            Entity: {review.entityId.slice(0, 20)}... &middot;{' '}
            {review.reviewerId ? 'By: ' + (review.reviewerId.name || review.reviewerId.email) : 'Unreviewed'}
          </p>
          {review.comments && <p className="text-xs text-tb-gray-400 mt-0.5">{review.comments.slice(0, 100)}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {review.status !== 'approved' && (
          <Button variant="ghost" className="text-tb-green" onClick={() => onApprove(review._id)} title="Approve">
            <CheckCircle className="w-4 h-4" />
          </Button>
        )}
        {review.status !== 'rejected' && (
          <Button variant="ghost" className="text-tb-red" onClick={() => onReject(review._id)} title="Reject">
            <XCircle className="w-4 h-4" />
          </Button>
        )}
        <Button variant="ghost" onClick={() => onView(review)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(review._id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewRow;
