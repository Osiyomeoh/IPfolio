# 📱 IPfolio User Flow

## 🎯 Complete User Journey

### **1. Landing Page (Home)**
- User arrives at IPfolio homepage
- Sees hero section: "Index Funds for Intellectual Property"
- Views features: One-Click Bundling, Auto Royalties, Diversified Risk, Liquid Market
- Sees bonus challenge integrations (Sigma Music, World ID, AI Assistant)
- Can navigate to:
  - **Create Bundle** → Goes to bundle creation flow
  - **Explore Marketplace** → Views existing bundles
  - **How It Works** → Documentation page

---

### **2. Create Bundle Flow**

#### **Step 1: Connect Wallet**
- User clicks "Create Bundle" from navbar or homepage
- If wallet not connected:
  - Sees message: "Connect Your Wallet"
  - Clicks "Connect Wallet" button in navbar
  - Connects MetaMask or browser wallet
  - Wallet address appears in navbar

#### **Step 2: World ID Verification** (Required)
- After wallet connection, sees World ID verification component
- Clicks "Verify with World ID" button
- Simulated verification process (2 seconds)
- Gets verified status: "Verified Human" badge
- **Note:** In production, this would:
  - Open World ID modal
  - User scans QR code with World App
  - Verifies proof on-chain
  - Returns verification result

#### **Step 3: AI Bundle Assistant** (Optional)
- User can describe bundle idea: "I want a lo-fi music collection for studying"
- Clicks "Generate Bundle Suggestion"
- AI suggests:
  - Bundle name (e.g., "Lo-Fi Study Beats Collection")
  - Symbol (e.g., "LFSB")
  - Description
  - Track selection (5 matching tracks)
- User can click "Use This Suggestion" to auto-fill form

#### **Step 4: Music Bundle Creation**
- **Option A: Use Template**
  - Click "Use Pre-configured Template"
  - Choose from templates:
    - "Lo-Fi Study Beats" (3 tracks)
    - "Electronic Dance Mix" (4 tracks)
    - "Acoustic Folk Collection" (3 tracks)
  - Template auto-fills: name, symbol, description, tracks

- **Option B: Custom Bundle**
  - Enter Bundle Name (e.g., "My Music Collection")
  - Enter Bundle Symbol (e.g., "MMC", max 10 chars)
  - Enter Description
  - Filter tracks by genre (All, Lo-Fi, Electronic, Folk)
  - Browse available Sigma Music IP tracks:
    - See track artwork, name, artist, genre
    - Click track to select/deselect
    - Selected tracks show green checkmark
    - Preview tracks with play button
  - Selected tracks summary shows:
    - Number of tracks selected
    - Royalty split percentage per track

#### **Step 5: Deploy Bundle**
- User clicks "Create Music Bundle" button
- Validates:
  - Bundle name filled
  - Bundle symbol filled
  - At least 1 track selected
- **In Production:**
  - Calls `deployBundleToken()` function
  - Deploys BundleToken contract to Story Aeneid
  - Passes: name, symbol, description, IP asset addresses, shares, total supply
  - User approves transaction in wallet
  - Contract deployed, receives contract address
- **Current Demo:**
  - Shows success alert
  - Adds bundle to marketplace
  - Redirects to marketplace view

---

### **3. Marketplace View**

#### **Viewing Bundles**
- User navigates to "Marketplace" from navbar
- Sees grid of created bundles:
  - Bundle card shows:
    - Icon/artwork
    - Bundle name
    - Symbol
    - Description
    - Number of tracks
    - "View Details" button

#### **If No Bundles**
- Shows empty state:
  - Music icon
  - "No bundles created yet"
  - "Create Your First Bundle" button

#### **Bundle Details** (Future)
- Click "View Details" to see:
  - Full track list
  - Royalty information
  - Trading history
  - Current holders
  - Buy/Sell options

---

### **4. Additional Pages**

#### **How It Works**
- Accessible from footer or direct navigation
- Shows:
  - What is IPfolio?
  - 4-step getting started guide
  - Key features with icons
  - Bonus challenge integrations
  - Built on Story Protocol section
  - Contact information

#### **Privacy Policy**
- Full privacy policy page
- Sections: Information Collection, Usage, Blockchain Transparency, Data Security, User Rights
- Back button to return home

#### **Terms of Service**
- Full terms of service page
- Sections: Agreement, Platform Description, User Responsibilities, IP Rights, Transactions, Disclaimers
- Back button to return home

---

## 🔄 Complete User Journey Example

### **Scenario: Creating a Lo-Fi Music Bundle**

1. **Landing** → User visits IPfolio homepage
2. **Navigate** → Clicks "Create Bundle" button
3. **Connect** → Connects MetaMask wallet
4. **Verify** → Completes World ID verification (2 seconds)
5. **AI Help** → Uses AI Assistant: "lo-fi music for studying"
   - AI suggests: "Lo-Fi Study Beats Collection" with 5 tracks
   - Clicks "Use This Suggestion"
6. **Customize** → Reviews and adjusts:
   - Name: "Lo-Fi Study Beats Collection"
   - Symbol: "LFSB"
   - Description: Auto-filled
   - Tracks: 5 tracks selected
7. **Create** → Clicks "Create Music Bundle"
8. **Success** → Bundle created, redirected to marketplace
9. **View** → Sees bundle in marketplace grid
10. **Trade** → (Future) Can list bundle tokens for sale

---

## 🎨 UI/UX Features

### **Navigation**
- **Navbar:** Always visible, sticky at top
  - Logo (IPfolio)
  - Navigation links (Home, Create Bundle, Marketplace)
  - Theme toggle (Light/Dark mode)
  - Wallet connect button
  - Mobile hamburger menu

### **Theme System**
- Light mode (default)
- Dark mode (toggle in navbar)
- Persists preference in localStorage
- Smooth transitions between themes

### **Responsive Design**
- **Mobile:** Single column, hamburger menu
- **Tablet:** 2 columns
- **Desktop:** Full navigation, 3-4 columns

### **Footer**
- Brand information
- Product links (Create, Marketplace, How It Works)
- Resources (Documentation, Story Protocol, Support)
- Social media links
- Legal links (Privacy, Terms)
- All links functional

---

## 🔗 Integration Points

### **Story Protocol**
- IP assets registered on Story Protocol
- Royalties flow from Story Protocol
- Bundle tokens represent fractional ownership
- Contracts deployed on Story Aeneid testnet

### **Sigma Music IP**
- Real music tracks from indie artists
- IP asset addresses from Story Protocol
- Track metadata (name, artist, genre, artwork)
- Preview URLs for tracks

### **World ID**
- Human verification required for bundle creation
- Prevents spam and ensures quality
- Simulated for demo (2-second delay)

### **ABV.dev (GenAI)**
- AI-powered bundle suggestions
- Generates name, symbol, description
- Suggests track selection based on prompt
- Simulated for demo

---

## 📊 Data Flow

### **Bundle Creation**
```
User Input → Form Validation → Contract Deployment → Story Protocol → BundleToken Contract
```

### **Royalty Distribution**
```
Story Protocol → distributeRoyalties() → BundleToken Contract → claimRoyalties() → Token Holders
```

### **Marketplace Trading**
```
List Bundle → Buy/Sell → Transfer Tokens → Update Ownership → Royalty Rights Transfer
```

---

## 🎯 Key User Actions

1. **Connect Wallet** - One-time setup
2. **Verify Identity** - World ID verification (required)
3. **Create Bundle** - Select tracks, name, deploy
4. **View Marketplace** - Browse existing bundles
5. **Trade Tokens** - Buy/sell bundle tokens (future)

---

## 🚀 Future Enhancements

- Full contract integration (currently simulated)
- Real World ID SDK integration
- Real ABV.dev API integration
- Trading functionality (buy/sell)
- Royalty claiming UI
- Bundle analytics dashboard
- User portfolio view
- Transaction history

