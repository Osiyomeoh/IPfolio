# 🚀 IPfolio Deployment Guide

## Overview
This guide explains how to deploy IPfolio contracts to Story Protocol networks.

---

## 🌐 Deployment Targets

### 1. **Story Odyssey Testnet** (Recommended for Hackathon)
- **Chain ID:** 1516
- **RPC URL:** https://odyssey.storyrpc.io
- **Explorer:** https://odyssey.storyscan.xyz
- **Native Token:** IP (testnet tokens)
- **Status:** ✅ Configured

### 2. **Story Mainnet** (Production)
- **Chain ID:** TBD (when mainnet launches)
- **Status:** ⏳ Pending

### 3. **Local Hardhat Network** (Development)
- **Chain ID:** 31337
- **Status:** ✅ Configured

---

## 📋 Prerequisites

### 1. Environment Setup
Create a `.env` file in the `contracts/` directory:

```bash
# Story Odyssey Testnet
RPC_URL=https://odyssey.storyrpc.io
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_storyscan_api_key_here
```

**⚠️ Security Note:** Never commit your `.env` file or private keys to git!

### 2. Get Testnet Tokens
For Story Odyssey Testnet, you'll need IP tokens for gas:
- **Faucet:** Check Story Protocol Discord/Telegram for testnet faucet
- **Request testnet tokens** for your wallet address

### 3. Get API Key (Optional, for verification)
- Visit Story Explorer: https://odyssey.storyscan.xyz
- Get API key for contract verification

---

## 🚀 Deployment Steps

### Step 1: Compile Contracts
```bash
cd contracts
npm run compile
```

### Step 2: Run Tests (Recommended)
```bash
npm test
```

### Step 3: Deploy to Story Odyssey Testnet
```bash
npm run deploy:testnet
```

Or manually:
```bash
npx hardhat run scripts/deploy.ts --network odyssey
```

### Step 4: Verify Contract (Optional)
```bash
npm run verify
```

Or manually:
```bash
npx hardhat verify --network odyssey <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

---

## 📝 Deployment Script

The deployment script (`scripts/deploy.ts`) will:
1. ✅ Check deployer account balance
2. ✅ Deploy BundleToken contract
3. ✅ Verify deployment
4. ✅ Print deployment information
5. ✅ Provide verification command

### Example Output:
```
🚀 Starting IPfolio deployment...

📝 Deploying contracts with account: 0x...
💰 Account balance: 1.5 ETH

🌐 Network: odyssey (Chain ID: 1516)

📦 Bundle Configuration:
   Name: Demo Bundle
   Symbol: DEMO
   Description: Demo IP bundle for testing
   IP Assets: 2
   Total Supply: 10000.0 tokens

⏳ Deploying BundleToken contract...
✅ BundleToken deployed to: 0x...
🔗 View on explorer: https://odyssey.storyscan.xyz/address/0x...

📊 Deployment Verification:
   Name: Demo Bundle
   Symbol: DEMO
   Owner: 0x...
   Total Supply: 10000.0 tokens

✨ Deployment complete!
```

---

## 🔧 Custom Deployment

### Deploy with Custom Parameters

Edit `scripts/deploy.ts` or create a new script:

```typescript
const bundleName = "My Bundle";
const bundleSymbol = "MB";
const bundleDescription = "My custom bundle";

// Real Story Protocol IP Asset addresses
const ipAssets = [
  "0x...", // IP Asset 1
  "0x...", // IP Asset 2
];

// Royalty shares (must sum to 10000 = 100%)
const royaltyShares = [5000, 5000]; // 50% each

const totalSupply = ethers.parseEther("10000");
```

---

## 📊 Deployment Checklist

Before deploying:

- [ ] ✅ Contracts compiled successfully
- [ ] ✅ All tests passing
- [ ] ✅ `.env` file configured
- [ ] ✅ Testnet tokens in wallet
- [ ] ✅ Private key set in `.env`
- [ ] ✅ Network RPC URL correct
- [ ] ✅ IP Asset addresses ready (for production)

After deploying:

- [ ] ✅ Contract deployed successfully
- [ ] ✅ Contract address saved
- [ ] ✅ Contract verified (optional)
- [ ] ✅ Frontend updated with contract address
- [ ] ✅ Tested on testnet

---

## 🔗 Integration with Frontend

After deployment, update your frontend configuration:

### 1. Update Contract Address
Create/update `frontend/src/config/contracts.ts`:

```typescript
export const CONTRACTS = {
  BUNDLE_TOKEN: {
    ODYSSEY: "0x...", // Your deployed address
  },
};
```

### 2. Update Network Configuration
Already configured in `frontend/src/config/chains.ts`:
- Story Odyssey Testnet (Chain ID: 1516)
- RPC: https://odyssey.storyrpc.io
- Explorer: https://odyssey.storyscan.xyz

---

## 🧪 Testing Deployment

### 1. Verify Contract on Explorer
Visit: https://odyssey.storyscan.xyz/address/YOUR_CONTRACT_ADDRESS

### 2. Test Contract Functions
Use Hardhat console or frontend:
```bash
npx hardhat console --network odyssey
```

### 3. Interact with Contract
```javascript
const BundleToken = await ethers.getContractFactory("BundleToken");
const bundleToken = BundleToken.attach("YOUR_CONTRACT_ADDRESS");

// Check name
await bundleToken.name();

// Check total supply
await bundleToken.totalSupply();

// Get IP assets
await bundleToken.getIPAssets();
```

---

## 🐛 Troubleshooting

### Issue: "Insufficient funds"
**Solution:** Get testnet tokens from faucet

### Issue: "Network not found"
**Solution:** Check `hardhat.config.ts` network configuration

### Issue: "Contract verification failed"
**Solution:** 
- Ensure constructor arguments match exactly
- Check API key is correct
- Wait a few blocks after deployment

### Issue: "Nonce too high"
**Solution:** Reset nonce or wait for pending transactions

---

## 📚 Resources

- **Story Protocol Docs:** https://docs.story.foundation/
- **Story Odyssey Explorer:** https://odyssey.storyscan.xyz
- **Hardhat Docs:** https://hardhat.org/docs
- **Ethers.js Docs:** https://docs.ethers.org/

---

## 🎯 For Hackathon Submission

### Required for Submission:
1. ✅ Contracts deployed to Story Odyssey Testnet
2. ✅ Contract addresses documented
3. ✅ Explorer links provided
4. ✅ Frontend connected to deployed contracts
5. ✅ Demo video showing live deployment

### Recommended:
- ✅ Contracts verified on explorer
- ✅ Test transactions shown
- ✅ Multiple bundles created
- ✅ Trading demonstrated

---

## 🔐 Security Reminders

- ⚠️ **Never commit `.env` files**
- ⚠️ **Never share private keys**
- ⚠️ **Use testnet for development**
- ⚠️ **Verify contracts before mainnet**
- ⚠️ **Test thoroughly before production**

---

## 📞 Support

If you encounter issues:
1. Check Story Protocol Discord
2. Review Hardhat documentation
3. Check contract deployment logs
4. Verify network configuration

---

## ✅ Quick Start

```bash
# 1. Setup environment
cd contracts
cp .env.example .env
# Edit .env with your private key

# 2. Compile
npm run compile

# 3. Test
npm test

# 4. Deploy
npm run deploy:testnet

# 5. Verify (optional)
npm run verify
```

**That's it! Your contracts are deployed to Story Odyssey Testnet! 🎉**

