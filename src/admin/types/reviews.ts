export interface IReviewItem {
  _id: string;
  entityType: string;
  entityId: string;
  status: string;
  reviewerId: { _id: string; name: string; email: string } | null;
  comments: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewForm {
  entityType: string;
  entityId: string;
  status: string;
  comments: string;
}

export interface IReviewsState {
  items: IReviewItem[];
  loading: boolean;
  error: string | null;
}
