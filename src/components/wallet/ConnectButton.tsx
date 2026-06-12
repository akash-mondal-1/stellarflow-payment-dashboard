import { motion } from 'framer-motion';
import { Wallet, LogOut, Loader2, ExternalLink } from 'lucide-react';
import { useWalletContext } from '../../context/WalletContext';
import { shortenAddress } from '../../utils/format';
import { toast } from 'sonner';

export function ConnectButton() {
  const { isConnected, isConnecting, publicKey, connect, disconnect } =
    useWalletContext();

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to connect wallet';

      if (message.includes('not installed')) {
        toast.error(message, {
          action: {
            label: 'Install',
            onClick: () => window.open('https://freighter.app', '_blank'),
          },
        });
      } else {
        toast.error(message);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
  };

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-card/80 border border-dark-border"
        >
          <span className="status-dot-active" />
          <span className="text-xs font-mono text-slate-300">
            {shortenAddress(publicKey)}
          </span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDisconnect}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 
                     bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 
                     transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleConnect}
      disabled={isConnecting}
      className="btn-gradient text-sm gap-2"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      {!isConnecting && <ExternalLink className="w-3 h-3 opacity-60" />}
    </motion.button>
  );
}
