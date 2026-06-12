import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  const variantClasses = {
    primary: 'btn-gradient',
    secondary: 'btn-secondary',
    danger:
      'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 rounded-xl transition-all duration-300',
    success:
      'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 rounded-xl transition-all duration-300',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  return (
    <button
      className={clsx(
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        'inline-flex items-center justify-center font-semibold',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
