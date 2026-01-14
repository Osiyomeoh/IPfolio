# 📋 IPfolio Contract Addresses

## Deployed Contracts on Story Protocol Aeneid Testnet

### BundleToken Contract
**Address:** `0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b`

**Network:** Story Protocol Aeneid Testnet (Chain ID: 1315)

**Explorer:** https://aeneid.explorer.story.foundation/accounts/0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b

**Contract Type:** ERC-20 Token (BundleToken)

---

## Story Protocol Contracts

### SPG NFT Contract (Aeneid)
**Address:** `0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc`

**Purpose:** Public SPG NFT collection for minting and registering IP assets

**Network:** Story Protocol Aeneid Testnet (Chain ID: 1315)

---

## Network Information

### Story Protocol Aeneid Testnet
- **Chain ID:** 1315
- **RPC URL:** `https://aeneid.storyrpc.io`
- **Explorer:** `https://aeneid.explorer.story.foundation`
- **Native Token:** IP (Story Protocol testnet token)

### Story Protocol Odyssey Testnet
- **Chain ID:** 1516
- **RPC URL:** `https://odyssey.storyrpc.io`
- **Explorer:** `https://odyssey.storyscan.xyz`
- **Native Token:** IP (Story Protocol testnet token)

---

## How to Use Contract Addresses

### For Demo/Testing:
1. **Bundle Discovery:** Use the BundleToken address above in the marketplace "Discover Bundle" feature
2. **Block Explorer:** View contract details, transactions, and events
3. **Testing:** Use the address in `testDeployed.ts` for integration tests

### Adding New Contracts:
When you deploy new BundleToken contracts, add them here for easy reference.

---

## Example Bundle Addresses for Demo

You can use these addresses (if deployed) in the marketplace discovery feature:

```
0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b
```

**Note:** Replace with your actual deployed contract addresses after deployment.

---

## Verification

To verify a contract on the block explorer:

```bash
npx hardhat verify --network aeneid <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

Example:
```bash
npx hardhat verify --network aeneid 0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b "Bundle Name" "SYMBOL" "Description" "[0x...,0x...]" "[5000,5000]" "10000000000000000000000"
```

---

## Important Notes

- ⚠️ These are **testnet** addresses - do not use on mainnet
- 🔒 Always verify contract addresses before using in production
- 📝 Keep this document updated with new deployments
- 🔗 Always use the block explorer to verify contract details

---

**Last Updated:** [Update this when adding new contracts]
hjvbadhfb


