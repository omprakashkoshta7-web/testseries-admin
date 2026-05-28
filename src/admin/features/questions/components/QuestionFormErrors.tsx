import React from 'react';
import { AlertCircle } from '@shared/icons';

interface QuestionFormErrorsProps {
  errors: string[];
}

export const QuestionFormErrors: React.FC<QuestionFormErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
      {errors.map((err, i) => (
        <p key={i} className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {err}
        </p>
      ))}
    </div>
  );
};

export default QuestionFormErrors;
