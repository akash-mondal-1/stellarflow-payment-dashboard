import { useState, useCallback, useEffect } from 'react';
import { fetchPaymentHistory } from '../services/stellar';
import { useWalletContext } from '../context/WalletContext';
import type { PaymentOperation } from '../types';

export function useTransactionHistory() {
  const { publicKey, isConnected } = useWalletContext();
  const [history, setHistory] = useState<PaymentOperation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!publicKey) return;
    setIsLoading(true);
    try {
      const ops = await fetchPaymentHistory(publicKey);
      setHistory(ops);
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  // Auto-fetch when wallet connects
  useEffect(() => {
    if (isConnected && publicKey) {
      refresh();
    } else {
      setHistory([]);
    }
  }, [isConnected, publicKey, refresh]);

  return { history, isLoading, refresh };
}
