import {
  isConnected as freighterIsConnected,
  setAllowed,
  getAddress,
  signTransaction,
} from '@stellar/freighter-api';

/**
 * Check if Freighter extension is installed and available.
 */
export async function checkFreighterInstalled(): Promise<boolean> {
  try {
    const result = await freighterIsConnected();
    return result.isConnected;
  } catch {
    return false;
  }
}

/**
 * Request access and get the user's public key from Freighter.
 */
export async function connectFreighter(): Promise<string> {
  // Check if Freighter is installed
  const installed = await checkFreighterInstalled();
  if (!installed) {
    throw new Error(
      'Freighter wallet is not installed. Please install it from freighter.app'
    );
  }

  // Request access
  const { isAllowed } = await setAllowed();
  if (!isAllowed) {
    throw new Error('Connection to Freighter was rejected by the user.');
  }

  // Get public key
  const addressResult = await getAddress();

  if (addressResult.error) {
    throw new Error(addressResult.error);
  }

  return addressResult.address;
}

/**
 * Sign a transaction XDR using Freighter.
 */
export async function signTransactionXDR(xdr: string): Promise<string> {
  try {
    const result = await signTransaction(xdr, {
      networkPassphrase: 'Test SDF Network ; September 2015',
    });

    if (result.error) {
      throw new Error(result.error);
    }

    return result.signedTxXdr;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes('User declined') ||
        error.message.includes('rejected')
      ) {
        throw new Error('Transaction was rejected by the user.');
      }
      throw error;
    }
    throw new Error('Failed to sign transaction with Freighter.');
  }
}
