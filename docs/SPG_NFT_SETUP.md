# 🎨 SPG NFT Contract Setup

## Overview

Story Protocol requires an SPG (Story Protocol Governance) NFT contract to mint NFTs for IP asset registration. This guide explains how to configure it.

## Quick Setup

### Option 1: Use Environment Variable (Recommended)

Add to your `.env` file in the `frontend` directory:

```bash
REACT_APP_SPG_NFT_CONTRACT_AENEID=0x... # SPG NFT contract address for Aeneid testnet
REACT_APP_SPG_NFT_CONTRACT_ODYSSEY=0x... # SPG NFT contract address for Odyssey testnet
```

### Option 2: Find Default SPG NFT Contract

1. **Check Story Protocol Documentation:**
   - Visit [Story Protocol Docs](https://docs.story.foundation)
   - Look for "SPG NFT Contract" or "Testnet Contracts"
   - Find the contract address for your testnet (Aeneid or Odyssey)

2. **Check Story Protocol GitHub:**
   - Visit [Story Protocol GitHub](https://github.com/storyprotocol)
   - Look for deployment addresses or contract addresses

3. **Use Story Protocol Explorer:**
   - Visit the block explorer for your testnet
   - Search for "SPG" or "NFT" contracts
   - Aeneid: https://aeneid.explorer.story.foundation
   - Odyssey: https://odyssey.storyscan.xyz

## How It Works

When you register a music track:

1. **If NFT contract/token ID provided:** Uses existing NFT registration
2. **If not provided:** Uses mint-and-register workflow
   - Mints a new NFT using SPG NFT contract
   - Registers it as an IP asset
   - Attaches PIL license terms
   - All in one blockchain transaction

## Current Implementation

The code will:
- Check for SPG NFT contract in environment variables
- Use mint-and-register workflow if no NFT is provided
- Throw clear error if SPG NFT contract is not configured

## For Hackathon Demo

If you don't have an SPG NFT contract address:

1. **Ask Story Protocol team** for the testnet SPG NFT contract address
2. **Use a placeholder** (will fail with clear error message)
3. **Deploy your own SPG NFT contract** (advanced, not recommended for demo)

## Example Error

If SPG NFT contract is not configured, you'll see:

```
SPG NFT contract not configured. Please set REACT_APP_SPG_NFT_CONTRACT_AENEID environment variable.

For Story Protocol testnets, you can find SPG NFT contract addresses in the Story Protocol documentation.
```

## Next Steps

1. Get SPG NFT contract address from Story Protocol
2. Add to `.env` file
3. Restart dev server
4. Try registering a track again

---

**Note:** The mint-and-register workflow creates real blockchain transactions and requires gas fees.

