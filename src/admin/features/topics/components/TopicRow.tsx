import React from 'react';
import { Button } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { ITopic } from '../../../types';

interface Props {
  topic: ITopic;
  subjectName?: string;
  onEdit: (topic: ITopic) => void;
  onDelete: (id: string) => void;
}

const TopicRow: React.FC<Props> = ({ topic, subjectName, onEdit, onDelete }) => {
  const subName = subjectName || (typeof topic.subjectId === 'object' ? topic.subjectId?.name : 'N/A');
  return (
    <div className="admin-list-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{topic.name[0]}</span>
        </div>
        <div>
          <h3 className="text-tb-navy dark:text-white font-semibold">{topic.name}</h3>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">{subName} &middot; /{topic.slug} &middot; Order: {topic.order} &middot; {topic.isActive ? 'Active' : 'Inactive'}</p>
          {topic.description && <p className="text-xs text-tb-gray-400 mt-0.5">{topic.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => onEdit(topic)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" className="text-tb-red" onClick={() => onDelete(topic._id)}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default TopicRow;
