import { Globe, Cpu, Zap } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { useWalletContext } from '../../context/WalletContext';

export function QuickStats() {
  const { isConnected, network, accountExists } = useWalletContext();

  if (!isConnected) return null;

  const stats = [
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Network',
      value: network,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      label: 'Status',
      value: accountExists ? 'Active' : 'Inactive',
      color: accountExists ? 'text-success' : 'text-warning',
      bgColor: accountExists ? 'bg-success/10' : 'bg-warning/10',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Protocol',
      value: 'Stellar',
      color: 'text-primary-light',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <GlassCard key={stat.label} padding="sm" hover={false}>
          <div className="flex flex-col items-center text-center gap-2">
            <div
              className={`w-9 h-9 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`text-sm font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
