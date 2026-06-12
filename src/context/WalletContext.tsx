import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { connectFreighter, checkFreighterInstalled } from '../services/freighter';
import { fetchBalance, accountExists as checkAccountExists } from '../services/stellar';
import type { WalletContextType } from '../types';

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [accountExists, setAccountExists] = useState(false);

  const refreshBalance = useCallback(async () => {
    if (!publicKey) return;
    setIsLoadingBalance(true);
    try {
      const bal = await fetchBalance(publicKey);
      setBalance(bal);
      const exists = await checkAccountExists(publicKey);
      setAccountExists(exists);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
      setAccountExists(false);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [publicKey]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const address = await connectFreighter();
      setPublicKey(address);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setIsConnected(false);
    setBalance(null);
    setAccountExists(false);
  }, []);

  // Auto-fetch balance when connected
  useEffect(() => {
    if (isConnected && publicKey) {
      refreshBalance();
    }
  }, [isConnected, publicKey, refreshBalance]);

  // Try to reconnect on mount if Freighter was previously connected
  useEffect(() => {
    const tryReconnect = async () => {
      try {
        const installed = await checkFreighterInstalled();
        if (installed) {
          // Attempt silent reconnect
          const address = await connectFreighter();
          setPublicKey(address);
          setIsConnected(true);
        }
      } catch {
        // Silent fail — user hasn't approved yet
      }
    };
    tryReconnect();
  }, []);

  const value: WalletContextType = {
    publicKey,
    isConnected,
    isConnecting,
    balance,
    isLoadingBalance,
    network: 'TESTNET',
    accountExists,
    connect,
    disconnect,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWalletContext(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}
