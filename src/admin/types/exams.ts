export interface IAdminExam {
  _id: string;
  name: string;
  slug: string;
  categoryId: { _id: string; name: string; slug: string } | string;
  description: string;
  icon: string;
  color: string;
  totalTests: number;
  totalSubjects: number;
  sectionId?: string | null;
  group?: 'national' | 'state' | '';
  subCategories?: string[];
  successStats: { label: string; value: string }[];
  bannerUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminExamForm {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  icon: string;
  color: string;
  bannerUrl?: string;
  isActive: boolean;
  order: number;
  sectionId: string;
  group: 'national' | 'state' | '';
  subCategories: string[];
}

export interface IAdminExamsState {
  items: IAdminExam[];
  loading: boolean;
  error: string | null;
}
