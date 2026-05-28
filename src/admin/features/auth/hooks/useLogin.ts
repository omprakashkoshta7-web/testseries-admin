import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { loginUser, clearError } from '../store/auth.slice';
import { selectAdminAuth, selectAdminLoading, selectAdminError } from '../store/auth.selectors';

export const useLogin = () => {
  const dispatch = useAdminDispatch();
  const { isAuthenticated } = useAdminSelector(selectAdminAuth);
  const isLoading = useAdminSelector(selectAdminLoading);
  const error = useAdminSelector(selectAdminError);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  useEffect(() => { if (isAuthenticated) navigate('/admin/dashboard', { replace: true }); }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password, rememberMe }));
  };

  return { email, setEmail, password, setPassword, rememberMe, setRememberMe, showPassword, setShowPassword, isLoading, error, handleSubmit };
};
