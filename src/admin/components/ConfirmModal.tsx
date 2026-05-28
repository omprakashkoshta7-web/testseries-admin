import React from 'react';
import { motion } from 'framer-motion';
import { Modal, Button } from '@shared/components';
import { AlertTriangle } from '@shared/icons';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="sm">
      <div className="flex flex-col items-center text-center gap-5 py-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="relative"
        >
          <div className={`p-3.5 rounded-2xl shadow-lg ${
            variant === 'danger'
              ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 text-tb-red ring-1 ring-red-500/20'
              : 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-admin-primary/20 dark:to-indigo-900/10 text-admin-primary ring-1 ring-admin-primary/20'
          }`}>
            <AlertTriangle className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-lg font-bold text-tb-navy dark:text-white mb-1.5">{title}</h3>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">{message}</p>
        </motion.div>
      </div>
      <div className="flex gap-3 justify-center mt-6 pt-4 border-t border-tb-gray-100/80 dark:border-gray-700/40">
        <Button variant="ghost" onClick={onCancel} disabled={isLoading}>{cancelLabel}</Button>
        <Button
          variant={variant === 'danger' ? 'danger' : 'primary'}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;