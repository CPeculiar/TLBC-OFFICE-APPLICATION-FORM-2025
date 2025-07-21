import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, subtitle, description, children }: PageHeaderProps) => {
  return (
    <div className="relative hero-gradient py-20">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-heading text-secondary mb-8">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;