# 🎵 IPfolio

> The first IP bundling marketplace on Story Protocol. Bundle music tracks, trade fractional ownership, and earn royalties.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=white)](https://soliditylang.org/)

## 📖 Overview

IPfolio is a decentralized platform that enables creators to bundle intellectual property assets (starting with music tracks) into tradeable ERC-20 tokens. Built on Story Protocol's Aeneid testnet, IPfolio allows users to:

- **Register IP Assets**: Upload and register music tracks as IP assets on Story Protocol
- **Create Bundles**: Combine multiple IP assets into fractionalized bundles
- **Trade Tokens**: Buy and sell bundle tokens on the secondary marketplace
- **Earn Royalties**: Automatically receive proportional royalties based on token ownership

## ✨ Features

### Core Functionality
- 🎼 **Music Track Registration**: Register tracks as IP assets on Story Protocol with PIL license terms
- 📦 **Bundle Creation**: Combine multiple tracks into fractionalized ERC-20 tokens
- 💱 **Token Trading**: Buy and sell bundle tokens with real on-chain transfers
- 💰 **Royalty Distribution**: Automatic proportional royalty distribution to token holders
- 🔗 **Blockchain Integration**: Full on-chain deployment on Story Protocol Aeneid testnet

### Bonus Integrations
- 🌍 **World ID Verification**: Human verification to prevent spam and ensure quality
- 🤖 **AI Bundle Assistant**: AI-powered suggestions for optimal bundle creation
- 🎵 **Sigma Music IP**: Integration with real music tracks from indie artists

### User Experience
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 🔔 **Toast Notifications**: Non-blocking notifications for better UX
- 💾 **Persistent Storage**: Bundles persist via blockchain and localStorage
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Wagmi v3** for Ethereum wallet integration
- **Tailwind CSS** for styling
- **Story Protocol SDK** for IP asset registration
- **Ethers.js v6** for contract interactions
- **React Toastify** for notifications
- **Lucide React** for icons

### Smart Contracts
- **Solidity 0.8.23**
- **Hardhat** for development and deployment
- **OpenZeppelin Contracts** for security
- **TypeChain** for TypeScript bindings

### Infrastructure
- **IPFS** (via Pinata) for decentralized file storage
- **Story Protocol** for IP asset management
- **Vercel** for frontend deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- Pinata account (for IPFS storage)
- Story Protocol testnet tokens (for gas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ipfolio.git
   cd ipfolio
   ```

2. **Install dependencies**

   ```bash
   # Install contract dependencies
   cd contracts
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**

   Create `.env` files in both `contracts/` and `frontend/` directories:

   **`contracts/.env`**
   ```env
   AENEID_RPC_URL=https://aeneid.storyrpc.io
   PRIVATE_KEY=your_private_key_here
   ```

   **`frontend/.env`**
   ```env
   REACT_APP_AENEID_RPC_URL=https://aeneid.storyrpc.io
   REACT_APP_PINATA_API_KEY=your_pinata_api_key
   REACT_APP_PINATA_API_SECRET=your_pinata_api_secret
   REACT_APP_PINATA_JWT=your_pinata_jwt
   REACT_APP_PINATA_GATEWAY=https://your-gateway.mypinata.cloud
   REACT_APP_WORLD_ID_APP_ID=your_world_id_app_id
   ```

4. **Compile contracts**
   ```bash
   cd contracts
   npm run compile
   ```

5. **Start the frontend**
   ```bash
   cd frontend
   npm start
   ```

   The app will open at `http://localhost:3000`

## 📁 Project Structure

```
ipfolio/
├── contracts/              # Smart contracts
│   ├── contracts/         # Solidity source files
│   │   └── BundleToken.sol
│   ├── scripts/           # Deployment scripts
│   ├── test/              # Contract tests
│   └── hardhat.config.ts  # Hardhat configuration
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/      # Business logic
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
└── docs/                  # Documentation
```

## 🎯 Usage

### Registering a Track

1. Connect your wallet
2. Navigate to "Create Bundle"
3. Click "Upload Your Track"
4. Fill in track details (name, artist, genre, royalty rate)
5. Upload audio file and artwork
6. Submit to register on Story Protocol

### Creating a Bundle

1. Select tracks from your registered tracks or Sigma Music IP
2. Choose bundle name, symbol, and description
3. Review royalty distribution
4. Deploy bundle contract

### Trading Tokens

1. Go to "Marketplace"
2. Click "Trade" on any bundle
3. Choose Buy or Sell
4. Enter amount and recipient address (for selling)
5. Confirm transaction

## 🔧 Development

### Running Tests

```bash
cd contracts
npm test
```

### Deploying Contracts

```bash
cd contracts
npm run deploy:aeneid
```

### Building Frontend

```bash
cd frontend
npm run build
```

## 🌐 Network Configuration

IPfolio is currently deployed on **Story Protocol Aeneid Testnet**:

- **Chain ID**: 1315
- **RPC URL**: `https://aeneid.storyrpc.io`
- **Explorer**: `https://aeneid.explorer.story.foundation`
- **Native Token**: IP (Story Protocol testnet token)

## 🔐 Security

- Smart contracts use OpenZeppelin's battle-tested libraries
- ReentrancyGuard protection on critical functions
- Comprehensive test coverage
- Access control via Ownable pattern

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Story Protocol](https://www.story.foundation/) for the IP infrastructure
- [OpenZeppelin](https://openzeppelin.com/) for secure contract libraries
- [Pinata](https://www.pinata.cloud/) for IPFS storage
- [Worldcoin](https://worldcoin.org/) for World ID integration

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the Story Protocol ecosystem**

