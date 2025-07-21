import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="page-container">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="section-title gradient-text">{title}</h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;