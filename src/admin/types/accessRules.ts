export interface IAccessRule {
  _id: string;
  role: string;
  entityType: string;
  entityId: string;
  maxTests: number;
  isLocked: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAccessRuleForm {
  role: string;
  entityType: string;
  entityId: string;
  maxTests: number;
  isLocked: boolean;
  startDate: string;
  endDate: string;
}

export interface IAccessRulesState {
  items: IAccessRule[];
  loading: boolean;
  error: string | null;
}
