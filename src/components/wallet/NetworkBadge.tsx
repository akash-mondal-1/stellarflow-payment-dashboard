import { Globe } from 'lucide-react';
import { NETWORK_NAME } from '../../utils/constants';

export function NetworkBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
      <Globe className="w-3.5 h-3.5 text-accent" />
      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
        {NETWORK_NAME}
      </span>
    </div>
  );
}
