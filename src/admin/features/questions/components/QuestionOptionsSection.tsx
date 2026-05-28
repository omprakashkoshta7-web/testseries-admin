import React from 'react';
import { Input } from '@shared/components';
import { X } from '@shared/icons';

interface Option {
  label: string;
  text: string;
}

interface QuestionOptionsSectionProps {
  options: Option[];
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onOptionChange: (index: number, text: string) => void;
}

export const QuestionOptionsSection: React.FC<QuestionOptionsSectionProps> = ({
  options, onAddOption, onRemoveOption, onOptionChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Options</label>
    <div className="space-y-2">
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-tb-blue-light text-tb-blue text-xs font-bold flex items-center justify-center flex-shrink-0">
            {opt.label}
          </span>
          <Input value={opt.text} onChange={(e) => onOptionChange(idx, e.target.value)} />
          <button onClick={() => onRemoveOption(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-red-600 transition-all" disabled={options.length <= 1}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
    <button onClick={onAddOption} className="mt-2 text-sm text-tb-blue hover:text-tb-blue-dark font-medium">
      + Add Option
    </button>
  </div>
);

export default QuestionOptionsSection;
