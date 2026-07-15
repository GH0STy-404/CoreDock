import React from 'react';
import { cn } from '../../utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  tagline,
  align = 'center',
  className
}) => {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <div
      className={cn("flex flex-col mb-10", alignment[align], className)}
    >
      {tagline && (
        <span className="font-outfit text-xs font-semibold tracking-wider text-brand-primary uppercase mb-2">
          {tagline}
        </span>
      )}
      
      <h2 className="font-outfit text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-text-secondary text-xs md:text-sm max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      
      {/* Simple, sleek line separator */}
      <div className="w-12 h-[2px] bg-brand-primary mt-5"></div>
    </div>
  );
};

export default SectionTitle;
