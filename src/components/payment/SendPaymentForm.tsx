import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, User, Hash, MessageSquare } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { GradientButton } from '../shared/GradientButton';
import { TransactionModal } from '../transactions/TransactionModal';
import { useWalletContext } from '../../context/WalletContext';
import { useSendPayment } from '../../hooks/useSendPayment';
import { validateAddress, validateAmount, validateMemo } from '../../utils/validation';

export function SendPaymentForm() {
  const { isConnected, balance, accountExists } = useWalletContext();
  const { send, status, result, reset } = useSendPayment();

  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  if (!isConnected) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const addrResult = validateAddress(destination);
    if (!addrResult.isValid) newErrors.destination = addrResult.error!;

    const amountResult = validateAmount(amount, balance || undefined);
    if (!amountResult.isValid) newErrors.amount = amountResult.error!;

    if (memo) {
      const memoResult = validateMemo(memo);
      if (!memoResult.isValid) newErrors.memo = memoResult.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setShowModal(true);
    await send({ destination: destination.trim(), amount, memo: memo.trim() });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (result?.success) {
      setDestination('');
      setAmount('');
      setMemo('');
      setErrors({});
    }
    reset();
  };

  const isSubmitting = status === 'building' || status === 'signing' || status === 'submitting';

  return (
    <>
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Send Payment</h3>
            <p className="text-xs text-slate-400">Transfer XLM on Testnet</p>
          </div>
        </div>

        {!accountExists && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-xl bg-warning/10 border border-warning/20">
            <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-warning">
              Your account is not funded. Fund it first to send payments.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
              <User className="w-3.5 h-3.5" />
              Recipient Address
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                if (errors.destination) {
                  setErrors((prev) => {
                    const { destination: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              placeholder="G..."
              className="input-stellar font-mono text-xs"
              disabled={isSubmitting}
            />
            {errors.destination && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error mt-1.5 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.destination}
              </motion.p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
              <Hash className="w-3.5 h-3.5" />
              Amount (XLM)
            </label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    setAmount(val);
                    if (errors.amount) {
                      setErrors((prev) => {
                        const { amount: _, ...rest } = prev;
                        return rest;
                      });
                    }
                  }
                }}
                placeholder="0.00"
                className="input-stellar pr-14"
                disabled={isSubmitting}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                XLM
              </span>
            </div>
            {errors.amount && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error mt-1.5 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.amount}
              </motion.p>
            )}
          </div>

          {/* Memo */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Memo <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => {
                setMemo(e.target.value);
                if (errors.memo) {
                  setErrors((prev) => {
                    const { memo: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              placeholder="Add a note..."
              className="input-stellar"
              maxLength={28}
              disabled={isSubmitting}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.memo ? (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-error flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.memo}
                </motion.p>
              ) : (
                <span />
              )}
              <span className="text-[10px] text-slate-600">
                {memo.length}/28
              </span>
            </div>
          </div>

          {/* Submit */}
          <GradientButton
            type="submit"
            fullWidth
            size="lg"
            isLoading={isSubmitting}
            icon={<Send className="w-4 h-4" />}
            disabled={!accountExists || isSubmitting}
          >
            {isSubmitting
              ? status === 'signing'
                ? 'Approve in Freighter...'
                : 'Sending...'
              : 'Send XLM'}
          </GradientButton>
        </form>
      </GlassCard>

      {/* Transaction Result Modal */}
      <TransactionModal
        isOpen={showModal && (status === 'success' || status === 'error')}
        onClose={handleCloseModal}
        result={result}
        onRetry={() => {
          reset();
          setShowModal(false);
        }}
      />
    </>
  );
}
