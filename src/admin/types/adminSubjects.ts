export interface IAdminSubject {
  _id: string;
  name: string;
  icon: string;
  color: string;
  categoryId?: { _id: string; name: string } | string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface IAdminSubjectForm {
  name: string;
  icon: string;
  color: string;
  categoryId?: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface IAdminSubjectsState {
  items: IAdminSubject[];
  loading: boolean;
  error: string | null;
}
