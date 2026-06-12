import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false,
  padding = 'md',
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        'glass-card',
        paddingClasses[padding],
        hover && 'gradient-border',
        gradient && 'bg-gradient-to-br from-primary/5 to-accent/5',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
