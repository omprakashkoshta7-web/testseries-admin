import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="admin-card-glass flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 className="text-2xl font-bold text-tb-navy dark:text-white">{title}</h1>
      {subtitle && <p className="text-tb-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
    {actions && (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 sm:justify-end"
      >
        {actions}
      </motion.div>
    )}
  </motion.div>
);

export default PageHeader;
