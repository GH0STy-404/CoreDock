import React from 'react';
import { cn } from '../../utils/cn';

interface TechBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'muted';
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  children,
  variant = 'outline',
  className
}) => {
  const base = "px-2.5 py-0.5 text-[9px] font-outfit font-semibold uppercase tracking-wider rounded border select-none w-fit";
  
  const variants = {
    primary: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    secondary: "bg-white/5 text-white border-white/10",
    accent: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
    outline: "bg-transparent text-text-secondary border-border-primary",
    muted: "bg-transparent text-text-muted border-transparent"
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  );
};

export default TechBadge;
