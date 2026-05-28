import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminDispatch } from '../store/hooks';
import { logoutAdmin } from '../features/auth/store/auth.slice';
import { useAdminTheme } from '../context/AdminThemeContext';
import BrandLogo from '@shared/components/BrandLogo';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  X,
  FileText,
  Bell,
  MessageSquare,
  Image,
  Tag,
  Volume2,
  Folder,
  Activity,
  Database,
  GraduationCap,
  Layers,
  Bookmark,
  Lock,
  CheckCircle,
  DollarSign,
  Hash,
  PanelLeftClose,
  PanelLeft,
  HelpCircle,
  UserCheck,
  Megaphone,
  Shield,
  Award,
  TrendingUp,
  Receipt,
} from '@shared/icons';
import { staggerContainer, fadeInLeft } from '../utils/animations';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Users', icon: Users, path: '/admin/users' },
];

const examNavItems = [
  { label: 'Categories', icon: Layers, path: '/admin/exam-categories' },
  { label: 'Exams', icon: BookOpen, path: '/admin/exams' },
  { label: 'Subjects', icon: Bookmark, path: '/admin/subjects' },
  { label: 'Topics', icon: Hash, path: '/admin/topics' },
];

const testNavItems = [
  { label: 'Tests', icon: FileText, path: '/admin/tests' },
  { label: 'Questions', icon: HelpCircle, path: '/admin/questions' },
];

const contentNavItems = [
  { label: 'Study Materials', icon: GraduationCap, path: '/admin/study-materials' },
  { label: 'Home Content', icon: LayoutDashboard, path: '/admin/home' },
  { label: 'Banners', icon: Image, path: '/admin/banners' },
];

const engagementNavItems = [
  { label: 'Enrollments', icon: UserCheck, path: '/admin/enrollments' },
  { label: 'Batches & Groups', icon: Folder, path: '/admin/batches' },
  { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { label: 'Tickets', icon: MessageSquare, path: '/admin/tickets' },
  { label: 'Bookmarks', icon: Bookmark, path: '/admin/bookmarks' },
  { label: 'Reviews', icon: CheckCircle, path: '/admin/reviews' },
];

const monetizationNavItems = [
  { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { label: 'Plans', icon: DollarSign, path: '/admin/plans' },
  { label: 'Coupons', icon: Tag, path: '/admin/coupons' },
  { label: 'Material Purchases', icon: Receipt, path: '/admin/material-purchases' },
];

const communicationNavItems = [
  { label: 'FAQs', icon: HelpCircle, path: '/admin/faqs' },
  { label: 'Announcements', icon: Megaphone, path: '/admin/announcements' },
];

const insightNavItems = [
  { label: 'Analytics', icon: TrendingUp, path: '/admin/analytics' },
  { label: 'Reports', icon: Activity, path: '/admin/reports' },
  { label: 'Activity Logs', icon: Database, path: '/admin/activity-logs' },
  { label: 'Leaderboard', icon: Award, path: '/admin/leaderboard' },
];

const systemNavItems = [
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
  { label: 'Access Rules', icon: Shield, path: '/admin/access-rules' },
];

const NavSection: React.FC<{ label: string; items: typeof mainNavItems; onClose: () => void }> = ({ label, items, onClose }) => {
  const { sidebarCollapsed } = useAdminTheme();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-1"
    >
      <motion.p
        variants={fadeInLeft}
        className="nav-section-label px-3 py-1.5 text-[10px] font-semibold text-blue-300/40 dark:text-gray-500 uppercase tracking-[0.15em]"
      >
        {label}
      </motion.p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.path} variants={fadeInLeft}>
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-admin-primary/20 to-transparent dark:from-admin-primary/20 dark:to-transparent text-white shadow-sm'
                    : 'text-blue-300/60 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 hover:bg-white/5 dark:hover:bg-gray-700/50'
                } ${sidebarCollapsed ? 'justify-center px-2' : ''}`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <div className={`w-1 h-6 rounded-full transition-all duration-200 -ml-1.5 ${
                    isActive ? 'bg-admin-primary shadow-sm shadow-admin-primary/50' : 'bg-transparent group-hover:bg-white/20'
                  } ${sidebarCollapsed ? 'hidden' : ''}`} />
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-admin-primary/20 dark:bg-admin-primary/25 text-admin-primary-light'
                      : 'text-blue-300/40 dark:text-gray-500 group-hover:bg-white/10 dark:group-hover:bg-gray-700/50 group-hover:text-blue-200 dark:group-hover:text-gray-300'
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className={`nav-label transition-all duration-200 ${
                    isActive ? 'text-white dark:text-white font-semibold' : ''
                  } ${sidebarCollapsed ? 'hidden' : ''}`}>{item.label}</span>
                  {isActive && !sidebarCollapsed && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-admin-primary shadow-sm shadow-admin-primary/50"
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAdminDispatch();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useAdminTheme();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 z-50 h-screen flex-shrink-0 bg-gradient-to-b from-tb-navy via-indigo-950 to-violet-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col overflow-hidden lg:translate-x-0 lg:static lg:z-auto ${
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        } ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 bg-white/5 backdrop-blur-sm flex-shrink-0 border-b border-white/5">
          <div className={`flex items-center gap-1.5 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
            <BrandLogo className="flex items-center gap-1.5" logoClassName="h-12 w-14" textClassName="hidden" />
            <div className={`sidebar-brand-text ${sidebarCollapsed ? 'hidden' : ''}`}>
              <span className="text-base font-bold text-white leading-tight block">P2 Platform</span>
              <span className="text-[10px] text-blue-300/50 uppercase tracking-[0.15em] font-semibold">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={sidebarCollapsed ? toggleSidebar : onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-blue-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <NavSection label="Main" items={mainNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Exam Setup" items={examNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Tests & Questions" items={testNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Content" items={contentNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Engagement" items={engagementNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Monetization" items={monetizationNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Communication" items={communicationNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="Insights" items={insightNavItems} onClose={onClose} />
          <div className="border-t border-white/5 my-2" />
          <NavSection label="System" items={systemNavItems} onClose={onClose} />
        </nav>

        <div className={`p-3 border-t border-white/5 ${sidebarCollapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center gap-3 px-3 py-2.5 mb-1 ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-tb-blue to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
              A
            </div>
            <div className={`sidebar-user-info flex-1 min-w-0 ${sidebarCollapsed ? 'hidden' : ''}`}>
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-[10px] text-blue-300/50 truncate">admin@dreamboost.com</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-blue-300/40 hover:text-blue-200 hover:bg-white/5 transition-all duration-200 mb-1"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              {sidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </div>
            <span className={`sidebar-logout-text ${sidebarCollapsed ? 'hidden' : ''}`}>
              {sidebarCollapsed ? '' : 'Collapse'}
            </span>
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-blue-300/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Logout"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className={`sidebar-logout-text ${sidebarCollapsed ? 'hidden' : ''}`}>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;