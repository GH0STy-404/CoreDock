import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { buttonHover } from '../../animations/hover';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glow = false,
  ...props
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-outfit font-semibold tracking-wide uppercase transition-all duration-300 rounded border cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-brand-primary text-white border-brand-primary hover:bg-transparent hover:text-brand-primary",
    secondary: "bg-transparent text-white border-white hover:bg-white hover:text-bg-base",
    outline: "bg-transparent text-text-primary border-border-primary hover:border-brand-primary hover:text-brand-primary",
    ghost: "bg-transparent text-text-secondary border-transparent hover:bg-border-glass hover:text-text-primary",
    danger: "bg-red-600 text-white border-red-600 hover:bg-transparent hover:text-red-500 hover:border-red-500"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-xs",
    lg: "px-8 py-3.5 text-sm"
  };

  return (
    <motion.button
      whileHover={buttonHover}
      className={cn(
        baseStyle,
        variants[variant],
        sizes[size],
        glow && variant === 'primary' && "shadow-orange-glow",
        className
      )}
      {...(props as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
