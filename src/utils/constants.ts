// ─── Network Configuration ─────────────────────────────────────────────────────
export const HORIZON_URL = 'https://horizon-testnet.stellar.org';
export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
export const NETWORK_NAME = 'TESTNET' as const;
export const FRIENDBOT_URL = 'https://friendbot.stellar.org';

// ─── Stellar Explorer ──────────────────────────────────────────────────────────
export const STELLAR_EXPERT_BASE = 'https://stellar.expert/explorer/testnet';
export const getExplorerTxUrl = (hash: string) =>
  `${STELLAR_EXPERT_BASE}/tx/${hash}`;
export const getExplorerAccountUrl = (address: string) =>
  `${STELLAR_EXPERT_BASE}/account/${address}`;

// ─── Transaction Defaults ───────────────────────────────────────────────────────
export const BASE_FEE = '100'; // stroops
export const TRANSACTION_TIMEOUT = 30; // seconds
export const MAX_MEMO_LENGTH = 28;

// ─── UI Constants ───────────────────────────────────────────────────────────────
export const BALANCE_POLL_INTERVAL = 30_000; // 30 seconds
export const HISTORY_LIMIT = 10;
export const ADDRESS_TRUNCATE_START = 6;
export const ADDRESS_TRUNCATE_END = 6;
