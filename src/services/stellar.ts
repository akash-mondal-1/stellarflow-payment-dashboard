import * as StellarSdk from '@stellar/stellar-sdk';
import { HORIZON_URL, HISTORY_LIMIT } from '../utils/constants';
import type { TransactionRecord, PaymentOperation } from '../types';

// ─── Horizon Server Instance ────────────────────────────────────────────────────
const server = new StellarSdk.Horizon.Server(HORIZON_URL);

/**
 * Load a Stellar account from Horizon.
 * Returns null if the account is not found (unfunded).
 */
export async function loadAccount(
  publicKey: string
): Promise<StellarSdk.Horizon.AccountResponse | null> {
  try {
    return await server.loadAccount(publicKey);
  } catch (error: unknown) {
    if (
      error instanceof StellarSdk.NotFoundError ||
      (error as { response?: { status?: number } })?.response?.status === 404
    ) {
      return null;
    }
    throw error;
  }
}

/**
 * Fetch the native (XLM) balance for an account.
 * Returns null if account doesn't exist.
 */
export async function fetchBalance(publicKey: string): Promise<string | null> {
  const account = await loadAccount(publicKey);
  if (!account) return null;

  const nativeBalance = account.balances.find(
    (b) => b.asset_type === 'native'
  );
  return nativeBalance ? nativeBalance.balance : '0';
}

/**
 * Check if an account exists on the network.
 */
export async function accountExists(publicKey: string): Promise<boolean> {
  const account = await loadAccount(publicKey);
  return account !== null;
}

/**
 * Fetch recent transactions for an account.
 */
export async function fetchTransactionHistory(
  publicKey: string,
  limit = HISTORY_LIMIT
): Promise<TransactionRecord[]> {
  try {
    const response = await server
      .transactions()
      .forAccount(publicKey)
      .limit(limit)
      .order('desc')
      .call();

    return response.records.map((tx) => ({
      id: tx.id,
      hash: tx.hash,
      createdAt: tx.created_at,
      sourceAccount: tx.source_account,
      fee: String(tx.fee_charged),
      operationCount: tx.operation_count,
      memo: tx.memo_type !== 'none' ? tx.memo : undefined,
      successful: tx.successful,
    }));
  } catch {
    return [];
  }
}

/**
 * Fetch recent payment operations for an account.
 */
export async function fetchPaymentHistory(
  publicKey: string,
  limit = HISTORY_LIMIT
): Promise<PaymentOperation[]> {
  try {
    const response = await server
      .payments()
      .forAccount(publicKey)
      .limit(limit)
      .order('desc')
      .call();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.records as any[])
      .filter(
        (op) => op.type === 'payment' || op.type === 'create_account'
      )
      .map((op) => {
        if (op.type === 'payment') {
          return {
            id: op.id,
            type: op.type,
            from: op.from,
            to: op.to,
            amount: op.amount,
            asset: op.asset_type === 'native' ? 'XLM' : op.asset_code || 'Unknown',
            createdAt: op.created_at,
            transactionHash: op.transaction_hash,
            successful: op.transaction_successful,
          };
        } else {
          return {
            id: op.id,
            type: 'create_account',
            from: op.funder,
            to: op.account,
            amount: op.starting_balance,
            asset: 'XLM',
            createdAt: op.created_at,
            transactionHash: op.transaction_hash,
            successful: op.transaction_successful,
          };
        }
      });
  } catch {
    return [];
  }
}

/**
 * Get the Horizon server instance (for transaction building).
 */
export function getServer(): StellarSdk.Horizon.Server {
  return server;
}
