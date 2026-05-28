export interface IBatch {
  id: string;
  name: string;
  description: string;
  code: string;
  subjects: string[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  studentCount: number;
  createdAt: string;
}

export interface IBatchForm {
  name: string;
  description: string;
  code: string;
  subjects: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface IGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

export interface IGroupForm {
  name: string;
  description: string;
}

export interface IBatchesGroupsState {
  batches: IBatch[];
  groups: IGroup[];
  loading: boolean;
  error: string | null;
}
