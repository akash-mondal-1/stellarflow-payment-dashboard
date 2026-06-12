import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Layout } from './components/layout/Layout';
import { WalletInfo } from './components/wallet/WalletInfo';
import { BalanceCard } from './components/dashboard/BalanceCard';
import { QuickStats } from './components/dashboard/QuickStats';
import { SendPaymentForm } from './components/payment/SendPaymentForm';
import { TransactionHistory } from './components/transactions/TransactionHistory';
import { useWalletContext } from './context/WalletContext';
import { Sparkles, Wallet, Shield, Zap } from 'lucide-react';

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 sm:py-24"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-glow-lg"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
        Welcome to{' '}
        <span className="text-gradient">StellarFlow</span>
      </h2>
      <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto">
        Modern payments on the Stellar Testnet. Connect your Freighter wallet to
        get started.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          {
            icon: <Wallet className="w-5 h-5" />,
            title: 'Connect Wallet',
            desc: 'Link your Freighter wallet',
          },
          {
            icon: <Zap className="w-5 h-5" />,
            title: 'Send Payments',
            desc: 'Transfer XLM instantly',
          },
          {
            icon: <Shield className="w-5 h-5" />,
            title: 'Secure & Fast',
            desc: 'Built on Stellar protocol',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-card p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top row: Wallet Info + Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletInfo />
        <BalanceCard />
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main content: Send Payment + Transaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SendPaymentForm />
        <TransactionHistory />
      </div>
    </div>
  );
}

function App() {
  const { isConnected } = useWalletContext();

  return (
    <>
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            backdropFilter: 'blur(16px)',
            color: '#F8FAFC',
          },
        }}
      />
      <Layout>
        {isConnected ? <Dashboard /> : <HeroSection />}
      </Layout>
    </>
  );
}

export default App;
