import * as StellarSdk from '@stellar/stellar-sdk';
import { getServer, loadAccount } from './stellar';
import { signTransactionXDR } from './freighter';
import {
  NETWORK_PASSPHRASE,
  BASE_FEE,
  TRANSACTION_TIMEOUT,
} from '../utils/constants';
import type { SendPaymentParams, TransactionResult } from '../types';

/**
 * Build, sign (via Freighter), and submit a payment transaction.
 */
export async function sendPayment(
  senderPublicKey: string,
  params: SendPaymentParams
): Promise<TransactionResult> {
  const server = getServer();

  // 1. Load sender account
  const senderAccount = await loadAccount(senderPublicKey);
  if (!senderAccount) {
    return {
      success: false,
      error: 'Sender account not found on the network. Please fund it first.',
    };
  }

  // 2. Check if destination account exists
  const destExists = await loadAccount(params.destination);

  // 3. Build transaction
  const builder = new StellarSdk.TransactionBuilder(senderAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  if (destExists) {
    // Normal payment to existing account
    builder.addOperation(
      StellarSdk.Operation.payment({
        destination: params.destination,
        asset: StellarSdk.Asset.native(),
        amount: parseFloat(params.amount).toFixed(7),
      })
    );
  } else {
    // Create account for new addresses
    builder.addOperation(
      StellarSdk.Operation.createAccount({
        destination: params.destination,
        startingBalance: parseFloat(params.amount).toFixed(7),
      })
    );
  }

  // Add memo if provided
  if (params.memo && params.memo.trim().length > 0) {
    builder.addMemo(StellarSdk.Memo.text(params.memo.trim()));
  }

  const transaction = builder.setTimeout(TRANSACTION_TIMEOUT).build();

  // 4. Sign with Freighter
  const xdr = transaction.toXDR();
  const signedXDR = await signTransactionXDR(xdr);

  // 5. Reconstruct and submit
  const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
    signedXDR,
    NETWORK_PASSPHRASE
  );

  try {
    const result = await server.submitTransaction(
      signedTransaction as StellarSdk.Transaction
    );
    return {
      success: true,
      hash: result.hash,
      timestamp: new Date().toISOString(),
    };
  } catch (error: unknown) {
    const submitError = error as {
      response?: {
        data?: {
          extras?: {
            result_codes?: {
              transaction?: string;
              operations?: string[];
            };
          };
        };
      };
    };

    const resultCodes =
      submitError?.response?.data?.extras?.result_codes;

    let errorMessage = 'Transaction submission failed.';

    if (resultCodes?.operations) {
      const opErrors = resultCodes.operations;
      if (opErrors.includes('op_underfunded')) {
        errorMessage = 'Insufficient balance to complete this transaction.';
      } else if (opErrors.includes('op_no_destination')) {
        errorMessage =
          'Destination account does not exist. Minimum 1 XLM required to create it.';
      } else {
        errorMessage = `Transaction failed: ${opErrors.join(', ')}`;
      }
    } else if (resultCodes?.transaction) {
      errorMessage = `Transaction failed: ${resultCodes.transaction}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
