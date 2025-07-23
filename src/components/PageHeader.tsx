import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, subtitle, description, children }: PageHeaderProps) => {
  return (
    <div className="relative hero-gradient py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-full text-center relative z-10">
        <div className="animate-fade-in-up max-w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-display font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight break-words hyphens-auto px-2 sm:px-0">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-secondary mb-4 sm:mb-6 md:mb-8 break-words hyphens-auto px-2 sm:px-0">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed break-words hyphens-auto px-2 sm:px-4">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-4 sm:mt-6 md:mt-8 max-w-full px-2 sm:px-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;