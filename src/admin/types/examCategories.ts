export interface IExamCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IExamCategoryForm {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  order: number;
}

export interface IExamCategoriesState {
  items: IExamCategory[];
  loading: boolean;
  error: string | null;
}
