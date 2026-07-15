import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '../../utils/cn';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
  tag?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  tag
}) => {
  return (
    <GlassCard className={cn("group flex flex-col h-full", className)}>
      {tag && (
        <span className="self-start px-2 py-0.5 mb-3 text-[9px] font-outfit tracking-wider uppercase border border-brand-primary/30 text-brand-primary rounded bg-brand-primary/5">
          {tag}
        </span>
      )}
      
      {Icon && (
        <div className="p-2.5 rounded bg-bg-base border border-border-primary w-fit text-brand-primary group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-colors duration-200 mb-4">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <h3 className="font-outfit text-base font-bold tracking-wide text-text-primary group-hover:text-brand-primary transition-colors duration-200">
        {title}
      </h3>

      <p className="mt-2 text-text-secondary text-xs leading-relaxed flex-grow">
        {description}
      </p>
    </GlassCard>
  );
};

export default FeatureCard;
