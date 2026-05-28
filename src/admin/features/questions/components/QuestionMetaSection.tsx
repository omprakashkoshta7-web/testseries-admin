import React from 'react';
import { Select } from '@shared/components';
import { questionTypeOptions, difficultyOptions } from '../constants';
import type { IQuestion } from '../../../types';

interface QuestionMetaSectionProps {
  type: string;
  difficulty: string;
  onTypeChange: (type: IQuestion['type']) => void;
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const QuestionMetaSection: React.FC<QuestionMetaSectionProps> = ({
  type, difficulty, onTypeChange, onDifficultyChange,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <Select label="Question Type" options={questionTypeOptions} value={type} onChange={(e) => onTypeChange(e.target.value as IQuestion['type'])} />
    <Select label="Difficulty" options={difficultyOptions} value={difficulty} onChange={(e) => onDifficultyChange(e.target.value as 'easy' | 'medium' | 'hard')} />
  </div>
);

export default QuestionMetaSection;
