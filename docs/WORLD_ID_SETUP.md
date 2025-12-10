# 🌍 World ID Integration Setup Guide

## Overview

IPfolio now uses the **real World ID SDK** (`@worldcoin/idkit`) for human verification. This ensures only verified humans can create bundles, preventing spam and ensuring quality.

---

## ✅ What's Implemented

- ✅ Real World ID SDK integration (`@worldcoin/idkit`)
- ✅ IDKitWidget component for verification UI
- ✅ IDKitProvider wrapper in app root
- ✅ Verification callback handling
- ✅ Error handling

---

## 🔧 Setup Instructions

### Step 1: Get World ID App ID

1. **Visit World ID Developer Portal:**
   - Go to: https://developer.worldcoin.org/
   - Sign up or log in

2. **Create a New App:**
   - Click "Create App" or "New App"
   - Fill in app details:
     - **App Name:** IPfolio
     - **Description:** IP bundling marketplace
     - **Website:** Your app URL (or localhost for dev)

3. **Get Your App ID:**
   - After creating the app, you'll receive an `app_id`
   - It looks like: `app_staging_xxxxxxxxxxxxx` (staging) or `app_xxxxxxxxxxxxx` (production)

### Step 2: Configure Environment Variables

1. **Create/Update `.env` file in `frontend/` directory:**
   ```bash
   cd frontend
   touch .env
   ```

2. **Add your World ID App ID:**
   ```env
   REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
   ```

3. **Restart the development server:**
   ```bash
   npm start
   ```

### Step 3: Test the Integration

1. **Open the app:**
   - Navigate to: http://localhost:3000
   - Go to "Create Bundle" page

2. **Click "Verify with World ID":**
   - World ID modal should open
   - Scan QR code with World App (mobile)
   - Complete verification

3. **Verify Success:**
   - Should see "Verified Human" badge
   - Bundle creator should become available

---

## 📋 Configuration Options

### Verification Levels

The component supports two verification levels:

1. **`orb`** (Recommended for production)
   - Requires World ID Orb verification
   - Highest security, requires in-person verification
   - Best for preventing spam

2. **`device`** (Easier for testing)
   - Phone-based verification
   - Easier for users, less secure
   - Good for development/testing

**Current Setting:** `orb` (can be changed in `WorldIDVerification.tsx`)

### Action and Signal

- **Action:** `"ipfolio-bundle-creation"`
  - Identifies what the verification is for
  - Can be customized per use case

- **Signal:** `"bundle-creation"`
  - Additional context for the verification
  - Can include user address or other data

---

## 🔒 Backend Verification (Production)

**Important:** For production, you MUST verify proofs on your backend!

### Current Implementation

The current implementation has a fallback for hackathon demo:
```typescript
const verified = response.ok || true; // Remove `|| true` in production
```

### Production Setup

1. **Create Backend Endpoint:**
   ```typescript
   // Example: /api/verify-world-id
   POST /api/verify-world-id
   Body: {
     proof: string,
     merkle_root: string,
     nullifier_hash: string,
     verification_level: string
   }
   ```

2. **Verify Proof on Backend:**
   - Use World ID verification library
   - Check proof validity
   - Prevent double-spending (check nullifier_hash)
   - Return success/failure

3. **Remove Fallback:**
   ```typescript
   const verified = response.ok; // Remove `|| true`
   ```

---

## 🧪 Testing Without World ID App

For development/testing without the World App:

1. **Use Staging App ID:**
   - Staging app IDs work with test environment
   - May have different verification requirements

2. **Test Mode:**
   - World ID SDK has test mode for development
   - Check World ID documentation for test credentials

3. **Mock for Development:**
   - Can temporarily use simulated verification
   - **Don't use in production!**

---

## 📚 Resources

- **World ID Documentation:** https://docs.worldcoin.org/id/idkit
- **Developer Portal:** https://developer.worldcoin.org/
- **SDK GitHub:** https://github.com/worldcoin/idkit-js
- **Support:** https://discord.gg/worldcoin

---

## 🐛 Troubleshooting

### Issue: "Invalid app_id"

**Solution:**
- Check that `REACT_APP_WORLD_ID_APP_ID` is set correctly
- Ensure app_id is from World ID Developer Portal
- Restart dev server after setting env variable

### Issue: Modal doesn't open

**Solution:**
- Check browser console for errors
- Ensure IDKitProvider wraps the app
- Verify app_id is valid

### Issue: Verification fails

**Solution:**
- Check that user has World App installed
- Ensure user has completed World ID registration
- Check network connection
- Verify app_id matches environment (staging vs production)

### Issue: "Proof verification failed"

**Solution:**
- In production, ensure backend verification is working
- Check that proof is being sent correctly
- Verify backend endpoint is accessible

---

## 🎯 Hackathon Demo

For the hackathon demo:

1. **Get Staging App ID:**
   - Register at https://developer.worldcoin.org/
   - Create staging app
   - Use staging app_id

2. **Set Environment Variable:**
   ```env
   REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
   ```

3. **Test Before Demo:**
   - Test verification flow
   - Ensure modal opens
   - Verify success callback works

4. **Demo Flow:**
   - Show World ID verification
   - Explain privacy-preserving nature
   - Demonstrate verification success

---

## ✅ Checklist

- [ ] Registered at World ID Developer Portal
- [ ] Created app and got app_id
- [ ] Set `REACT_APP_WORLD_ID_APP_ID` in `.env`
- [ ] Restarted dev server
- [ ] Tested verification flow
- [ ] Verified success callback works
- [ ] (Production) Backend verification endpoint created
- [ ] (Production) Removed fallback `|| true`

---

## 🚀 Next Steps

1. **Get App ID** from World ID Developer Portal
2. **Set Environment Variable** in `.env` file
3. **Test Integration** in development
4. **Prepare for Demo** - test flow before hackathon

**Ready to verify humans!** 🎉

