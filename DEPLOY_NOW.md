# 🚀 Quick Deploy to Story Buildathon Network

## ⚡ Fast Track Deployment

### Step 1: Setup Environment (2 minutes)

```bash
cd contracts
```

Create `.env` file:
```bash
RPC_URL=https://odyssey.storyrpc.io
PRIVATE_KEY=your_private_key_here
```

**Get your private key:**
- MetaMask: Settings → Security & Privacy → Show Private Key
- Remove `0x` prefix if present

### Step 2: Get Testnet Tokens (5 minutes)

1. Join Story Protocol Discord/Telegram
2. Go to faucet channel
3. Request tokens: `!faucet YOUR_WALLET_ADDRESS`
4. Wait for tokens (usually instant)

### Step 3: Deploy (1 minute)

```bash
npm run deploy:testnet
```

**That's it!** Your contract is deployed to Story Odyssey Testnet (Chain ID: 1516)

---

## 📋 What You'll Get

After deployment, you'll see:

```
✅ BundleToken deployed to: 0x...
🔗 View on explorer: https://odyssey.storyscan.xyz/address/0x...
```

**Save the contract address!** You'll need it for:
- Frontend integration
- Hackathon submission
- Demo video

---

## 🔗 Network Info

- **Network:** Story Odyssey Testnet
- **Chain ID:** 1516
- **RPC:** https://odyssey.storyrpc.io
- **Explorer:** https://odyssey.storyscan.xyz
- **Token:** IP (testnet)

---

## ✅ Verify It Worked

1. Check explorer: https://odyssey.storyscan.xyz/address/YOUR_ADDRESS
2. You should see your contract deployed
3. Frontend is already configured for this network

---

## 🆘 Need Help?

- Check `docs/HACKATHON_DEPLOYMENT.md` for detailed guide
- Story Protocol Discord for testnet tokens
- Check deployment logs for errors

**Ready? Let's deploy! 🚀**

