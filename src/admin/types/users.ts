export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'super_admin' | 'editor' | 'support';
  status: 'active' | 'inactive' | 'disabled';
  exams?: string[];
  testsCompleted: number;
  avgScore: number;
  totalPoints: number;
  streak: number;
  createdAt: string;
  lastActive: string;
}

export interface IUsersState {
  users: IUser[];
  userDetail: IUser | null;
  totalPages: number;
  currentPage: number;
  totalUsers: number;
  loading: boolean;
  error: string | null;
}

export interface IUserFilter {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}
