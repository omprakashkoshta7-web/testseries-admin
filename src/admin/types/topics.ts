export interface ITopic {
  _id: string;
  name: string;
  slug: string;
  subjectId: { _id: string; name: string } | string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITopicForm {
  name: string;
  slug: string;
  subjectId: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface ITopicsState {
  items: ITopic[];
  loading: boolean;
  error: string | null;
}
