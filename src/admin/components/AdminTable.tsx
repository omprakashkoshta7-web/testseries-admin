import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Loader } from '@shared/components';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search } from '@shared/icons';
import { staggerFast, rowVariants } from '../utils/animations';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
}

function AdminTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = 'No data found',
  emptyIcon,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  page,
  totalPages,
  onPageChange,
  totalItems,
}: AdminTableProps<T>) {
  const [localSearch, setLocalSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    if (!localSearch || onSearch) return data;
    const q = localSearch.toLowerCase();
    return data.filter(item =>
      columns.some(col => {
        const val = (item as any)[col.key];
        return val && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, localSearch, columns, onSearch]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    onSearch?.(val);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="admin-card-solid overflow-hidden"
      >
        <div className="flex justify-center py-16">
          <Loader size="lg" />
        </div>
      </motion.div>
    );
  }

  if (sorted.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card-solid"
      >
        <div className="flex flex-col items-center justify-center py-16">
          {emptyIcon || <div className="w-14 h-14 rounded-2xl bg-tb-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-tb-gray-400" />
          </div>}
          <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">{emptyMessage}</h3>
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm">Try adjusting your search or filters</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="admin-card-solid overflow-hidden"
    >
      {searchable && (
        <div className="p-4 border-b border-tb-gray-100 dark:border-gray-700/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={localSearch}
              onChange={handleSearchChange}
              className="input pl-10"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`${col.sortable ? 'cursor-pointer select-none' : ''} ${col.className || ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="divide-y divide-tb-gray-100 dark:divide-gray-700/30"
          >
            <AnimatePresence mode="popLayout">
              {sorted.map(item => (
                <motion.tr
                  key={keyExtractor(item)}
                  variants={rowVariants}
                  layout
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-blue-50/40 dark:hover:from-indigo-900/20 dark:hover:to-blue-900/20 transition-all duration-200"
                >
                  {columns.map(col => (
                    <td key={col.key} className={col.className || ''}>
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
      {page !== undefined && totalPages && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-tb-gray-100 dark:border-gray-700/50">
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
            {totalItems !== undefined && <span className="ml-2">({totalItems} total)</span>}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (p <= totalPages) {
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange?.(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      p === page
                        ? 'bg-gradient-to-br from-admin-primary to-indigo-500 text-white shadow-md shadow-admin-primary/20'
                        : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                );
              }
              return null;
            })}
            <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default AdminTable;