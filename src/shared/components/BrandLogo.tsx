import React from 'react';
import logoImage from '../../public/ChatGPT Image May 24, 2026, 11_09_16 AM.png';

interface BrandLogoProps {
  textClassName?: string;
  logoClassName?: string;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  textClassName = 'text-xl font-bold text-tb-blue',
  logoClassName = 'h-16 w-[18rem]',
  className = 'flex items-center gap-1.5 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03]',
}) => {
  const hasObjectFit = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(logoClassName);

  return (
    <div className={`brand-logo-root ${className}`}>
      <img
        src={logoImage}
        alt="DreamBoost logo"
        className={`${logoClassName} ${hasObjectFit ? '' : 'object-contain'} brand-logo-wipe`}
      />
      <span className={textClassName}>DreamBoost</span>
    </div>
  );
};

export default BrandLogo;
