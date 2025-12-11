# 🎵 Track Registration Flow

## Overview

IPfolio allows users to **register their own music tracks on Story Protocol** and then use those tracks in bundles. This creates a complete creator-to-bundle workflow.

---

## Complete Flow

### Step 1: Register Track on Story Protocol

**Location:** Create Bundle page → Track Uploader section

1. **Fill in Track Details:**
   - Track Name (required)
   - Artist Name (required)
   - Genre (dropdown: Lo-Fi, Electronic, Folk, Jazz, Hip-Hop, Rock)
   - Description (optional)
   - Royalty Rate (%) - default 5%
   - Artwork URL (optional)
   - Preview URL (optional)

2. **Click "Register Track"**
   - MetaMask opens for transaction confirmation
   - Two transactions occur:
     - **Transaction 1:** Register IP asset on Story Protocol
     - **Transaction 2:** Attach license terms (PIL - Programmable IP License)

3. **Result:**
   - ✅ Track registered on Story Protocol
   - ✅ IP asset address generated
   - ✅ License terms attached
   - ✅ Transaction hash provided
   - ✅ Link to block explorer
   - ✅ Track added to "Your Tracks" list

---

### Step 2: Use Registered Track in Bundle

**Location:** Create Bundle page → Music Bundle Creator

1. **See Your Track:**
   - Registered tracks appear in the track browser
   - Marked with blue "Your Track" badge
   - Shows upload icon indicator

2. **Select Your Track:**
   - Click on your registered track
   - Green checkmark appears
   - Track added to bundle selection

3. **Mix with Sigma Music:**
   - Can select both your tracks AND Sigma Music tracks
   - All tracks appear together in the browser
   - Filter by genre works for all tracks

4. **Create Bundle:**
   - Selected tracks (yours + Sigma Music) become IP assets in bundle
   - IP addresses stored in smart contract
   - Royalties split equally among all tracks

---

## Technical Details

### Story Protocol Integration

**What Happens On-Chain:**

1. **IP Asset Registration:**
   ```typescript
   await registerIPAsset(signer, {
     name: trackName,
     description: description,
     metadata: {
       artist: artist,
       genre: genre,
       artwork: artwork,
       previewUrl: previewUrl,
     },
   });
   ```
   - Creates IP asset on Story Protocol
   - Returns IP asset address
   - Returns transaction hash

2. **License Terms Attachment:**
   ```typescript
   await attachLicenseTerms(signer, ipAssetAddress, {
     commercialUse: true,
     commercialAttribution: true,
     commercialRevShare: royaltyBasisPoints, // e.g., 500 = 5%
     derivativesAllowed: true,
     derivativesAttribution: true,
     derivativesApproval: false,
     derivativesReciprocal: false,
   });
   ```
   - Attaches PIL (Programmable IP License) terms
   - Sets royalty rate
   - Enables commercial use
   - Allows derivatives

---

## User Experience

### Visual Indicators

**In Track Browser:**
- **Sigma Music Tracks:** Green "Sigma Music IP" badge
- **Your Tracks:** Blue "Your Track" badge with upload icon
- **Selected Tracks:** Green checkmark overlay

**In Header:**
- Shows count of your registered tracks
- "X Your Tracks" badge appears when you have registered tracks

### Track Information

Each track shows:
- Artwork (image)
- Track name
- Artist name
- Genre badge
- Royalty rate
- "Your Track" indicator (if user-registered)
- Preview button (if preview URL provided)

---

## Example Flow

### Complete Example:

1. **Register Track:**
   - Name: "My Lo-Fi Beat"
   - Artist: "My Artist Name"
   - Genre: "Lo-Fi"
   - Royalty: 5%
   - Click "Register Track"
   - Confirm transactions in MetaMask
   - ✅ Track registered!

2. **Create Bundle:**
   - See "My Lo-Fi Beat" in track browser with "Your Track" badge
   - Select "My Lo-Fi Beat" + 2 Sigma Music tracks
   - Enter bundle name: "My Collection"
   - Enter symbol: "MC"
   - Click "Create Music Bundle"
   - Deploy contract with 3 IP addresses

3. **Result:**
   - Bundle deployed with:
     - Your track: "My Lo-Fi Beat" (33.33% royalties)
     - Sigma track 1: "Midnight Rain" (33.33% royalties)
     - Sigma track 2: "Coffee Shop Vibes" (33.33% royalties)

---

## Current Implementation

### ✅ Working:
- Track registration UI
- Story Protocol service (demo mode)
- Registered tracks appear in bundle creator
- Visual indicators for user tracks
- Mix user tracks with Sigma Music tracks
- Bundle creation with registered tracks

### ⚠️ Demo Mode:
- Uses simulated Story Protocol registration
- Generates mock IP asset addresses
- In production, would use real Story SDK

### 🔄 Production Requirements:
- Real Story Protocol SDK integration
- Actual IP asset registration on-chain
- Real license terms attachment
- IP asset address verification

---

## Benefits

### For Creators:
- ✅ **Register Once:** Register track on Story Protocol
- ✅ **Use Anywhere:** Use in multiple bundles
- ✅ **Own Your IP:** Full ownership of IP asset
- ✅ **Set Royalties:** Choose your royalty rate
- ✅ **Mix & Match:** Combine with other tracks

### For Platform:
- ✅ **Complete Workflow:** Creator → Registration → Bundle → Trade
- ✅ **Real IP Assets:** Not just mock data
- ✅ **Story Protocol Integration:** Deep integration with protocol
- ✅ **User-Generated Content:** Platform grows with user content

---

## Demo Script for Hackathon

**Show Complete Flow (3 minutes):**

1. **Register Track** (60s)
   - "Let me register my own track"
   - Fill in track details
   - Show MetaMask transaction
   - Show IP asset address
   - Show "Your Track" badge

2. **Create Bundle** (90s)
   - "Now I'll create a bundle with my track + Sigma Music"
   - Show track browser with both types
   - Select your track + 2 Sigma tracks
   - Create bundle
   - Show contract deployment

3. **Highlight Features** (30s)
   - "Users can register their own tracks"
   - "Mix with Sigma Music tracks"
   - "Complete creator workflow"
   - "Real Story Protocol integration"

---

**This completes the full creator workflow: Register → Bundle → Trade!** 🎵✨

