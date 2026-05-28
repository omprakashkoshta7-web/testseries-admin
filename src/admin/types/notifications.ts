export interface INotification {
  _id: string;
  title: string;
  body: string;
  type: 'test_launch' | 'result' | 'promotional' | 'system' | 'reminder';
  targetAudience: 'all' | 'batch' | 'individual';
  targetIds: string[];
  channels: ('email' | 'sms' | 'push')[];
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  createdBy?: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface INotificationForm {
  title: string;
  body: string;
  type: 'test_launch' | 'result' | 'promotional' | 'system' | 'reminder';
  targetAudience: 'all' | 'batch' | 'individual';
  targetIds: string[];
  channels: ('email' | 'sms' | 'push')[];
  status: 'draft' | 'scheduled' | 'sent';
  scheduledAt?: string;
}

export interface INotificationsState {
  notifications: INotification[];
  totalPages: number;
  currentPage: number;
  totalNotifications: number;
  loading: boolean;
  error: string | null;
}
