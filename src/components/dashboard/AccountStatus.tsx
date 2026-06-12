import { ShieldCheck, ShieldX } from 'lucide-react';
import { useWalletContext } from '../../context/WalletContext';

export function AccountStatus() {
  const { isConnected, accountExists } = useWalletContext();

  if (!isConnected) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
        accountExists
          ? 'bg-success/10 text-success border border-success/20'
          : 'bg-warning/10 text-warning border border-warning/20'
      }`}
    >
      {accountExists ? (
        <>
          <ShieldCheck className="w-3.5 h-3.5" />
          Account Active
        </>
      ) : (
        <>
          <ShieldX className="w-3.5 h-3.5" />
          Account Not Found
        </>
      )}
    </div>
  );
}
