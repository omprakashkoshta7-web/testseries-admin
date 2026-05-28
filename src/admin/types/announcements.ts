export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  targetAudience: 'all' | 'batch' | 'individual';
  targetIds: string[];
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  pinned: boolean;
  createdBy?: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface IAnnouncementForm {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  targetAudience: 'all' | 'batch' | 'individual';
  targetIds: string[];
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  pinned: boolean;
}

export interface IAnnouncementsState {
  announcements: IAnnouncement[];
  loading: boolean;
  error: string | null;
}
