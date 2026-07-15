import React from 'react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
  accent?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  className,
  accent = false
}) => {
  return (
    <div
      className={cn(
        "border-l border-border-primary p-4 bg-bg-surface/30 hover:bg-bg-surface/50 transition-colors duration-300",
        accent && "border-brand-primary",
        className
      )}
    >
      <div className="text-[10px] font-outfit uppercase tracking-wider text-text-secondary">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-0.5">
        <span className={cn(
          "font-outfit text-xl md:text-2xl font-bold tracking-tight",
          accent ? "text-brand-primary" : "text-text-primary"
        )}>
          {value}
        </span>
        {unit && (
          <span className="text-[10px] font-semibold text-text-muted tracking-wide uppercase">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
