export interface IBanner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  priority: number;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBannerForm {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  priority: number;
  isActive: boolean;
  startsAt: string;
  expiresAt: string;
}

export interface IBannersState {
  banners: IBanner[];
  loading: boolean;
  error: string | null;
}
