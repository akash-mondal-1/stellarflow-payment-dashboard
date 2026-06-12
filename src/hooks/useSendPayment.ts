import { useState, useCallback } from 'react';
import { sendPayment } from '../services/transaction';
import { useWalletContext } from '../context/WalletContext';
import type { SendPaymentParams, TransactionResult, TransactionStatus } from '../types';

export function useSendPayment() {
  const { publicKey, refreshBalance } = useWalletContext();
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [result, setResult] = useState<TransactionResult | null>(null);

  const send = useCallback(
    async (params: SendPaymentParams) => {
      if (!publicKey) {
        setResult({
          success: false,
          error: 'Wallet not connected.',
        });
        setStatus('error');
        return;
      }

      setStatus('building');
      setResult(null);

      try {
        setStatus('signing');
        const txResult = await sendPayment(publicKey, params);

        if (txResult.success) {
          setStatus('success');
          setResult(txResult);
          // Refresh balance after successful send
          await refreshBalance();
        } else {
          setStatus('error');
          setResult(txResult);
        }
      } catch (error) {
        setStatus('error');
        setResult({
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred.',
        });
      }
    },
    [publicKey, refreshBalance]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
  }, []);

  return { send, status, result, reset };
}
