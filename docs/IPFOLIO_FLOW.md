# 📋 IPfolio User Flow

## Overview
IPfolio enables creators to bundle multiple IP assets into tradeable ERC-20 tokens, creating "index funds for intellectual property."

---

## 🎯 Core Concept

**The Problem:**
- IP assets are illiquid (hard to sell)
- High barrier to entry (need to buy entire IP)
- High risk (single IP investment)
- No diversification options

**The Solution:**
- Bundle multiple IPs into one token
- Fractional ownership (10,000 tokens = 10,000 shares)
- Tradeable on secondary marketplace
- Automatic royalty distribution
- Lower barrier to entry ($10 vs $1,000+)

---

## 🔄 Complete User Flow

### **Flow 1: Creator Creates a Bundle**

#### Step 1: Register IPs on Story Protocol
```
1. Creator has IP assets (songs, videos, art, code, etc.)
2. Register each IP asset on Story Protocol
   - Each IP gets a unique Story Protocol IP Asset address
   - Attach licensing terms (PIL - Programmable IP License)
   - Set royalty terms
3. Creator now has array of IP Asset addresses
```

#### Step 2: Create Bundle on IPfolio
```
1. Navigate to "Create Bundle" page
2. Fill in bundle details:
   - Name: "Lo-Fi Music Collection"
   - Symbol: "LFM"
   - Description: "5 lo-fi hip hop tracks"
3. Add IP Assets:
   - Select IP Asset addresses from Story Protocol
   - Set royalty shares for each (must sum to 100% = 10,000 basis points)
   - Example:
     * Song 1: 2,000 shares (20%)
     * Song 2: 2,000 shares (20%)
     * Song 3: 2,000 shares (20%)
     * Song 4: 2,000 shares (20%)
     * Song 5: 2,000 shares (20%)
     * Total: 10,000 shares (100%)
4. Set total supply: 10,000 tokens (standard)
5. Pay creation fee: 0.001 ETH
6. Deploy BundleToken contract
```

#### Step 3: Bundle Created
```
✅ BundleToken deployed:
   - ERC-20 token representing fractional ownership
   - 10,000 tokens minted to creator
   - Each token = 0.01% ownership of entire bundle
   - All IP assets linked to bundle
   - Royalty shares configured
```

#### Step 4: List on Marketplace (Optional)
```
1. Creator can immediately list tokens for sale
2. Set price per token (e.g., 0.001 ETH per token)
3. List amount (e.g., 5,000 tokens = 50% of bundle)
4. Pay gas fees
5. Listing created on marketplace
```

---

### **Flow 2: Investor Buys Bundle Tokens**

#### Step 1: Browse Marketplace
```
1. Navigate to "Explore Marketplace"
2. Browse available bundle listings
3. See bundle details:
   - Bundle name, description
   - IP assets included
   - Current price per token
   - Available tokens for sale
   - Total supply
   - Royalty history
```

#### Step 2: Purchase Tokens
```
1. Select bundle listing
2. Enter amount of tokens to buy (e.g., 100 tokens)
3. Review:
   - Total cost: 100 tokens × 0.001 ETH = 0.1 ETH
   - Platform fee: 2.5% = 0.0025 ETH
   - Total: 0.1025 ETH
4. Approve transaction
5. Confirm purchase
```

#### Step 3: Receive Tokens
```
✅ Transaction complete:
   - 100 BundleTokens transferred to investor
   - Investor now owns 1% of entire bundle (100/10,000)
   - Entitled to 1% of all future royalties
   - Can trade tokens anytime
```

---

### **Flow 3: Royalty Distribution**

#### Step 1: Royalties Collected
```
1. IP assets in bundle generate royalties on Story Protocol
2. Royalties flow to Story Protocol
3. Royalties can be sent to BundleToken contract:
   - Direct transfer to contract address
   - Or via Story Protocol integration
```

#### Step 2: Automatic Distribution
```
1. Royalties received by BundleToken contract
2. Contract calculates royalties per token:
   royaltiesPerToken = (totalRoyalties × 1e18) / totalSupply
3. Updates global royaltiesPerToken counter
4. Emits RoyaltiesDistributed event
```

#### Step 3: Token Holders Claim
```
1. Any token holder can call claimRoyalties()
2. Contract calculates their share:
   claimable = (balance × unclaimedRoyaltiesPerToken) / 1e18
3. Transfers ETH to holder
4. Updates their royaltiesClaimedPerToken
5. Emits RoyaltiesClaimed event
```

**Example:**
```
Bundle: 10,000 tokens
Royalties received: 1 ETH
Royalties per token: 1 ETH / 10,000 = 0.0001 ETH per token

Investor has 100 tokens:
Claimable: 100 × 0.0001 = 0.01 ETH
```

---

### **Flow 4: Secondary Market Trading**

#### Step 1: List Tokens for Sale
```
1. Token holder navigates to "My Bundles"
2. Selects bundle they own
3. Clicks "List for Sale"
4. Enters:
   - Amount: 50 tokens
   - Price per token: 0.0015 ETH
5. Approve marketplace to spend tokens
6. Create listing
```

#### Step 2: Buyer Purchases
```
1. Buyer sees listing on marketplace
2. Clicks "Buy"
3. Enters amount: 50 tokens
4. Total: 50 × 0.0015 = 0.075 ETH
5. Platform fee: 2.5% = 0.001875 ETH
6. Total: 0.076875 ETH
7. Confirm purchase
```

#### Step 3: Settlement
```
✅ Transaction complete:
   - 50 tokens transferred to buyer
   - 0.075 ETH transferred to seller
   - 0.001875 ETH (2.5%) to platform
   - Listing removed/updated
```

---

## 📊 Technical Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CREATOR FLOW                              │
└─────────────────────────────────────────────────────────────┘

1. Register IPs on Story Protocol
   └─> Get IP Asset addresses
   
2. Create Bundle on IPfolio
   ├─> Enter bundle metadata (name, symbol, description)
   ├─> Add IP Asset addresses
   ├─> Set royalty shares (must sum to 10,000)
   ├─> Set total supply (typically 10,000)
   └─> Deploy BundleToken contract
       └─> Creator receives all tokens

3. (Optional) List on Marketplace
   ├─> Set price per token
   ├─> Set amount to list
   └─> Create listing


┌─────────────────────────────────────────────────────────────┐
│                    INVESTOR FLOW                            │
└─────────────────────────────────────────────────────────────┘

1. Browse Marketplace
   └─> View available bundles

2. Purchase Tokens
   ├─> Select bundle listing
   ├─> Enter amount
   └─> Execute purchase
       └─> Receive BundleTokens

3. Hold & Earn
   ├─> Receive royalties automatically
   └─> Claim when ready


┌─────────────────────────────────────────────────────────────┐
│                 ROYALTY FLOW                                 │
└─────────────────────────────────────────────────────────────┘

1. IP Assets Generate Royalties
   └─> Story Protocol collects royalties

2. Royalties Sent to BundleToken
   └─> distributeRoyalties() called
       └─> Updates royaltiesPerToken

3. Token Holders Claim
   └─> claimRoyalties() called
       └─> ETH transferred to holder


┌─────────────────────────────────────────────────────────────┐
│              SECONDARY MARKET FLOW                           │
└─────────────────────────────────────────────────────────────┘

1. List Tokens
   ├─> Approve marketplace
   └─> Create listing

2. Buyer Purchases
   ├─> Execute buy transaction
   └─> Settlement:
       ├─> Tokens to buyer
       ├─> ETH to seller
       └─> Fee to platform (2.5%)
```

---

## 🔑 Key Components

### 1. BundleToken Contract
**Purpose:** ERC-20 token representing fractional ownership

**Key Functions:**
- `constructor()` - Creates bundle with IP assets
- `distributeRoyalties()` - Receives and distributes royalties
- `claimRoyalties()` - Allows holders to claim their share
- `getClaimableRoyalties()` - View function for claimable amount
- `getIPAssets()` - Returns array of IP assets

**Key Properties:**
- `ipAssets[]` - Array of Story Protocol IP Asset addresses
- `royaltyShares` - Mapping of IP asset to royalty share (basis points)
- `royaltiesPerToken` - Global counter for royalties per token
- `royaltiesClaimedPerToken` - Per-user tracking of claimed royalties

### 2. Marketplace Contract (To Be Built)
**Purpose:** Secondary market for trading bundle tokens

**Key Functions:**
- `list()` - Create listing for bundle tokens
- `buy()` - Purchase tokens from listing
- `cancel()` - Cancel own listing
- `getListings()` - View all active listings

**Key Properties:**
- `listings[]` - Array of active listings
- `platformFee` - 2.5% fee on all trades

### 3. Frontend Application
**Purpose:** User interface for all operations

**Key Pages:**
- Landing page
- Create Bundle
- Marketplace
- My Bundles
- Bundle Details

---

## 💡 Example Scenario

### Creator: Music Producer "LoFiBeats"

**Step 1: Register IPs**
```
Registers 5 songs on Story Protocol:
- Song 1: 0x1234... (20% royalty share)
- Song 2: 0x5678... (20% royalty share)
- Song 3: 0x9abc... (20% royalty share)
- Song 4: 0xdef0... (20% royalty share)
- Song 5: 0x2468... (20% royalty share)
```

**Step 2: Create Bundle**
```
Bundle: "LoFi Beats Collection"
Symbol: "LFB"
Supply: 10,000 tokens
Creator receives: 10,000 LFB tokens (100% ownership)
```

**Step 3: List on Marketplace**
```
Lists 5,000 tokens at 0.001 ETH per token
Total value: 5 ETH
```

**Step 4: Investors Buy**
```
Investor A buys: 1,000 tokens (10% ownership) = 1 ETH
Investor B buys: 500 tokens (5% ownership) = 0.5 ETH
Investor C buys: 2,000 tokens (20% ownership) = 2 ETH
...
Total sold: 5,000 tokens = 5 ETH to creator
```

**Step 5: Royalties Flow**
```
Songs generate 2 ETH in royalties
Royalties per token: 2 ETH / 10,000 = 0.0002 ETH

Investor A (1,000 tokens): Claims 0.2 ETH
Investor B (500 tokens): Claims 0.1 ETH
Investor C (2,000 tokens): Claims 0.4 ETH
Creator (remaining 6,500 tokens): Claims 1.3 ETH
```

**Step 6: Secondary Trading**
```
Investor A lists 200 tokens at 0.0015 ETH/token
Investor D buys: 200 tokens = 0.3 ETH
Platform fee: 0.0075 ETH (2.5%)
Investor A receives: 0.2925 ETH
```

---

## 🎯 User Personas

### 1. Creator
**Goal:** Monetize IP assets, get upfront capital
**Flow:** Register IPs → Create Bundle → List → Get Paid

### 2. Investor
**Goal:** Invest in IP with diversification
**Flow:** Browse → Buy Tokens → Hold → Claim Royalties

### 3. Trader
**Goal:** Trade bundle tokens for profit
**Flow:** Buy → Hold → Sell at higher price

---

## 🔐 Security & Trust

### On-Chain Guarantees
- ✅ IP assets registered on Story Protocol (immutable)
- ✅ BundleToken contract (verified, auditable)
- ✅ Royalty distribution (automatic, transparent)
- ✅ Ownership tracked on-chain (ERC-20 standard)

### Platform Features
- ✅ Story Protocol integration (industry standard)
- ✅ OpenZeppelin contracts (battle-tested)
- ✅ ReentrancyGuard (security)
- ✅ Access control (Ownable)

---

## 📈 Value Propositions

### For Creators
- ✅ Instant liquidity (sell tokens immediately)
- ✅ Upfront capital (don't wait for royalties)
- ✅ Retain ownership (still own tokens)
- ✅ Ongoing revenue (from platform fees)

### For Investors
- ✅ Low barrier to entry ($10 vs $1,000+)
- ✅ Diversification (multiple IPs in one token)
- ✅ Liquidity (trade anytime)
- ✅ Automatic royalties (no manual claiming needed)

### For Platform
- ✅ Creation fees (0.001 ETH per bundle)
- ✅ Trading fees (2.5% on all trades)
- ✅ Network effects (more bundles = more trades)

---

## 🚀 Future Enhancements

1. **AI Bundle Assistant** - AI suggests optimal IP combinations
2. **World ID Verification** - Human verification for creators
3. **Embedded Wallets** - Email/social login (no MetaMask)
4. **Analytics Dashboard** - Track bundle performance
5. **DeFi Integration** - Stake bundle tokens for yield
6. **DAO Governance** - Token holders vote on bundle decisions

---

## 📝 Summary

**IPfolio Flow in 3 Steps:**

1. **Create** - Bundle IPs into tradeable tokens
2. **Trade** - Buy/sell tokens on marketplace
3. **Earn** - Automatic royalty distribution

**Key Innovation:**
- First platform to bundle multiple IPs into single tradeable token
- Like ETFs for intellectual property
- Enables fractional ownership and diversification
- Creates liquid market for IP assets

