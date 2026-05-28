import React from 'react';
import { BookOpen, Clock } from '@shared/icons';
import type { IResult } from '../../../types';
import { useResultRow } from './useResultsTable';

interface ResultsTableRowProps {
  result: IResult;
}

export const ResultsTableRow: React.FC<ResultsTableRowProps> = ({ result }) => {
  const { userInitial, accuracyClass, formattedTime, formattedDate } = useResultRow(result);

  return (
    <tr className="hover:bg-tb-blue-light/20 transition-colors">
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-tb-blue to-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0">
            {userInitial}
          </div>
          <div>
            <p className="font-semibold text-tb-navy dark:text-white">{result.userName}</p>
            <p className="text-xs text-tb-gray-500 dark:text-gray-400">{result.userEmail}</p>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-1.5 text-tb-gray-600 dark:text-gray-300">
          <BookOpen className="w-3.5 h-3.5 text-tb-gray-400" />
          <span>{result.testTitle}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-center">
        <span className="font-semibold text-tb-navy dark:text-white">{result.score}</span>
        <span className="text-tb-gray-400"> / {result.totalMarks}</span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${accuracyClass}`}>
          {result.accuracy}%
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1 text-tb-gray-600 dark:text-gray-300">
          <Clock className="w-3.5 h-3.5 text-tb-gray-400" />
          <span>{formattedTime}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-right text-tb-gray-500 dark:text-gray-400 text-xs">
        {formattedDate}
      </td>
    </tr>
  );
};

export default ResultsTableRow;
