import { TargetAndTransition } from 'framer-motion';

export const cardHover: TargetAndTransition = {
  y: -4,
  borderColor: 'rgba(0, 191, 255, 0.4)', // Electric Blue accent
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 191, 255, 0.05)',
  transition: { duration: 0.25, ease: 'easeOut' }
};

export const buttonHover: TargetAndTransition = {
  scale: 1.02,
  boxShadow: '0 0 15px rgba(0, 245, 255, 0.25)', // Neon Cyan accent
  transition: { duration: 0.15, ease: 'easeInOut' }
};

export const linkHover: TargetAndTransition = {
  color: '#00F5FF', // Neon Cyan
  transition: { duration: 0.15 }
};

export const borderIndicatorHover: TargetAndTransition = {
  width: '100%',
  transition: { duration: 0.25, ease: 'easeInOut' }
};
