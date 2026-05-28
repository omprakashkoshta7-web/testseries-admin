import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  header,
  footer,
}) => {
  const hasExplicitPadding = /\b(?:p|px|py|pt|pr|pb|pl)-/.test(className);
  const headerClasses = hasExplicitPadding
    ? 'card-header'
    : 'card-header px-4 sm:px-5 pt-4 sm:pt-5 pb-3';
  const bodyClasses = hasExplicitPadding
    ? 'card-body'
    : `card-body ${title || header ? 'px-4 sm:px-5 pb-4 sm:pb-5' : 'p-4 sm:p-5'}`;
  const footerClasses = hasExplicitPadding
    ? 'card-footer'
    : 'card-footer px-4 sm:px-5 py-4 border-t border-tb-gray-100';

  return (
    <div className={`card animate-fade-in ${className}`}>
      {header ? (
        <div className={headerClasses}>{header}</div>
      ) : (
        title && (
          <div className={headerClasses}>
            <h3 className="card-title">{title}</h3>
            {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
          </div>
        )
      )}

      <div className={bodyClasses}>{children}</div>

      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};

export default Card;
