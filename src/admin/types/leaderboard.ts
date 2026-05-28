export interface ILeaderboardEntry {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  totalScore: number;
  testsCompleted: number;
  avgScore: number;
  streak?: number;
  lastActive: string;
  rank: number;
}

export interface ILeaderboardData {
  entries: ILeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ILeaderboardState {
  entries: ILeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  timeFilter: 'all' | 'daily' | 'weekly' | 'monthly';
}
