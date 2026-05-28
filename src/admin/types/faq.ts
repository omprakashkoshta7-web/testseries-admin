export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IFaqForm {
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export interface IFaqsState {
  faqs: IFaq[];
  loading: boolean;
  error: string | null;
}
