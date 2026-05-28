import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from '@shared/icons';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
};

const styles = {
  info: 'border-blue-100 bg-blue-50 text-blue-800',
  success: 'border-green-100 bg-green-50 text-green-800',
  warning: 'border-amber-100 bg-amber-50 text-amber-800',
  danger: 'border-red-100 bg-red-50 text-red-800',
};

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const Icon = iconMap[variant];

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${styles[variant]} ${className}`}>
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <h4 className="text-sm font-semibold leading-5">{title}</h4>}
        <p className="text-sm leading-5 opacity-90">{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-md p-0.5 text-current transition-opacity hover:opacity-70"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
