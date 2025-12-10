# Contract Integration Guide

## Overview

IPfolio now uses **real contract deployment** when creating bundles. Each bundle is deployed as a `BundleToken` smart contract on Story Aeneid testnet.

## How It Works

### 1. Bundle Creation Flow

When a user creates a bundle:

1. **User selects tracks** from Sigma Music IP
2. **Enters bundle details** (name, symbol, description)
3. **Clicks "Create Music Bundle"**
4. **Contract deployment happens:**
   - Frontend converts selected tracks to IP asset addresses
   - Calculates royalty shares (equal distribution)
   - Uses wagmi to get wallet signer
   - Deploys `BundleToken` contract with:
     - Name, symbol, description
     - IP asset addresses array
     - Royalty shares array (basis points)
     - Total supply (default: 10,000 tokens)

### 2. Contract Deployment

**Location:** `frontend/src/services/contractService.ts`

**Key Function:**
```typescript
deployBundleToken(signer, config): Promise<{ address, txHash }>
```

**What it does:**
- Loads BundleToken ABI and bytecode from artifacts
- Creates contract factory
- Deploys contract with bundle configuration
- Returns contract address and transaction hash

### 3. Track Integration

**How tracks are added:**
- Each track has an `ipAssetAddress` (from `sigmaMusicIPs.ts`)
- These addresses are passed as the `ipAssets` array to the contract
- Royalty shares are calculated automatically (equal distribution)
- Example: 5 tracks = 2000 basis points each (20%)

### 4. Contract Address Storage

After deployment:
- Contract address is stored in bundle object
- Displayed in marketplace
- Link to block explorer provided
- Transaction hash shown in success message

## Technical Details

### Contract Constructor Parameters

```solidity
constructor(
    string memory name_,
    string memory symbol_,
    string memory description_,
    address[] memory ipAssets_,
    uint256[] memory shares_,
    uint256 totalSupply_
)
```

### Example Deployment

```typescript
const config = {
  name: "Lo-Fi Study Beats",
  symbol: "LFSB",
  description: "A relaxing collection of lo-fi music",
  ipAssets: [
    "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    // ... more tracks
  ],
  shares: [3333, 3333, 3334], // For 3 tracks
  totalSupply: "10000"
};

const result = await deployBundleToken(signer, config);
// Returns: { address: "0x...", txHash: "0x..." }
```

### Royalty Share Calculation

**Function:** `calculateRoyaltyShares(trackCount)`

- Divides 10,000 basis points (100%) equally among tracks
- Handles remainder if not evenly divisible
- Example: 3 tracks = [3333, 3333, 3334]

## User Experience

### During Deployment

1. **Loading State:**
   - Shows "Deploying bundle contract to blockchain..."
   - Spinner animation
   - Message: "Please confirm the transaction in your wallet"

2. **Wallet Interaction:**
   - MetaMask (or other wallet) opens
   - User confirms transaction
   - Pays gas fees in IP tokens

3. **Success:**
   - Alert shows contract address and transaction hash
   - Link to block explorer
   - Redirects to marketplace

### In Marketplace

- **Deployed bundles show:**
  - ✓ Deployed badge
  - Contract address (full address)
  - "View on Explorer" button
  - Link to Story Aeneid explorer

## Testing

### Prerequisites

1. **MetaMask installed** with Story Aeneid testnet
2. **Testnet IP tokens** for gas fees
3. **Network configured:**
   - Chain ID: 1315
   - RPC: https://aeneid.storyrpc.io
   - Explorer: https://aeneid.explorer.story.foundation

### Test Flow

1. Connect wallet
2. Create bundle with tracks
3. Confirm transaction in MetaMask
4. Wait for deployment
5. Verify contract address in success message
6. Check marketplace for deployed bundle
7. Click "View on Explorer" to see on blockchain

## Current Implementation Status

✅ **Working:**
- Real contract deployment
- Transaction signing via wallet
- Contract address storage
- Marketplace display
- Block explorer links

⚠️ **Note:**
- Tracks use mock IP asset addresses (from `sigmaMusicIPs.ts`)
- In production, these would be real Story Protocol IP asset addresses
- Total supply is fixed at 10,000 tokens (can be made configurable)

## Future Enhancements

1. **Real IP Asset Integration:**
   - Connect to Story Protocol SDK
   - Register/fetch real IP assets
   - Use actual IP asset addresses

2. **Custom Total Supply:**
   - Allow users to set total supply
   - Validate supply amount

3. **Gas Estimation:**
   - Show estimated gas before deployment
   - Warn if gas is too high

4. **Deployment Status:**
   - Show transaction status
   - Poll for confirmation
   - Handle deployment failures gracefully

## Contract Interaction Summary

**What happens when you create a bundle:**

1. ✅ Real smart contract deployed to blockchain
2. ✅ Contract address stored and displayed
3. ✅ Transaction hash provided
4. ✅ Link to block explorer
5. ✅ Bundle appears in marketplace with contract info

**This is real blockchain interaction - not a simulation!**

