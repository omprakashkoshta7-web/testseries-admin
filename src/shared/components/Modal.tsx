import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@shared/icons';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  closeButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, closeButton = true, children, footer, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full mx-4 ${sizeClasses[size]} animate-modal-enter max-h-[90vh] flex flex-col`}>
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-gray-700/40 shadow-2xl shadow-black/10 overflow-hidden flex flex-col max-h-full">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tb-blue via-blue-400 to-purple-400" />
          {(title || closeButton) && (
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-tb-gray-100/80 dark:border-gray-700/40 flex-shrink-0">
              {title && <h2 className="text-lg font-bold text-tb-navy dark:text-white">{title}</h2>}
              {closeButton && (
                <button onClick={onClose} className="ml-auto p-1.5 rounded-lg text-tb-gray-400 hover:text-tb-gray-600 dark:hover:text-gray-300 hover:bg-tb-gray-100 dark:hover:bg-gray-700/60 transition-all duration-200">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-tb-gray-100/80 dark:border-gray-700/40 bg-tb-gray-50/60 dark:bg-gray-900/40 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default Modal;
