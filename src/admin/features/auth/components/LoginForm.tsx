import React from 'react';
import { motion } from 'framer-motion';
import { Input, Button, Alert } from '@shared/components';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from '@shared/icons';

interface Props {
  email: string;
  onEmailChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  rememberMe: boolean;
  onRememberMeChange: (val: boolean) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  error: string | null;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClearError: () => void;
}

const LoginForm: React.FC<Props> = ({ email, onEmailChange, password, onPasswordChange, rememberMe, onRememberMeChange, showPassword, onTogglePassword, error, isLoading, onSubmit, onClearError }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="admin-card p-8"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Alert variant="danger" className="mb-6" onClose={onClearError}>
            {error}
          </Alert>
        </motion.div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          icon={<Mail className="w-4 h-4" />}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />
          <motion.button
            type="button"
            onClick={onTogglePassword}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-3 top-[38px] text-tb-gray-400 hover:text-tb-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </motion.button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="w-4 h-4 rounded border-tb-gray-300 text-admin-primary focus:ring-admin-primary"
            />
            <span className="text-sm text-tb-gray-600 dark:text-gray-300">Remember me</span>
          </label>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default LoginForm;