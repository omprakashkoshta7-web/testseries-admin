export interface IHomeContent {
  _id: string;
  key: string;
  value: string;
  type: 'text' | 'rich-text' | 'image' | 'json';
  section: string;
  label: string;
  order: number;
  isActive: boolean;
  updatedBy?: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface IHomeContentForm {
  key: string;
  value: string;
  type: 'text' | 'rich-text' | 'image' | 'json';
  section: string;
  label: string;
  order: number;
  isActive: boolean;
}

export interface IHomeContentState {
  items: IHomeContent[];
  loading: boolean;
  error: string | null;
}
