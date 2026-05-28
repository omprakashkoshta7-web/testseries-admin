export interface IActivityLog {
  _id: string;
  userId: { _id: string; name: string; email: string };
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface IActivityLogsState {
  logs: IActivityLog[];
  totalPages: number;
  currentPage: number;
  totalLogs: number;
  loading: boolean;
  error: string | null;
}
