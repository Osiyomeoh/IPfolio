# 🏆 Story Buildathon Deployment Guide

## 🎯 Hackathon Network: Story Protocol

For the **Story Buildathon**, you need to deploy to **Story Protocol's network**.

---

## 🌐 Network Configuration

### **Story Odyssey Testnet** (For Hackathon)
- **Chain ID:** `1516`
- **Network Name:** `odyssey`
- **RPC URL:** `https://odyssey.storyrpc.io`
- **Explorer:** `https://odyssey.storyscan.xyz`
- **Native Token:** `IP` (testnet tokens)
- **Status:** ✅ **READY FOR DEPLOYMENT**

---

## 🚀 Quick Deployment Steps

### Step 1: Setup Environment

Create `.env` file in `contracts/` directory:

```bash
cd contracts
```

Create `.env`:
```bash
# Story Odyssey Testnet (Hackathon Network)
RPC_URL=https://odyssey.storyrpc.io
PRIVATE_KEY=your_private_key_without_0x
ETHERSCAN_API_KEY=optional_for_verification
```

**⚠️ Important:**
- Get your private key from MetaMask or your wallet
- Remove `0x` prefix if present
- Never commit `.env` to git!

### Step 2: Get Testnet Tokens

You need IP tokens for gas fees:

1. **Join Story Protocol Discord/Telegram**
2. **Request testnet tokens** in the faucet channel
3. **Provide your wallet address**
4. **Wait for tokens** (usually instant)

**Faucet Links:**
- Check Story Protocol official channels
- Discord: Story Protocol server
- Telegram: Story Protocol group

### Step 3: Compile Contracts

```bash
cd contracts
npm run compile
```

### Step 4: Run Tests (Verify Everything Works)

```bash
npm test
```

**Expected:** All tests should pass ✅

### Step 5: Deploy to Story Odyssey Testnet

```bash
npm run deploy:testnet
```

Or manually:
```bash
npx hardhat run scripts/deploy.ts --network odyssey
```

### Step 6: Save Deployment Info

The script will output:
- Contract address
- Explorer link
- Deployment details

**Save this information!** You'll need it for:
- Frontend integration
- Hackathon submission
- Demo video

---

## 📋 Deployment Checklist

Before deploying:

- [ ] ✅ `.env` file created with `PRIVATE_KEY`
- [ ] ✅ Testnet tokens received in wallet
- [ ] ✅ Contracts compiled successfully
- [ ] ✅ All tests passing
- [ ] ✅ Network configured correctly

After deploying:

- [ ] ✅ Contract deployed successfully
- [ ] ✅ Contract address saved
- [ ] ✅ Explorer link verified
- [ ] ✅ Frontend updated with contract address
- [ ] ✅ Tested contract interaction

---

## 🔍 Verify Deployment

### 1. Check on Explorer

Visit: `https://odyssey.storyscan.xyz/address/YOUR_CONTRACT_ADDRESS`

You should see:
- Contract code
- Transactions
- Contract state

### 2. Verify Contract (Optional but Recommended)

```bash
npm run verify
```

Or:
```bash
npx hardhat verify --network odyssey <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

**Note:** Constructor args from deployment output

### 3. Test Contract Functions

Use Hardhat console:
```bash
npx hardhat console --network odyssey
```

Then:
```javascript
const BundleToken = await ethers.getContractFactory("BundleToken");
const bundleToken = BundleToken.attach("YOUR_CONTRACT_ADDRESS");

// Test functions
await bundleToken.name();
await bundleToken.totalSupply();
await bundleToken.getIPAssets();
```

---

## 🔗 Frontend Integration

After deployment, update frontend:

### 1. Update Contract Address

Create `frontend/src/config/contracts.ts`:

```typescript
export const CONTRACTS = {
  BUNDLE_TOKEN: {
    ODYSSEY: "0x...", // Your deployed address
  },
};
```

### 2. Network Already Configured ✅

The frontend already has Story Odyssey configured in:
- `frontend/src/config/chains.ts`
- Chain ID: 1516
- RPC: https://odyssey.storyrpc.io

### 3. Update Wagmi Config

In `frontend/src/config/wagmi.ts`, ensure Story Odyssey is included.

---

## 📝 For Hackathon Submission

### Required Information:

1. **Contract Addresses**
   ```
   BundleToken: 0x...
   ```

2. **Explorer Links**
   ```
   https://odyssey.storyscan.xyz/address/0x...
   ```

3. **Network Details**
   ```
   Network: Story Odyssey Testnet
   Chain ID: 1516
   ```

4. **Deployment Transaction Hash**
   ```
   From deployment output
   ```

### Recommended:

- ✅ Contracts verified on explorer
- ✅ Demo video showing deployment
- ✅ Live contract interactions
- ✅ Multiple bundles created
- ✅ Trading demonstrated

---

## 🐛 Troubleshooting

### "Insufficient funds for gas"
**Solution:** Get testnet tokens from faucet

### "Network not found"
**Solution:** Check `hardhat.config.ts` - odyssey network should be configured

### "Nonce too high"
**Solution:** Wait for pending transactions or reset nonce

### "Contract verification failed"
**Solution:** 
- Ensure constructor args match exactly
- Wait a few blocks after deployment
- Check API key is correct

### "RPC error"
**Solution:**
- Check RPC URL: `https://odyssey.storyrpc.io`
- Try again (network might be busy)
- Check Story Protocol status

---

## 🎯 Deployment Script Output

When you run `npm run deploy:testnet`, you'll see:

```
🚀 Starting IPfolio deployment...

📝 Deploying contracts with account: 0x...
💰 Account balance: 1.5 IP

🌐 Network: odyssey (Chain ID: 1516)

📦 Bundle Configuration:
   Name: Demo Bundle
   Symbol: DEMO
   ...

⏳ Deploying BundleToken contract...
✅ BundleToken deployed to: 0x...
🔗 View on explorer: https://odyssey.storyscan.xyz/address/0x...

✨ Deployment complete!
```

**Save the contract address!**

---

## 📞 Getting Help

If you encounter issues:

1. **Story Protocol Discord** - Ask in hackathon channel
2. **Check Hardhat logs** - Look for error messages
3. **Verify network status** - Check if testnet is operational
4. **Review deployment script** - Ensure all parameters correct

---

## ✅ Final Checklist

Before submitting to hackathon:

- [ ] ✅ Contracts deployed to Story Odyssey Testnet
- [ ] ✅ Contract addresses documented
- [ ] ✅ Explorer links working
- [ ] ✅ Frontend connected to contracts
- [ ] ✅ Demo video recorded
- [ ] ✅ Contracts verified (optional but recommended)
- [ ] ✅ Test transactions completed
- [ ] ✅ All documentation complete

---

## 🚀 Ready to Deploy?

```bash
# 1. Setup
cd contracts
# Create .env with PRIVATE_KEY

# 2. Get testnet tokens (from faucet)

# 3. Compile
npm run compile

# 4. Test
npm test

# 5. Deploy
npm run deploy:testnet

# 6. Save contract address!

# 7. Update frontend with contract address

# 8. Test everything works

# 9. Record demo video

# 10. Submit to hackathon! 🎉
```

**Good luck with the Story Buildathon! 🏆**

