// ─── Wallet State ───────────────────────────────────────────────────────────────
export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string | null;
  isLoadingBalance: boolean;
  network: 'TESTNET';
  accountExists: boolean;
}

export interface WalletActions {
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}

export type WalletContextType = WalletState & WalletActions;

// ─── Transaction Types ──────────────────────────────────────────────────────────
export interface SendPaymentParams {
  destination: string;
  amount: string;
  memo?: string;
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  timestamp?: string;
  error?: string;
}

export type TransactionStatus = 'idle' | 'building' | 'signing' | 'submitting' | 'success' | 'error';

// ─── Transaction History ────────────────────────────────────────────────────────
export interface TransactionRecord {
  id: string;
  hash: string;
  createdAt: string;
  sourceAccount: string;
  fee: string;
  operationCount: number;
  memo?: string;
  successful: boolean;
}

export interface PaymentOperation {
  id: string;
  type: string;
  from: string;
  to: string;
  amount: string;
  asset: string;
  createdAt: string;
  transactionHash: string;
  successful: boolean;
}

// ─── UI Types ───────────────────────────────────────────────────────────────────
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToastType {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
