import React from 'react';
import { cn } from '../../utils/cn';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'silver' | 'none';
  active?: boolean;
}

export const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  className,
  glowColor = 'blue',
  active = false
}) => {
  const glowStyles = {
    blue: "border-brand-primary/20 focus-within:border-brand-primary focus-within:shadow-[0_0_15px_rgba(0,191,255,0.15)]",
    cyan: "border-brand-accent/20 focus-within:border-brand-accent focus-within:shadow-[0_0_15px_rgba(0,245,255,0.15)]",
    silver: "border-border-primary hover:border-metallic-silver",
    none: "border-border-primary"
  };

  const activeStyles = {
    blue: "border-brand-primary shadow-[0_0_15px_rgba(0,191,255,0.12)]",
    cyan: "border-brand-accent shadow-[0_0_15px_rgba(0,245,255,0.12)]",
    silver: "border-metallic-silver",
    none: "border-border-primary"
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-bg-surface transition-all duration-300",
        active ? activeStyles[glowColor] : glowStyles[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlowBorder;
