import React from 'react';
import { Button, Loader } from '@shared/components';
import { HelpCircle, Plus } from '@shared/icons';
import type { IQuestion, IAdminSubject } from '../../../types';
import QuestionRow from './QuestionRow';
import Pagination from './Pagination';

interface QuestionsTableProps {
  questions: IQuestion[];
  loading: boolean;
  subjects: IAdminSubject[];
  totalPages: number;
  currentPage: number;
  onEdit: (q: IQuestion) => void;
  onDelete: (id: string, text: string) => void;
  onPageChange: (page: number) => void;
  onCreateClick: () => void;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ questions, loading, subjects, totalPages, currentPage, onEdit, onDelete, onPageChange, onCreateClick }) => {
  if (loading) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  if (questions.length === 0) {
    return (
      <div className="admin-card-solid">
        <div className="flex flex-col items-center justify-center py-16">
          <HelpCircle className="w-12 h-12 text-tb-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No questions found</h3>
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first question to get started</p>
          <Button onClick={onCreateClick}><Plus className="w-4 h-4" />Create Question</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-card-solid overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-tb-gray-50 dark:bg-gray-800/50 border-b border-tb-gray-200/60 dark:border-gray-700/50">
                <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Question</th>
                <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Subject</th>
                <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Difficulty</th>
                <th className="text-left text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-center text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Marks</th>
                <th className="text-center text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tb-gray-100 dark:divide-gray-700/30">
              {questions.map((q: IQuestion) => (
                <QuestionRow key={q._id} question={q} subjects={subjects} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
    </>
  );
};

export default QuestionsTable;
