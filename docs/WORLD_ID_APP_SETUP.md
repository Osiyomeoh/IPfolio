# 🌍 World ID App Setup Form Guide

## Form Fields to Fill Out

Based on the World ID app creation form you're seeing, here's what to enter:

### **Display name**
```
IPfolio
```
*Or: "IPfolio - IP Bundling Marketplace"*

### **URL where users can access your app**
```
http://localhost:3000
```
*For production, use your deployed URL (e.g., https://ipfolio.vercel.app)*

### **Select a category**
Choose: **"Web3"** or **"Marketplace"** or **"Finance"**

---

## After Submitting the Form

1. **You'll receive an App ID:**
   - Format: `app_staging_xxxxxxxxxxxxx` (staging) or `app_xxxxxxxxxxxxx` (production)
   - This is different from the API key you have

2. **Set the App ID in your `.env` file:**
   ```env
   REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
   ```

3. **The API key you provided:**
   - `api_a2V5XzMyNWVjYjZiMDE3YTBiNTI3NzE0MjU2YjFiM2FiOTkwOnNrXzA3OTc0NGJlMjgyNDcwYzYxMzc0MWYxYzUwYTNiM2Y2YjRhYjEzNTVmYjE3ZjBkOQ`
   - This is for backend verification (if you're using their API)
   - For frontend, you primarily need the App ID

---

## Quick Setup Steps

1. **Fill out the form:**
   - Display name: `IPfolio`
   - URL: `http://localhost:3000` (or your production URL)
   - Category: `Web3` or `Marketplace`

2. **Submit the form**

3. **Copy your App ID** (will look like `app_staging_...`)

4. **Create/Update `frontend/.env`:**
   ```env
   REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
   ```

5. **Restart dev server:**
   ```bash
   cd frontend
   npm start
   ```

---

## Verification Options

After creating the app, you can choose:

### **Option 1: Verify proofs using public API** (Easiest - Recommended for Hackathon)
- ✅ Easiest to set up
- ✅ No backend needed
- ✅ Works immediately
- ✅ Good for demo

### **Option 2: Validate and store proofs on blockchain**
- More complex
- Requires smart contract
- Better for production

**For hackathon, use Option 1!**

---

## Current Implementation

The code is already set up to:
- ✅ Use World ID SDK
- ✅ Open verification modal
- ✅ Handle success/error callbacks
- ✅ Work with App ID from environment variable

**You just need to:**
1. Complete the form
2. Get your App ID
3. Set it in `.env`
4. Restart the server

---

## Testing

Once set up:
1. Open app: http://localhost:3000
2. Go to "Create Bundle"
3. Click "Verify with World ID"
4. Scan QR code with World App
5. Complete verification
6. ✅ Should see "Verified Human" badge

---

## Troubleshooting

**If verification doesn't work:**
- Check that App ID is set correctly in `.env`
- Ensure App ID format is correct: `app_staging_...` or `app_...`
- Restart dev server after setting env variable
- Check browser console for errors

**The API key you have:**
- Can be used for backend verification if needed
- For frontend-only demo, App ID is sufficient

---

**Ready to fill out the form!** 🚀

