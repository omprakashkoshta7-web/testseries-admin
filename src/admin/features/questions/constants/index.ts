export const QUESTION_TYPES = ['mcq', 'multiple', 'true_false', 'descriptive'] as const;
export const QUESTION_DIFFICULTY = ['easy', 'medium', 'hard'] as const;

import type { IQuestion } from '../../../types';

export const typeFilterOptions = [
  { value: '', label: 'All Types' },
  { value: 'mcq', label: 'MCQ' },
  { value: 'single', label: 'Single' },
  { value: 'multiple', label: 'Multiple' },
  { value: 'subjective', label: 'Subjective' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'integer', label: 'Integer' },
];

export const questionTypeOptions = [
  { value: 'mcq', label: 'MCQ' },
  { value: 'single', label: 'Single Correct' },
  { value: 'multiple', label: 'Multiple Correct' },
  { value: 'subjective', label: 'Subjective' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'integer', label: 'Integer' },
];

export const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export interface QuestionForm {
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  type: IQuestion['type'];
  testId: string;
  category: string;
  subject: string;
  topic: string;
  section?: string;
  sectionName?: string;
  difficulty: IQuestion['difficulty'];
  marks: number;
  negativeMarks: number;
  explanation: string;
  isActive: boolean;
}

export const emptyForm: QuestionForm = {
  text: '',
  options: [{ label: 'A', text: '' }],
  correctAnswer: '',
  type: 'mcq',
  testId: '',
  category: '',
  subject: '',
  topic: '',
  section: 'General',
  sectionName: 'General',
  difficulty: 'medium',
  marks: 1,
  negativeMarks: 0,
  explanation: '',
  isActive: true,
};
