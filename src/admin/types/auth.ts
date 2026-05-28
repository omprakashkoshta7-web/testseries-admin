export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface IAdminAuthState {
  user: IAdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  user: IAdminUser;
  token: string;
}
