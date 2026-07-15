import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-glass rounded-lg p-6 relative overflow-hidden transition-all duration-300 border border-border-glass",
        hoverEffect && "hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_12px_30px_rgba(234,88,12,0.15)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Precision CAD grid subpattern inside cards for structural design feel */}
      <div className="absolute inset-0 bg-telemetry-nodes opacity-15 pointer-events-none"></div>
      
      {/* Tech indicators in card corners */}
      <span className="absolute top-0 right-0 w-[4px] h-[4px] bg-border-primary rounded-bl"></span>
      <span className="absolute bottom-0 left-0 w-[4px] h-[4px] bg-border-primary rounded-tr"></span>
      
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
