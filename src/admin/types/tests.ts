export interface ITestSection {
  name: string;
  questionCount: number;
  subject?: string;
}

export interface ITest {
  id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  testType: 'subject' | 'chapter' | 'full';
  class: '11' | '12' | 'all';
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  duration: number;
  passingScore: number;
  totalPoints: number;
  status: 'published' | 'draft' | 'archived';
  isPremium: boolean;
  price: number;
  originalPrice: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  attemptedCount: number;
  avgScore: number;
  badge?: { text: string; color: string };
  sections?: ITestSection[];
  scheduledAt: string | null;
  activeFrom: string | null;
  activeUntil: string | null;
}

export interface ITestForm {
  title: string;
  description: string;
  category: string;
  subject: string;
  testType: 'subject' | 'chapter' | 'full';
  class: '11' | '12' | 'all';
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  duration: number;
  passingScore: number;
  totalPoints: number;
  status: 'published' | 'draft';
  isPremium: boolean;
  price: number;
  originalPrice: number;
  badge?: { text: string; color: string };
  sections?: ITestSection[];
  scheduledAt?: string;
  activeFrom?: string;
  activeUntil?: string;
}

export interface ITestsState {
  tests: ITest[];
  testDetail: ITest | null;
  totalPages: number;
  currentPage: number;
  totalTests: number;
  loading: boolean;
  error: string | null;
}

export interface ITestFilter {
  search?: string;
  category?: string;
  testType?: string;
  status?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}
