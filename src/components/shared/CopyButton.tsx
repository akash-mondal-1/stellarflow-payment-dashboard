import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}

export function CopyButton({ text, label, className, iconOnly = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs transition-all duration-200',
        copied
          ? 'text-success'
          : 'text-slate-400 hover:text-white',
        className
      )}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {!iconOnly && (
        <span>{copied ? 'Copied!' : label || 'Copy'}</span>
      )}
    </button>
  );
}
