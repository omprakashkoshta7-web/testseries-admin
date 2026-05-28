export interface IResult {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  testId: string;
  testTitle: string;
  score: number;
  totalMarks: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  timeTaken: number;
  rank: number;
  completedAt: string;
}

export interface IResultsState {
  results: IResult[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
  loading: boolean;
  error: string | null;
}

export interface IRevenueReport {
  _id: string;
  revenue: number;
  count: number;
  refunds: number;
}

export interface IAttemptReport {
  _id: string;
  count: number;
  avgScore: number;
}

export interface IReportsState {
  revenueReport: IRevenueReport[];
  attemptReport: IAttemptReport[];
  period: string;
  loading: boolean;
  error: string | null;
}
