import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp, Coins } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { useWalletContext } from '../../context/WalletContext';

export function BalanceCard() {
  const { balance, isLoadingBalance, isConnected, refreshBalance, accountExists } =
    useWalletContext();

  if (!isConnected) return null;

  const numericBalance = balance ? parseFloat(balance) : 0;

  return (
    <GlassCard className="relative overflow-hidden" gradient>
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-tr from-secondary/15 to-transparent blur-2xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">XLM Balance</h3>
              <p className="text-xs text-slate-400">Stellar Lumens</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshBalance}
            disabled={isLoadingBalance}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white disabled:opacity-50"
            title="Refresh Balance"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoadingBalance ? 'animate-spin' : ''}`}
            />
          </motion.button>
        </div>

        {/* Balance Display */}
        <div className="mb-4">
          {isLoadingBalance ? (
            <div className="py-4">
              <LoadingSpinner size="sm" text="Fetching balance..." />
            </div>
          ) : !accountExists ? (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-slate-500">—</p>
              <p className="text-sm text-yellow-400/80">
                Account not funded. Visit{' '}
                <a
                  href="https://laboratory.stellar.org/#account-creator?network=test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-300 transition-colors"
                >
                  Stellar Laboratory
                </a>{' '}
                to fund with Friendbot.
              </p>
            </div>
          ) : (
            <div>
              <AnimatedCounter
                value={numericBalance}
                decimals={4}
                className="text-4xl font-bold text-white tracking-tight"
              />
              <span className="ml-2 text-lg font-medium text-slate-400">XLM</span>
            </div>
          )}
        </div>

        {/* Bottom stats */}
        {accountExists && balance && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <span>Account active on Testnet</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
