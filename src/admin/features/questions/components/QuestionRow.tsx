import React from 'react';
import { Badge } from '@shared/components';
import { Edit, Trash2 } from '@shared/icons';
import type { IQuestion, IAdminSubject } from '../../../types';

const getDifficultyColor = (d: string) => {
  if (d === 'easy') return 'bg-green-100 text-green-700';
  if (d === 'medium') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const getTypeBadgeVariant = (t: string) => {
  if (t === 'mcq') return 'info';
  if (t === 'single') return 'primary';
  if (t === 'multiple') return 'warning';
  return 'secondary';
};

const truncateText = (text: string, max = 80) => {
  return text?.length > max ? text.slice(0, max) + '...' : text || '';
};

interface QuestionRowProps {
  question: IQuestion;
  subjects: IAdminSubject[];
  onEdit: (q: IQuestion) => void;
  onDelete: (id: string, text: string) => void;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ question, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
      <td className="px-4 py-3">
        <span className="text-sm text-tb-navy dark:text-white font-medium block max-w-xs truncate" title={question.text}>
          {truncateText(question.text)}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-tb-gray-600 dark:text-gray-300">{question.category}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-tb-gray-600 dark:text-gray-300">{question.subject}</span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </td>
      <td className="px-4 py-3">
        <Badge variant={getTypeBadgeVariant(question.type)}>{question.type}</Badge>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-medium text-tb-navy dark:text-white">{question.marks}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <Badge variant={question.isActive ? 'success' : 'danger'}>
          {question.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onEdit(question)}
            className="p-1.5 rounded-lg hover:bg-tb-blue-light text-tb-gray-400 hover:text-tb-blue transition-all"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(question._id, question.text)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-red-600 transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuestionRow;
