# 🌐 Story Odyssey Testnet RPC Endpoints

## Primary Endpoint (Updated)
```
https://story-odyssey-rpc.auranode.xyz
```

## Alternative Endpoints

If the primary endpoint is blocked or slow, try these alternatives:

### Option 1
```
https://lightnode-json-rpc-story.grandvalleys.com
```

### Option 2
```
https://odyssey-evm.spidernode.net
```

### Option 3
```
https://story-rpc-evm-odyssey.mandragora.io
```

### Option 4
```
https://evm-rpc-story.josephtran.xyz
```

### Option 5
```
https://story.evm.t.stavr.tech
```

### Option 6
```
https://story-testnet-jsonrpc.blockhub.id
```

### Option 7
```
https://story-testnet-evm.itrocket.net
```

### Option 8
```
https://story-rpc-evm.validatorvn.com
```

### Option 9
```
https://rpc-storyevm-testnet.aldebaranode.xyz
```

### Option 10
```
https://rpc-evm-story.rawaki.xyz
```

### Option 11
```
https://evm-rpc.story.testnet.dteam.tech
```

---

## How to Use

### Method 1: Update .env file
```bash
RPC_URL=https://story-odyssey-rpc.auranode.xyz
```

### Method 2: Use alternative network in Hardhat
```bash
# Deploy using alternative endpoint
npx hardhat run scripts/deploy.ts --network odyssey_alt1
npx hardhat run scripts/deploy.ts --network odyssey_alt2
npx hardhat run scripts/deploy.ts --network odyssey_alt3
```

### Method 3: Update hardhat.config.ts directly
Change the `url` in the `odyssey` network configuration.

---

## Testing Endpoints

To test which endpoint works:

```bash
# Test primary
curl -X POST https://story-odyssey-rpc.auranode.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'

# Should return: {"jsonrpc":"2.0","id":1,"result":"0x5ec"} (1516 in hex)
```

---

## Current Configuration

The hardhat config now uses:
- **Primary:** `https://story-odyssey-rpc.auranode.xyz`
- **Alternatives:** Configured as `odyssey_alt1`, `odyssey_alt2`, `odyssey_alt3`

You can deploy with:
```bash
npm run deploy:testnet  # Uses primary
# OR
npx hardhat run scripts/deploy.ts --network odyssey_alt1  # Uses alternative
```

