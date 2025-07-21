import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const FormCard = ({ title, description, children, className = "" }: FormCardProps) => {
  return (
    <Card className={`form-card animate-scale-in ${className}`}>
      <CardHeader>
        <CardTitle className="gradient-text">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormCard;