export interface IQuestion {
  _id: string;
  testId?: string;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string | string[];
  explanation?: string;
  type: 'mcq' | 'single' | 'multiple' | 'subjective' | 'descriptive';
  category: string;
  subject: string;
  topic?: string;
  section?: string;
  sectionName?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  negativeMarks: number;
  image?: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf' | '';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionsState {
  questions: IQuestion[];
  totalPages: number;
  currentPage: number;
  totalQuestions: number;
  loading: boolean;
  error: string | null;
}

export interface IQuestionFilter {
  search?: string;
  category?: string;
  subject?: string;
  topic?: string;
  type?: string;
  testId?: string;
  page?: number;
  limit?: number;
}
