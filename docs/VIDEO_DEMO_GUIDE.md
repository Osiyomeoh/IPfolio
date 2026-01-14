# 🎬 IPfolio Video Demo Guide

A comprehensive guide for creating an engaging video demonstration of the IPfolio platform.

## 📋 Pre-Demo Checklist

- [ ] Testnet tokens (IP) in wallet for gas fees
- [ ] Wallet connected (MetaMask or similar)
- [ ] Pinata API keys configured (for IPFS uploads)
- [ ] World ID app configured (optional, for verification)
- [ ] At least one bundle contract address ready (for discovery demo)
  - Example: `0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b` (see CONTRACT_ADDRESSES.md)
- [ ] Screen recording software ready
- [ ] Clear audio/microphone setup

## 🎯 Demo Structure (5-7 minutes)

### 1. Introduction (30 seconds)
**What to show:**
- Landing page with hero section
- Key value propositions visible
- Clean, modern UI

**What to say:**
> "Welcome to IPfolio, the first IP bundling marketplace on Story Protocol. IPfolio allows creators to bundle intellectual property assets - starting with music tracks - into fractionalized, tradeable tokens. Let me show you how it works."

---

### 2. Track Registration (1-2 minutes)
**What to show:**
- Navigate to "Create Bundle"
- Click "Upload Your Track"
- Fill in track details:
  - Track name
  - Artist name
  - Genre selection
  - Royalty rate
- Upload audio file
- Upload artwork
- Submit and show transaction
- Wait for IP asset registration confirmation

**What to say:**
> "First, let's register a music track as an IP asset on Story Protocol. I'll upload a track, add metadata, and set royalty terms. The track will be stored on IPFS and registered on-chain as an IP asset with PIL license terms."

**Key points to highlight:**
- Real blockchain registration (not simulated)
- IPFS storage for files
- Story Protocol IP asset creation
- License terms attached

---

### 3. Bundle Creation (1-2 minutes)
**What to show:**
- Select tracks (your registered track + Sigma Music IP tracks)
- Show track selection interface
- Fill in bundle details:
  - Bundle name
  - Symbol
  - Description
- Review royalty distribution
- Deploy bundle contract
- Show transaction hash
- Show contract address
- Navigate to block explorer

**What to say:**
> "Now I'll create a bundle by combining multiple tracks. I can select from my registered tracks or use tracks from Sigma Music IP. The bundle will be deployed as an ERC-20 token, with each track receiving proportional royalty shares."

**Key points to highlight:**
- Multiple IP assets bundled together
- ERC-20 token deployment
- Automatic royalty distribution calculation
- On-chain contract deployment
- Verifiable on block explorer

---

### 4. Marketplace Discovery (1 minute)
**What to show:**
- Navigate to Marketplace
- Show empty state (if in incognito)
- Use "Discover Bundle" feature
- Enter a bundle contract address (e.g., `0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b`)
- Show bundle loading from blockchain
- Display bundle card with on-chain data

**What to say:**
> "The marketplace loads all bundle data directly from the blockchain. Even in a fresh browser session, I can discover any bundle by entering its contract address. All data - name, symbol, description, IP assets - comes directly from on-chain contracts."

**Key points to highlight:**
- Blockchain-first data loading
- No localStorage dependency
- Works in incognito mode
- Real on-chain data display

**Contract Address for Demo:**
- Use: `0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b` (see CONTRACT_ADDRESSES.md for more)

---

### 5. Token Trading (1-2 minutes)
**What to show:**
- Click "Trade" on a bundle
- Show trading interface
- Demonstrate "Sell" functionality:
  - Enter amount
  - Enter recipient address (your testnet account)
  - Show quick amount buttons (25%, 50%, 75%, Max)
  - Execute transfer transaction
  - Show transaction confirmation
- Switch to other account to show tokens received
- Show balance update

**What to say:**
> "Now let's trade bundle tokens. I'll sell some tokens to another testnet account. This uses real ERC-20 transfers on-chain. After the transaction confirms, I can log in with that account and see the tokens in my wallet."

**Key points to highlight:**
- Real ERC-20 token transfers
- On-chain transactions
- Quick amount selection
- Cross-account token ownership
- Balance updates

---

### 6. Bonus Features (30 seconds - 1 minute)
**What to show:**
- World ID verification (if configured)
- AI Bundle Assistant
- Dark mode toggle
- Responsive design (if recording on mobile)

**What to say:**
> "IPfolio also includes World ID verification for human verification, an AI-powered bundle assistant for suggestions, and a beautiful dark mode. The platform is fully responsive and works on all devices."

---

### 7. Closing (30 seconds)
**What to show:**
- Marketplace overview
- Summary of what was demonstrated
- Call to action

**What to say:**
> "IPfolio demonstrates the future of IP asset management - combining Story Protocol's IP infrastructure with fractionalized ownership, real trading, and automatic royalty distribution. All built on-chain, fully decentralized, and ready for creators."

---

## 🎥 Recording Tips

### Technical Setup
- **Resolution**: Record in 1080p or higher
- **Frame Rate**: 30fps minimum, 60fps preferred
- **Audio**: Use a good microphone, minimize background noise
- **Browser**: Use Chrome or Brave with MetaMask extension
- **Window Size**: Record at 1920x1080 or similar standard size

### Presentation Tips
- **Pace**: Speak clearly, don't rush
- **Pauses**: Pause briefly after key actions (transactions, loading)
- **Highlighting**: Use cursor movements to draw attention
- **Zoom**: Zoom in on important UI elements if needed
- **Errors**: If something fails, show how the error handling works

### What to Avoid
- ❌ Long loading waits (edit them out or speed up)
- ❌ Fumbling with wallet connections (practice first)
- ❌ Reading code or technical details (focus on UX)
- ❌ Apologizing for bugs (just show it working)
- ❌ Too much text on screen (keep it visual)

---

## 🎬 Key Moments to Capture

### High-Impact Shots:
1. **Transaction Confirmations**: Show MetaMask popup and transaction hash
2. **Block Explorer**: Navigate to contract on Story Explorer
3. **Real Transfers**: Show tokens moving between accounts
4. **IPFS Uploads**: Show file upload progress
5. **Bundle Discovery**: Show bundle loading from blockchain

### Smooth Transitions:
- Fade between sections
- Zoom in on important elements
- Highlight key UI components
- Show loading states (briefly)

---

## 📝 Script Template

### Opening
> "Hi, I'm [Your Name], and today I'm demonstrating IPfolio - the first IP bundling marketplace on Story Protocol. IPfolio lets creators bundle music tracks into fractionalized tokens that can be traded on a secondary marketplace."

### Track Registration
> "Let's start by registering a music track. I'll upload the audio file, add metadata, and set royalty terms. This creates an IP asset on Story Protocol with PIL license terms attached."

### Bundle Creation
> "Now I'll create a bundle by combining multiple tracks. Each track gets proportional royalty shares, and the bundle is deployed as an ERC-20 token on-chain."

### Marketplace
> "The marketplace loads all data directly from the blockchain. I can discover any bundle by entering its contract address, and all information comes from on-chain contracts."

### Trading
> "Let's trade some tokens. I'll transfer tokens to another account, and you can see this is a real on-chain ERC-20 transfer."

### Closing
> "IPfolio demonstrates the future of IP asset management - fully on-chain, decentralized, and ready for creators. Thanks for watching!"

---

## 🔧 Troubleshooting During Demo

### If a transaction fails:
- "Let me try that again" (retry)
- Show error message briefly
- Explain what went wrong if relevant

### If something loads slowly:
- "The blockchain is processing this transaction..."
- "This is loading data directly from the contract..."
- Edit out long waits in post-production

### If wallet disconnects:
- "Let me reconnect my wallet..."
- Practice wallet connection beforehand

---

## 📊 Demo Metrics to Highlight

- **On-Chain**: All data from blockchain
- **Decentralized**: IPFS storage, no central server
- **Real Trading**: Actual ERC-20 transfers
- **Automatic Royalties**: Proportional distribution
- **Story Protocol**: Built on IP infrastructure

---

## 🎯 Target Audience

- **Hackathon Judges**: Focus on technical implementation
- **Developers**: Show code quality and architecture
- **Creators**: Emphasize ease of use and value
- **Investors**: Highlight market potential

---

## ✅ Post-Production Checklist

- [ ] Add title card with IPfolio logo
- [ ] Add captions/subtitles for key points
- [ ] Add background music (subtle, royalty-free)
- [ ] Add transitions between sections
- [ ] Add call-to-action at end
- [ ] Include links in description:
  - GitHub repository
  - Live demo URL
  - Story Protocol explorer
- [ ] Add timestamps in description
- [ ] Optimize video for YouTube/Vimeo
- [ ] Create thumbnail with key visual

---

## 📹 Recommended Video Structure

```
[0:00-0:30]  Introduction & Overview
[0:30-2:30]  Track Registration
[2:30-4:30]  Bundle Creation
[4:30-5:30]  Marketplace Discovery
[5:30-7:00]  Token Trading
[7:00-7:30]  Bonus Features
[7:30-8:00]  Closing & Call to Action
```

**Total: ~8 minutes** (can be edited to 5-7 minutes)

---

## 🎨 Visual Elements to Include

- IPfolio logo/branding
- Story Protocol branding
- Transaction hashes (highlighted)
- Contract addresses (formatted nicely)
- Loading animations (brief)
- Success confirmations
- Error states (if showing error handling)

---

## 💡 Pro Tips

1. **Practice First**: Do a full dry run before recording
2. **Multiple Takes**: Record each section separately, edit together
3. **Show, Don't Tell**: Let the UI speak for itself
4. **Energy**: Keep enthusiasm high throughout
5. **Clarity**: Explain technical terms simply
6. **Pacing**: Don't rush, but keep it moving
7. **Polish**: Edit out mistakes, add smooth transitions

---

## 📚 Additional Resources

- Story Protocol Documentation
- Block Explorer URLs
- **Contract Addresses:** See `docs/CONTRACT_ADDRESSES.md` for deployed contract addresses
- Testnet faucet links (if needed)

### Quick Contract Address Reference:
- **BundleToken (Aeneid):** `0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b`
- **SPG NFT Contract:** `0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc`
- **Explorer:** https://aeneid.explorer.story.foundation

---

**Good luck with your demo! 🚀**

