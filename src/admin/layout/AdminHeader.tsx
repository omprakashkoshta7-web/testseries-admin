import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminDispatch, useAdminSelector } from '../store/hooks';
import { logoutAdmin } from '../features/auth/store/auth.slice';
import { selectAdminUser } from '../features/auth/store/auth.selectors';
import { useAdminTheme } from '../context/AdminThemeContext';
import BrandLogo from '@shared/components/BrandLogo';
import {
  Menu,
  Bell,
  LogOut,
  ChevronDown,
  Shield,
  User,
  Sun,
  Moon,
  Search,
  X,
  MessageSquare,
  Settings,
  ChevronRight,
} from '@shared/icons';
import { dropdownVariants, badgePulse } from '../utils/animations';

const notifications = [
  { id: 1, text: 'New user registration', time: '2 min ago', type: 'user' },
  { id: 2, text: 'Payment received: ₹499', time: '15 min ago', type: 'payment' },
  { id: 3, text: 'New support ticket opened', time: '1 hr ago', type: 'ticket' },
  { id: 4, text: 'Test "JEE Mock 3" completed by 24 users', time: '3 hrs ago', type: 'test' },
];

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle, title }) => {
  const dispatch = useAdminDispatch();
  const navigate = useNavigate();
  const user = useAdminSelector(selectAdminUser);
  const { theme, toggleTheme } = useAdminTheme();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
    setDropdownOpen(false);
  };

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A';

  const breadcrumbs = location.pathname.split('/').filter(Boolean).slice(1);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-tb-gray-200/60 dark:border-gray-700/40 shadow-[0_1px_8px_rgba(79,70,229,0.06)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 sm:px-5 flex-shrink-0 relative z-30 rounded-2xl mx-2 sm:mx-4 mt-2"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 text-tb-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <BrandLogo className="flex items-center" logoClassName="h-9 w-12" textClassName="hidden" />
          <div className="hidden sm:block border-l border-tb-gray-200 dark:border-gray-700 pl-3 ml-1">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-tb-navy dark:text-white leading-tight">{title}</h1>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-admin-primary/10 to-indigo-500/10 dark:from-admin-primary/20 dark:to-indigo-500/20 text-admin-primary dark:text-admin-primary-light rounded-md border border-admin-primary/10">Admin</span>
            </div>
            {breadcrumbs.length > 1 && (
              <div className="flex items-center gap-1 text-[11px] text-tb-gray-400 dark:text-gray-500 mt-0.5">
                <span className="hover:text-admin-primary dark:hover:text-admin-primary-light transition-colors cursor-pointer">Home</span>
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    <ChevronRight className="w-2.5 h-2.5" />
                    <span className="capitalize hover:text-admin-primary dark:hover:text-admin-primary-light transition-colors cursor-pointer">
                      {b.replace(/-/g, ' ')}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <motion.div
          animate={{ width: searchFocused ? 280 : 180 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="hidden sm:flex items-center bg-gradient-to-r from-tb-gray-50/90 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl px-3 py-1.5 border border-tb-gray-200/60 dark:border-gray-700/50 shadow-sm focus-within:border-admin-primary/40 focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.08)] transition-all duration-200 group"
        >
          <Search className="w-4 h-4 text-tb-gray-400 dark:text-gray-500 mr-2 group-focus-within:text-admin-primary transition-colors" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none text-xs text-tb-gray-600 dark:text-gray-300 placeholder-tb-gray-400 dark:placeholder-gray-500 w-full"
          />
          <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-white/50 dark:bg-gray-700/50 rounded text-tb-gray-400 dark:text-gray-500 border border-tb-gray-200 dark:border-gray-600 whitespace-nowrap">⌘K</kbd>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className="relative p-2.5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 text-tb-gray-500 dark:text-gray-400 transition-colors group"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="w-4.5 h-4.5 group-hover:text-amber-400 transition-colors" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="w-4.5 h-4.5 group-hover:text-indigo-500 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="relative" ref={notifRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
            className="relative p-2.5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 text-tb-gray-500 dark:text-gray-400 transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            <motion.span
              variants={badgePulse}
              animate="animate"
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-tb-red rounded-full ring-2 ring-white dark:ring-gray-900"
            />
          </motion.button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-tb-lg dark:shadow-gray-900/50 border border-tb-gray-200 dark:border-gray-700 z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-tb-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-tb-navy dark:text-white">Notifications</h4>
                  <button className="text-xs font-medium text-admin-primary hover:text-admin-primary-dark">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <motion.button
                      key={n.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ backgroundColor: 'rgba(79,70,229,0.04)' }}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left border-b border-tb-gray-50 dark:border-gray-700/30 last:border-0 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        n.type === 'payment' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                        n.type === 'ticket' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                        n.type === 'test' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-admin-primary' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                      }`}>
                        {n.type === 'payment' ? '₹' : n.type === 'ticket' ? '!' : n.type === 'test' ? '✓' : '👤'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-tb-gray-700 dark:text-gray-200 leading-snug">{n.text}</p>
                        <p className="text-xs text-tb-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-tb-gray-100 dark:border-gray-700 text-center">
                  <button className="text-xs font-medium text-admin-primary hover:text-admin-primary-dark flex items-center justify-center gap-1 mx-auto">
                    View all notifications
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-tb-gray-200 dark:bg-gray-700 mx-0.5 hidden sm:block" />

        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-2 rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-admin-primary via-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-admin-primary/20">
                {userInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-gray-900 rounded-full" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-tb-navy dark:text-white leading-tight">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-tb-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <motion.div
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-tb-gray-400 dark:text-gray-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-tb-lg dark:shadow-gray-900/50 border border-tb-gray-200 dark:border-gray-700 py-1 z-50 overflow-hidden"
              >
                <div className="px-4 py-3.5 border-b border-tb-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50/50 to-white dark:from-gray-800 dark:to-gray-800">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      className="w-10 h-10 bg-gradient-to-br from-admin-primary via-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    >
                      {userInitials}
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-tb-navy dark:text-white">{user?.name || 'Admin'}</p>
                      <p className="text-xs text-tb-gray-500 dark:text-gray-400">{user?.email || 'admin@platform.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-gray-600 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <User className="w-4 h-4 text-tb-gray-400" />
                    Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-gray-600 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-tb-gray-400" />
                    Messages
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-gray-600 dark:text-gray-300 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-tb-gray-400" />
                    Admin Settings
                  </motion.button>
                </div>
                <div className="border-t border-tb-gray-100 dark:border-gray-700 pt-1 pb-1">
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-red hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                    <span className="ml-auto text-[10px] text-tb-gray-400 dark:text-gray-500 font-mono">⌘Q</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;