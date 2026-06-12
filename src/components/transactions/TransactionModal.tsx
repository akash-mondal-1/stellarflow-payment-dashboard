import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X, ExternalLink, RotateCcw, Clock } from 'lucide-react';
import { CopyButton } from '../shared/CopyButton';
import { GradientButton } from '../shared/GradientButton';
import { shortenHash, formatTimestamp } from '../../utils/format';
import { getExplorerTxUrl } from '../../utils/constants';
import type { TransactionResult, ModalProps } from '../../types';

interface TransactionModalProps extends ModalProps {
  result: TransactionResult | null;
  onRetry?: () => void;
}

export function TransactionModal({
  isOpen,
  onClose,
  result,
  onRetry,
}: TransactionModalProps) {
  if (!result) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {result.success ? (
              /* ─── Success State ─── */
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 200,
                    delay: 0.1,
                  }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    Transaction Successful!
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Your XLM payment has been sent successfully.
                  </p>
                </motion.div>

                {/* Transaction Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 mb-6"
                >
                  {result.hash && (
                    <div className="bg-dark/60 rounded-xl p-3">
                      <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-xs font-mono text-slate-300">
                          {shortenHash(result.hash, 12)}
                        </code>
                        <CopyButton text={result.hash} iconOnly />
                      </div>
                    </div>
                  )}

                  {result.timestamp && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimestamp(result.timestamp)}
                    </div>
                  )}
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  {result.hash && (
                    <a
                      href={getExplorerTxUrl(result.hash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Stellar Expert
                    </a>
                  )}

                  <GradientButton fullWidth onClick={onClose}>
                    Done
                  </GradientButton>
                </motion.div>
              </div>
            ) : (
              /* ─── Error State ─── */
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 200,
                    delay: 0.1,
                  }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-error/20 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-error" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    Transaction Failed
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    {result.error || 'An unexpected error occurred.'}
                  </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  {onRetry && (
                    <GradientButton
                      fullWidth
                      onClick={onRetry}
                      icon={<RotateCcw className="w-4 h-4" />}
                    >
                      Try Again
                    </GradientButton>
                  )}

                  <button
                    onClick={onClose}
                    className="btn-secondary w-full py-3 text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
