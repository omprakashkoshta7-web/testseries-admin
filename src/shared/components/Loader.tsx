import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false, label }) => {
  const sizeClasses = {
    sm: 'h-10 w-14',
    md: 'h-14 w-20',
    lg: 'h-20 w-28',
  };

  const labelClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const loader = (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite" aria-label={label || 'Loading'}>
      <div className={`book-loader ${sizeClasses[size]}`}>
        <div className="book-loader__shadow" />
        <div className="book-loader__cover book-loader__cover--left" />
        <div className="book-loader__cover book-loader__cover--right" />
        <div className="book-loader__pages">
          <div className="book-loader__page book-loader__page--one" />
          <div className="book-loader__page book-loader__page--two" />
          <div className="book-loader__page book-loader__page--three" />
        </div>
        <div className="book-loader__spine" />
      </div>
      {label && <p className={`${labelClasses[size]} font-semibold text-tb-gray-600`}>{label}</p>}
      <style>{`
        .book-loader {
          position: relative;
          perspective: 420px;
          transform-style: preserve-3d;
        }

        .book-loader__shadow {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: -10%;
          height: 12%;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.16);
          filter: blur(5px);
          animation: book-loader-shadow 1.8s ease-in-out infinite;
        }

        .book-loader__cover,
        .book-loader__page {
          position: absolute;
          top: 12%;
          width: 48%;
          height: 72%;
          border-radius: 6px 4px 4px 6px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .book-loader__cover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #0f766e 100%);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
          border: 1px solid rgba(30, 64, 175, 0.28);
        }

        .book-loader__cover--left {
          left: 2%;
          transform-origin: right center;
          animation: book-loader-left-cover 1.8s ease-in-out infinite;
        }

        .book-loader__cover--right {
          right: 2%;
          transform-origin: left center;
          border-radius: 4px 6px 6px 4px;
          animation: book-loader-right-cover 1.8s ease-in-out infinite;
        }

        .book-loader__pages {
          position: absolute;
          inset: 16% 8% 18%;
          transform-style: preserve-3d;
        }

        .book-loader__page {
          top: 0;
          left: 50%;
          width: 46%;
          height: 100%;
          transform-origin: left center;
          background:
            linear-gradient(90deg, rgba(148, 163, 184, 0.18), transparent 18%),
            repeating-linear-gradient(180deg, #ffffff 0 9px, #e8f0fb 10px 11px);
          border: 1px solid #dbe7f3;
          box-shadow: 0 5px 12px rgba(15, 23, 42, 0.1);
        }

        .book-loader__page--one {
          animation: book-loader-page-turn 1.8s ease-in-out infinite;
        }

        .book-loader__page--two {
          animation: book-loader-page-turn 1.8s ease-in-out infinite 0.16s;
          opacity: 0.86;
        }

        .book-loader__page--three {
          animation: book-loader-page-turn 1.8s ease-in-out infinite 0.32s;
          opacity: 0.72;
        }

        .book-loader__spine {
          position: absolute;
          left: 50%;
          top: 11%;
          width: 4px;
          height: 74%;
          border-radius: 99px;
          background: linear-gradient(180deg, #bfdbfe, #2563eb, #0f766e);
          transform: translateX(-50%);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.45);
        }

        @keyframes book-loader-left-cover {
          0%, 100% { transform: rotateY(0deg); }
          22%, 72% { transform: rotateY(-62deg); }
        }

        @keyframes book-loader-right-cover {
          0%, 100% { transform: rotateY(0deg); }
          22%, 72% { transform: rotateY(34deg); }
        }

        @keyframes book-loader-page-turn {
          0%, 24% { transform: rotateY(0deg); opacity: 0; }
          34% { opacity: 1; }
          58% { transform: rotateY(-156deg); opacity: 1; }
          74%, 100% { transform: rotateY(-180deg); opacity: 0; }
        }

        @keyframes book-loader-shadow {
          0%, 100% { transform: scaleX(0.75); opacity: 0.28; }
          35%, 72% { transform: scaleX(1); opacity: 0.42; }
        }

        @media (prefers-reduced-motion: reduce) {
          .book-loader__shadow,
          .book-loader__cover--left,
          .book-loader__cover--right,
          .book-loader__page {
            animation: none;
          }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
