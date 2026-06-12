import { motion } from 'framer-motion';
import { User, ExternalLink } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { CopyButton } from '../shared/CopyButton';
import { QRCodeDisplay } from '../shared/QRCodeDisplay';
import { useWalletContext } from '../../context/WalletContext';
import { shortenAddress } from '../../utils/format';
import { getExplorerAccountUrl } from '../../utils/constants';

export function WalletInfo() {
  const { publicKey, isConnected, accountExists } = useWalletContext();

  if (!isConnected || !publicKey) return null;

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Your Wallet</h3>
            <div className="flex items-center gap-1.5">
              <span className={accountExists ? 'status-dot-active' : 'status-dot-inactive'} />
              <span className="text-xs text-slate-400">
                {accountExists ? 'Active on Testnet' : 'Not Funded'}
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-dark/60 rounded-xl p-3 mb-4">
          <p className="text-xs text-slate-500 mb-1">Public Address</p>
          <p className="font-mono text-sm text-slate-200 break-all leading-relaxed">
            {publicKey}
          </p>
        </div>

        {/* Short address + actions */}
        <div className="flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-slate-400"
          >
            {shortenAddress(publicKey)}
          </motion.span>

          <div className="flex items-center gap-3">
            <CopyButton text={publicKey} label="Copy" />
            <QRCodeDisplay address={publicKey} />
            <a
              href={getExplorerAccountUrl(publicKey)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Explorer</span>
            </a>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
