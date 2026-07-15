import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  width,
  height
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      style={styles}
      className={cn(
        "animate-pulse bg-border-glass rounded relative overflow-hidden",
        variant === 'circle' && "rounded-full",
        variant === 'text' && "h-4 w-3/4 mb-2",
        className
      )}
    >
      {/* CAD technical design texture simulation in skeleton cards */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
    </div>
  );
};

export default Skeleton;
