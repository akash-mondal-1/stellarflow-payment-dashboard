import { motion } from 'framer-motion';
import { History, RefreshCw, Inbox } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { TransactionRow } from './TransactionRow';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';
import { useWalletContext } from '../../context/WalletContext';

export function TransactionHistory() {
  const { isConnected, publicKey } = useWalletContext();
  const { history, isLoading, refresh } = useTransactionHistory();

  if (!isConnected || !publicKey) return null;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <p className="text-xs text-slate-400">Latest transactions</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={refresh}
          disabled={isLoading}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white disabled:opacity-50"
          title="Refresh History"
        >
          <RefreshCw
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
          />
        </motion.button>
      </div>

      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner size="sm" text="Loading transactions..." />
        </div>
      ) : history.length === 0 ? (
        <div className="py-8 text-center">
          <Inbox className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <p className="text-sm text-slate-500">No transactions yet</p>
          <p className="text-xs text-slate-600 mt-1">
            Send or receive XLM to see activity here
          </p>
        </div>
      ) : (
        <div className="space-y-0.5 max-h-[400px] overflow-y-auto">
          {history.map((op) => (
            <TransactionRow
              key={op.id}
              operation={op}
              currentAddress={publicKey}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
}
