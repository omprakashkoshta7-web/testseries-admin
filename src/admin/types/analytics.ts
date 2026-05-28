export interface IAnalyticsData {
  totalUsers: number;
  totalTests: number;
  totalRevenue: number;
  activeUsers: number;
  userGrowth: IUserGrowthData[];
  revenueData: IRevenueData[];
  testsTaken: number[];
  topExams: ITopExam[];
  averageScore: number;
  completionRate: number;
  period: '7d' | '30d' | '90d' | '1y';
}

export interface IRevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
  oneTime: number;
}

export interface IUserGrowthData {
  date: string;
  newUsers: number;
  totalUsers: number;
  activeUsers: number;
}

export interface ITopExam {
  name: string;
  attempts: number;
  avgScore: number;
  color: string;
}
