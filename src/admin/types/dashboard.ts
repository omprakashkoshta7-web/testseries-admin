export interface IAdminDashboardStats {
  totalUsers: number;
  totalTests: number;
  totalRevenue: number;
  activeUsers: number;
  attemptsCount: number;
  purchasedUsers: number;
  conversionRate: number;
  pendingReviews: number;
  openTickets: number;
  newUsersToday: number;
  testsTakenToday: number;
  revenueToday: number;
  recentActivity: IRecentActivity[];
  userGrowth: IChartData[];
  revenueChart: IChartData[];
  testsByCategory: IChartData[];
  testCompletionRate: number;
}

export interface IRecentActivity {
  id: string;
  userName: string;
  userAvatar?: string;
  action: string;
  target?: string;
  time: string;
  type: 'user' | 'test' | 'payment' | 'system';
}

export interface IChartData {
  label: string;
  value: number;
  color?: string;
}
