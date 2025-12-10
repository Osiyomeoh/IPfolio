# 🧪 IPfolio User Flow Testing Guide

## Quick Access
- **Frontend URL:** http://localhost:3000
- **Status:** ✅ Running (check terminal for compilation status)

---

## Complete User Flow Test Checklist

### **Phase 1: Landing Page** ✅

1. **Open Browser**
   - Navigate to: `http://localhost:3000`
   - ✅ Should see: Hero section with "Index Funds for Intellectual Property"
   - ✅ Should see: Navbar with logo, navigation links, theme toggle, wallet connect
   - ✅ Should see: Footer with links

2. **Test Navigation**
   - Click "Home" → Should stay on home page
   - Click "Create Bundle" → Should navigate to create page
   - Click "Marketplace" → Should navigate to marketplace
   - ✅ All navigation should work

3. **Test Theme Toggle**
   - Click theme toggle (sun/moon icon)
   - ✅ Should switch between light and dark mode
   - ✅ Theme should persist on page refresh

4. **Test Footer Links**
   - Click "How It Works" → Should navigate to How It Works page
   - Click "Privacy Policy" → Should navigate to Privacy Policy page
   - Click "Terms of Service" → Should navigate to Terms of Service page
   - ✅ All footer links should work

---

### **Phase 2: Wallet Connection** 🔌

1. **Connect Wallet**
   - Click "Connect Wallet" button in navbar
   - ✅ Should open MetaMask (or browser wallet)
   - ✅ Should prompt to connect account
   - ✅ After connection, should show wallet address in navbar

2. **Verify Connection State**
   - ✅ Wallet address should appear in navbar (e.g., "0x1234...5678")
   - ✅ "Connect Wallet" button should change to show address + "Disconnect"

---

### **Phase 3: Create Bundle Flow** 🎵

#### **Step 1: Navigate to Create Page**
- Click "Create Bundle" from navbar or homepage
- ✅ Should navigate to create page

#### **Step 2: Wallet Check**
- If wallet NOT connected:
  - ✅ Should see message: "Connect Your Wallet"
  - ✅ Should see instruction to connect wallet in navbar
- If wallet IS connected:
  - ✅ Should see World ID Verification component
  - ✅ Should see AI Bundle Assistant component
  - ✅ Should see Music Bundle Creator (if verified) OR yellow warning (if not verified)

#### **Step 3: World ID Verification** 🛡️
- Click "Verify with World ID" button
- ✅ Should show "Verifying..." state (2 seconds)
- ✅ Should show "Verified Human" badge after verification
- ✅ Music Bundle Creator should appear after verification

#### **Step 4: AI Bundle Assistant** (Optional) 🤖
- Enter prompt: "I want a lo-fi music collection for studying"
- Click "Generate Bundle Suggestion"
- ✅ Should show loading state
- ✅ Should generate suggestion with:
  - Bundle name
  - Symbol
  - Description
  - Track selection
- Click "Use This Suggestion"
- ✅ Should show alert with suggestion details

#### **Step 5: Music Bundle Creation** 🎶

**Option A: Use Template**
- Click "Use Pre-configured Template"
- ✅ Should show 3 template options:
  - "Lo-Fi Study Beats"
  - "Electronic Dance Mix"
  - "Acoustic Folk Collection"
- Click on a template
- ✅ Should auto-fill:
  - Bundle name
  - Symbol
  - Description
  - Selected tracks

**Option B: Custom Bundle**
- Enter Bundle Name: "My Test Bundle"
- Enter Bundle Symbol: "MTB"
- Enter Description: "A test bundle for demonstration"
- ✅ All fields should accept input

**Track Selection:**
- Filter by genre: Click "Lo-Fi", "Electronic", "Folk", or "All"
- ✅ Should filter tracks by genre
- Click on tracks to select/deselect
- ✅ Selected tracks should show green checkmark
- ✅ Selected tracks summary should update
- ✅ Should show royalty split percentage

**Preview Tracks:**
- Click play button on track
- ✅ Should toggle play state (simulated)

**Clear Selection:**
- Click "Clear All" button
- ✅ Should deselect all tracks

#### **Step 6: Create Bundle** ✨
- Fill in: Name, Symbol, and select at least 1 track
- Click "Create Music Bundle" button
- ✅ Should validate inputs
- ✅ Should show success alert: "Bundle 'My Test Bundle' created successfully! 🎉"
- ✅ Should automatically navigate to Marketplace
- ✅ Bundle should appear in marketplace

---

### **Phase 4: Marketplace** 🏪

1. **View Marketplace**
   - Navigate to "Marketplace" from navbar
   - ✅ Should show "Bundle Marketplace" heading

2. **Empty State**
   - If no bundles created:
  - ✅ Should show empty state with:
    - Music icon
    - "No bundles created yet" message
    - "Create Your First Bundle" button

3. **With Bundles**
   - After creating a bundle:
  - ✅ Should see bundle card with:
    - Music icon
    - Bundle name
    - Symbol
    - Description
    - Number of tracks
    - "View Details" button

4. **Bundle Card Interaction**
   - Click "View Details" (future: should show full details)
  - ✅ Should be clickable (currently no action)

---

### **Phase 5: Additional Pages** 📄

1. **How It Works Page**
   - Navigate via footer link or direct URL
  - ✅ Should show:
    - "How IPfolio Works" heading
    - 4-step guide
    - Key features section
    - Bonus challenge integrations
    - Back button to home

2. **Privacy Policy Page**
   - Navigate via footer link
  - ✅ Should show:
    - Full privacy policy content
    - Back button to home

3. **Terms of Service Page**
   - Navigate via footer link
  - ✅ Should show:
    - Full terms of service content
    - Back button to home

---

## Expected Behaviors

### **✅ Working Features**
- ✅ Navigation between pages
- ✅ Wallet connection (MetaMask/browser wallet)
- ✅ World ID verification (simulated)
- ✅ AI Bundle Assistant (simulated)
- ✅ Music Bundle Creator UI
- ✅ Track selection and filtering
- ✅ Template system
- ✅ Bundle creation (stores in state)
- ✅ Marketplace display
- ✅ Theme toggle (light/dark mode)
- ✅ Footer links navigation
- ✅ Responsive design

### **⚠️ Simulated Features** (For Demo)
- World ID verification (2-second delay, always succeeds)
- AI Bundle Assistant (generates suggestions based on simple logic)
- Bundle creation (stores in app state, doesn't deploy contract yet)

### **🔜 Future Features** (Not Yet Implemented)
- Real contract deployment
- Real World ID SDK integration
- Real ABV.dev API integration
- Trading functionality
- Royalty claiming UI

---

## Testing Scenarios

### **Scenario 1: Complete Happy Path**
1. ✅ Open app → Home page loads
2. ✅ Connect wallet → Address appears
3. ✅ Navigate to Create Bundle
4. ✅ Verify with World ID → Gets verified
5. ✅ Use AI Assistant → Get suggestion
6. ✅ Select template OR create custom bundle
7. ✅ Select tracks → See summary
8. ✅ Create bundle → Success alert
9. ✅ Auto-navigate to Marketplace
10. ✅ See bundle in marketplace

### **Scenario 2: Without Wallet**
1. ✅ Open app → Home page loads
2. ✅ Navigate to Create Bundle
3. ✅ See "Connect Your Wallet" message
4. ✅ Connect wallet from navbar
5. ✅ Continue with bundle creation

### **Scenario 3: Without Verification**
1. ✅ Connect wallet
2. ✅ Navigate to Create Bundle
3. ✅ Don't verify with World ID
4. ✅ See yellow warning: "Please verify with World ID"
5. ✅ Music Bundle Creator is hidden
6. ✅ Verify with World ID
7. ✅ Music Bundle Creator appears

### **Scenario 4: Template Usage**
1. ✅ Connect wallet and verify
2. ✅ Click "Use Pre-configured Template"
3. ✅ See 3 template options
4. ✅ Click on a template
5. ✅ Form auto-fills with template data
6. ✅ Create bundle

### **Scenario 5: Custom Bundle**
1. ✅ Connect wallet and verify
2. ✅ Enter custom name, symbol, description
3. ✅ Filter tracks by genre
4. ✅ Select multiple tracks
5. ✅ See selected tracks summary
6. ✅ Create bundle

---

## Common Issues & Solutions

### **Issue: Wallet Won't Connect**
- **Solution:** Make sure MetaMask (or browser wallet) is installed
- **Solution:** Check that you're on the correct network (Story Aeneid)
- **Solution:** Refresh page and try again

### **Issue: Components Not Showing**
- **Solution:** Check browser console for errors
- **Solution:** Make sure wallet is connected
- **Solution:** Make sure World ID is verified (for bundle creator)

### **Issue: Theme Not Persisting**
- **Solution:** Check localStorage in browser dev tools
- **Solution:** Clear cache and try again

### **Issue: Navigation Not Working**
- **Solution:** Check that all View types are defined in App.tsx
- **Solution:** Verify Footer.tsx has correct View type

---

## Browser Console Checks

### **Expected Console Output**
- ✅ No critical errors
- ⚠️ Warning about `porto/internal` is expected (harmless)
- ✅ React app should render without errors

### **Red Flags**
- ❌ TypeScript errors
- ❌ React rendering errors
- ❌ Wagmi connection errors

---

## Quick Test Commands

### **Check if Frontend is Running**
```bash
lsof -ti:3000
# Should return process IDs
```

### **Check Frontend Compilation**
```bash
cd /Users/MAC/ipfolio/frontend
npm start
# Should show "Compiled successfully" or "Compiled with warnings"
```

### **Access App in Browser**
- Open: `http://localhost:3000`
- Should see IPfolio homepage

---

## Test Results Template

```
Date: ___________
Tester: ___________

✅ Landing Page: PASS / FAIL
✅ Navigation: PASS / FAIL
✅ Wallet Connection: PASS / FAIL
✅ World ID Verification: PASS / FAIL
✅ AI Bundle Assistant: PASS / FAIL
✅ Music Bundle Creator: PASS / FAIL
✅ Template System: PASS / FAIL
✅ Track Selection: PASS / FAIL
✅ Bundle Creation: PASS / FAIL
✅ Marketplace: PASS / FAIL
✅ Theme Toggle: PASS / FAIL
✅ Footer Links: PASS / FAIL

Notes:
_________________________________
_________________________________
```

---

## Next Steps After Testing

1. **If All Tests Pass:**
   - ✅ App is ready for demo
   - ✅ Document any UI/UX improvements needed
   - ✅ Prepare demo script

2. **If Tests Fail:**
   - ❌ Document specific failures
   - ❌ Check browser console for errors
   - ❌ Fix issues and retest

3. **For Hackathon Demo:**
   - ✅ Practice the flow 2-3 times
   - ✅ Prepare talking points for each step
   - ✅ Have backup plan if wallet connection fails

---

## Demo Script (For Hackathon)

1. **Opening:** "IPfolio is the first platform to bundle IP assets like index funds..."
2. **Home Page:** Show features and bonus challenges
3. **Connect Wallet:** Demonstrate wallet connection
4. **World ID:** Show human verification (quick, privacy-preserving)
5. **AI Assistant:** Generate bundle suggestion
6. **Bundle Creation:** Use template or create custom
7. **Track Selection:** Show filtering and selection
8. **Create Bundle:** Show success and auto-navigation
9. **Marketplace:** Show created bundle
10. **Closing:** "This enables anyone to invest in IP with as little as $10..."

---

**Ready to test!** 🚀

Open `http://localhost:3000` and follow the checklist above.

