<div align="center">

# ✨ StellarFlow

### Modern Payments on Stellar Testnet

[![Stellar](https://img.shields.io/badge/Stellar-Testnet-7C3AED?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

A startup-grade fintech dashboard for the **Stellar White Belt Challenge**. Connect your Freighter wallet, check balances, send XLM payments, and track transactions — all on the Stellar Testnet.

[🚀 Live Demo](#) · [📖 Documentation](#features) · [🐛 Report Bug](../../issues)

</div>

---

## ✅ Challenge Requirements

| Requirement | Status |
|:---|:---:|
| Use Stellar Testnet | ✅ |
| Connect Freighter Wallet | ✅ |
| Disconnect Wallet | ✅ |
| Fetch Wallet Balance | ✅ |
| Display XLM Balance | ✅ |
| Send XLM Transactions | ✅ |
| Show Success/Failure Feedback | ✅ |
| Display Transaction Hash | ✅ |
| Deployed Publicly | ✅ |
| Public GitHub Repository | ✅ |
| README Included | ✅ |
| Screenshots Included | ✅ |

---

## 🎯 Features

### Core
- 🔗 **Wallet Connection** — Connect/disconnect Freighter with status indicators
- 💰 **Balance Dashboard** — Live XLM balance with animated counter
- 💸 **Send Payments** — Full-featured payment form with validation
- 📋 **Transaction Feedback** — Animated success/failure modals with hash display

### Bonus
- 📱 **QR Code Generator** — Generate QR codes for your wallet address
- 📋 **Copy Address** — One-click copy to clipboard
- 🌙 **Dark Theme** — Beautiful dark fintech design
- 📜 **Transaction History** — Recent payment activity from Horizon
- 🔍 **Stellar Explorer** — Direct links to Stellar Expert
- ✨ **Animated Modals** — Spring-animated success/failure feedback
- 📐 **Responsive Layout** — Mobile-first responsive design

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                    Frontend                      │
│    React + TypeScript + Vite + Tailwind CSS      │
├─────────────────────────────────────────────────┤
│  Components → Hooks → Services → External APIs   │
├──────────────┬──────────────┬───────────────────┤
│  Freighter   │   Horizon    │  Stellar Expert   │
│  Wallet API  │  Testnet API │    Explorer       │
└──────────────┴──────────────┴───────────────────┘
```

### Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | React 19 + TypeScript 5.7 |
| **Build** | Vite 6 |
| **Styling** | Tailwind CSS 3 |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Blockchain** | @stellar/stellar-sdk |
| **Wallet** | @stellar/freighter-api |
| **QR Code** | qrcode.react |
| **Notifications** | Sonner |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/      # Balance card, account status, stats
│   ├── layout/         # Header, footer, main layout
│   ├── payment/        # Send payment form
│   ├── shared/         # Reusable UI components
│   ├── transactions/   # History, row, result modal
│   ├── ui/             # Animated counter
│   └── wallet/         # Connect button, wallet info, network badge
├── context/            # React Context for wallet state
├── hooks/              # Custom React hooks
├── services/           # Stellar SDK & Freighter wrappers
├── types/              # TypeScript interfaces
└── utils/              # Constants, formatters, validators
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Freighter Wallet](https://freighter.app/) browser extension
- Switch Freighter to **Testnet** mode

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/StellarFlow.git
cd StellarFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Fund Your Test Account

1. Copy your wallet address from the app
2. Visit [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
3. Use Friendbot to fund your testnet account with 10,000 XLM

---

## 📸 Screenshots

> Add your screenshots here after deployment:

| Screen | Description |
|:---|:---|
| **Hero Page** | Landing page before wallet connection |
| **Dashboard** | Connected wallet with balance and stats |
| **Send Payment** | Payment form with validation |
| **Success Modal** | Animated transaction success feedback |
| **Transaction History** | Recent payment activity |
| **QR Code** | Wallet address QR code modal |
| **Mobile View** | Responsive mobile layout |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Set Framework Preset to **Vite**
5. Deploy!

No environment variables are required — the app uses the public Stellar Testnet.

### Environment Variables (Optional)

```env
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
```

---

## 🔒 Security

- **No private keys handled** — all signing happens inside Freighter extension
- **Testnet only** — hardcoded network passphrase prevents mainnet transactions
- **Input validation** — all user inputs validated before transaction building
- **No sensitive storage** — no secrets in localStorage or cookies

---

## 🗺️ Future Roadmap

- [ ] Multi-asset support (custom tokens)
- [ ] Address book for frequent recipients
- [ ] Transaction notifications
- [ ] Soroban smart contract integration
- [ ] Multi-wallet support (xBull, Lobstr)
- [ ] Payment request links
- [ ] Export transaction history (CSV)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for the **Stellar Ecosystem**

[![Stellar](https://img.shields.io/badge/Powered_by-Stellar-7C3AED?style=flat&logo=stellar)](https://stellar.org)

</div>
