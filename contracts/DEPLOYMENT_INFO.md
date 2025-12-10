# 📋 Deployment Information

## ✅ Current Deployment

**Contract Address:** `0xD1A4AB603d489F6A6D74e7A5E853ad880cB7C24D`

**Network:** Story Aeneid (Chain ID 1315)

**Explorer:** https://aeneid.explorer.story.foundation/address/0xD1A4AB603d489F6A6D74e7A5E853ad880cB7C24D

**Contract Details:**
- Name: Demo Bundle
- Symbol: DEMO
- Total Supply: 10,000 tokens
- Deployer: `0x00224492F572944500AB4eb91E413cfA34770c60`

---

## 🌐 Network Information

### Story Aeneid (Current Deployment)
- **Chain ID:** 1315
- **Explorer:** https://aeneid.explorer.story.foundation
- **RPC:** https://story-testnet-evm.itrocket.net
- **Status:** ✅ Deployed and working

### Story Odyssey Testnet (For Hackathon)
- **Chain ID:** 1516
- **Explorer:** https://odyssey.storyscan.xyz
- **RPC:** Multiple options (see RPC_ENDPOINTS.md)
- **Status:** ⚠️ Need to deploy if hackathon requires this

---

## 🔍 View Your Contract

**Aeneid Explorer:**
https://aeneid.explorer.story.foundation/address/0xD1A4AB603d489F6A6D74e7A5E853ad880cB7C24D

---

## 📝 For Hackathon Submission

**Important:** Check hackathon requirements:
- Does it require **Odyssey (1516)** or **Aeneid (1315)**?
- If Odyssey required, we need to redeploy
- If Aeneid is fine, current deployment works ✅

---

## 🚀 Redeploy to Odyssey (If Needed)

If hackathon requires Odyssey (Chain ID 1516):

1. **Find working RPC endpoint** for chain ID 1516
2. **Update .env:**
   ```bash
   RPC_URL=https://working-odyssey-rpc-endpoint
   ```
3. **Deploy:**
   ```bash
   npm run deploy:testnet
   ```

---

## ✅ Current Status

- ✅ Contract deployed successfully
- ✅ Contract verified on Aeneid network
- ✅ Explorer link working
- ⚠️ Need to confirm hackathon network requirement

