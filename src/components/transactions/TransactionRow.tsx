import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { shortenAddress, formatTimestamp } from '../../utils/format';
import { getExplorerTxUrl } from '../../utils/constants';
import type { PaymentOperation } from '../../types';

interface TransactionRowProps {
  operation: PaymentOperation;
  currentAddress: string;
}

export function TransactionRow({ operation, currentAddress }: TransactionRowProps) {
  const isSent = operation.from === currentAddress;
  const counterparty = isSent ? operation.to : operation.from;

  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-dark-border/50 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isSent
              ? 'bg-red-500/10 text-red-400'
              : 'bg-success/10 text-success'
          }`}
        >
          {isSent ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownLeft className="w-4 h-4" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            {isSent ? 'Sent' : 'Received'}
            {operation.type === 'create_account' && (
              <span className="text-xs text-slate-500 ml-1.5">(Account Created)</span>
            )}
          </p>
          <p className="text-xs text-slate-500 font-mono">
            {isSent ? 'To: ' : 'From: '}
            {shortenAddress(counterparty)}
          </p>
        </div>
      </div>

      <div className="text-right flex items-center gap-3">
        <div>
          <p
            className={`text-sm font-semibold ${
              isSent ? 'text-red-400' : 'text-success'
            }`}
          >
            {isSent ? '-' : '+'}
            {parseFloat(operation.amount).toFixed(2)} {operation.asset}
          </p>
          <p className="text-[10px] text-slate-600">
            {formatTimestamp(operation.createdAt)}
          </p>
        </div>

        <a
          href={getExplorerTxUrl(operation.transactionHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-accent transition-colors"
          title="View on Stellar Expert"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
