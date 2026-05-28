import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdminDispatch } from '../../../store/hooks';
import { clearError } from '../store/auth.slice';
import BrandLogo from '@shared/components/BrandLogo';
import { Shield, BarChart3, Users, TrendingUp } from '@shared/icons';
import { useLogin } from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';
import { staggerContainer, fadeInUp, fadeInLeft } from '../../../utils/animations';

const features = [
  { icon: Shield, text: 'Advanced Security & Access Control' },
  { icon: BarChart3, text: 'Real-time Analytics Dashboard' },
  { icon: Users, text: 'User & Test Management' },
  { icon: TrendingUp, text: 'Revenue & Growth Tracking' },
];

const AdminLoginPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { email, setEmail, password, setPassword, rememberMe, setRememberMe, showPassword, setShowPassword, isLoading, error, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-tb-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-tb-navy via-indigo-900 to-violet-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-admin-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative flex flex-col justify-between p-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1.5"
          >
            <BrandLogo className="flex items-center" logoClassName="h-14 w-20" textClassName="hidden" />
            <div>
              <h1 className="text-2xl font-bold text-white">P2 Platform</h1>
              <p className="text-blue-200 text-sm">Admin Panel</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Welcome Back,
                <br />
                <span className="text-blue-300">Administrator</span>
              </h2>
              <p className="text-blue-200/80 mt-4 text-lg">
                Manage your exam preparation platform with powerful tools and insights.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    variants={fadeInLeft}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all duration-300">
                      <Icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-blue-300/60 text-sm"
          >
            &copy; 2026 P2 Platform. All rights reserved.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <BrandLogo className="flex items-center justify-center gap-1.5 mb-4" logoClassName="h-16 w-24" textClassName="hidden" />
            <h2 className="text-2xl font-bold text-tb-navy dark:text-white">Admin Login</h2>
            <p className="text-tb-gray-500 dark:text-gray-400 mt-1">Sign in to access the admin dashboard</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <LoginForm
              email={email}
              onEmailChange={setEmail}
              password={password}
              onPasswordChange={setPassword}
              rememberMe={rememberMe}
              onRememberMeChange={setRememberMe}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={error}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onClearError={() => dispatch(clearError())}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;