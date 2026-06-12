import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { shortenAddress } from '../../utils/format';

interface QRCodeDisplayProps {
  address: string;
}

export function QRCodeDisplay({ address }: QRCodeDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200"
        title="Show QR Code"
      >
        <QrCode className="w-3.5 h-3.5" />
        <span>QR Code</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-card p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Wallet QR Code
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-xl">
                  <QRCodeSVG
                    value={address}
                    size={200}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#0F172A"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Scan to get address</p>
                <p className="text-xs font-mono text-slate-300 break-all px-2">
                  {shortenAddress(address, 12, 12)}
                </p>
                <div className="flex justify-center">
                  <CopyButton text={address} label="Copy Full Address" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
