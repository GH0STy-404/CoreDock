import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { cardHover } from '../../animations/hover';

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
    <motion.div
      whileHover={hoverEffect ? cardHover : undefined}
      onClick={onClick}
      className={cn(
        "bg-glass rounded-lg p-6 relative overflow-hidden transition-colors duration-300 border border-border-glass",
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
    </motion.div>
  );
};

export default GlassCard;
