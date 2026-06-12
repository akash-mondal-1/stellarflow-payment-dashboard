import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ConnectButton } from '../wallet/ConnectButton';
import { NetworkBadge } from '../wallet/NetworkBadge';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-dark/80 border-b border-dark-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Stellar<span className="text-gradient">Flow</span>
              </h1>
              <p className="text-[10px] text-slate-500 -mt-0.5 hidden sm:block">
                Modern Payments on Stellar
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <NetworkBadge />
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
