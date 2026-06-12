import { MAX_MEMO_LENGTH } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate a Stellar public key address.
 * Must be 56 characters starting with 'G'.
 */
export function validateAddress(address: string): ValidationResult {
  if (!address || address.trim().length === 0) {
    return { isValid: false, error: 'Recipient address is required' };
  }

  const trimmed = address.trim();

  if (!trimmed.startsWith('G')) {
    return { isValid: false, error: 'Address must start with "G"' };
  }

  if (trimmed.length !== 56) {
    return { isValid: false, error: 'Address must be 56 characters long' };
  }

  // Basic character check (Stellar uses base32)
  if (!/^[A-Z2-7]{56}$/.test(trimmed)) {
    return { isValid: false, error: 'Address contains invalid characters' };
  }

  return { isValid: true };
}

/**
 * Validate an XLM amount.
 */
export function validateAmount(amount: string, balance?: string): ValidationResult {
  if (!amount || amount.trim().length === 0) {
    return { isValid: false, error: 'Amount is required' };
  }

  const num = parseFloat(amount);

  if (isNaN(num)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }

  if (num <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }

  if (num > 999_999_999) {
    return { isValid: false, error: 'Amount is too large' };
  }

  // Check decimal places (Stellar supports 7)
  const parts = amount.split('.');
  if (parts[1] && parts[1].length > 7) {
    return { isValid: false, error: 'Maximum 7 decimal places allowed' };
  }

  // Check against balance (keeping 1 XLM reserve + fees)
  if (balance) {
    const available = parseFloat(balance) - 1.5; // 1 XLM base reserve + buffer
    if (num > available) {
      return {
        isValid: false,
        error: `Insufficient balance. Available: ${Math.max(0, available).toFixed(4)} XLM (1.5 XLM reserved)`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Validate a memo field.
 */
export function validateMemo(memo: string): ValidationResult {
  if (memo.length > MAX_MEMO_LENGTH) {
    return {
      isValid: false,
      error: `Memo must be ${MAX_MEMO_LENGTH} characters or less`,
    };
  }

  return { isValid: true };
}
