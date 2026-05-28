export interface IAdminPlan {
  _id: string;
  name: string;
  slug: string;
  durationMonths: number;
  price: number;
  originalPrice: number;
  discount: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminPlanForm {
  name: string;
  slug: string;
  durationMonths: number;
  price: number;
  originalPrice: number;
  discount: number;
  features: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

export interface IAdminPlansState {
  items: IAdminPlan[];
  loading: boolean;
  error: string | null;
}
