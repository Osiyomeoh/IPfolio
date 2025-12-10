# 🌍 World ID Testing Guide

## Current Status

✅ **Frontend is running** on http://localhost:3000  
✅ **World ID component is integrated**  
⚠️ **You have an API key, but need an App ID for frontend SDK**

---

## Quick Test Steps

### 1. **Open the App**
```
http://localhost:3000
```

### 2. **Navigate to Create Bundle**
- Click "Create Bundle" in the navbar
- Or go directly to: http://localhost:3000/#create

### 3. **Test World ID Verification**
- You should see the "World ID Verification" component
- Click "Verify with World ID" button
- A modal should open (even with test App ID)

---

## ⚠️ Important: API Key vs App ID

**What you have:**
```
api_a2V5XzMyNWVjYjZiMDE3YTBiNTI3NzE0MjU2YjFiM2FiOTkwOnNrXzA3OTc0NGJlMjgyNDcwYzYxMzc0MWYxYzUwYTNiM2Y2YjRhYjEzNTVmYjE3ZjBkOQ
```

**What you need for frontend:**
```
app_staging_xxxxxxxxxxxxx  (or app_xxxxxxxxxxxxx)
```

### How to Get Your App ID

1. **Go to World ID Dashboard:**
   - Visit: https://developer.worldcoin.org/
   - Log in with your account

2. **Find Your App:**
   - Look for the app you created (probably named "IPfolio")
   - Click on it

3. **Copy the App ID:**
   - It will be displayed prominently
   - Format: `app_staging_...` (staging) or `app_...` (production)

4. **Update `.env` file:**
   ```bash
   cd frontend
   # Edit .env file
   REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
   ```

5. **Restart the dev server:**
   ```bash
   # Kill current server
   lsof -ti:3000 | xargs kill -9
   
   # Start again
   npm start
   ```

---

## Testing with Current Setup

**Right now, the code will:**
- ✅ Detect you have an API key
- ✅ Use a fallback test App ID (`app_staging_1234567890abcdef`)
- ✅ Show a warning in console
- ⚠️ **Widget will open but won't work fully** (needs real App ID)

**To test the UI flow:**
1. Open http://localhost:3000
2. Click "Create Bundle"
3. Click "Verify with World ID"
4. Modal should open (even if verification won't complete)

---

## Expected Behavior

### ✅ **What Should Work:**
- World ID button appears
- Clicking opens the World ID modal
- UI shows verification status
- Component renders correctly

### ⚠️ **What Won't Work (until you get App ID):**
- Actual verification won't complete
- QR code scanning won't work
- Proof generation will fail

---

## Quick Fix for Testing

If you want to test the full flow immediately, you can:

1. **Get a test App ID from World ID:**
   - Go to https://developer.worldcoin.org/
   - Create a new app (or use existing)
   - Copy the App ID

2. **Or use World ID's test App ID:**
   - They provide test App IDs for development
   - Check their documentation

---

## Console Check

Open browser DevTools (F12) and check:
- ✅ No errors about World ID imports
- ⚠️ Warning: "You have an API key, but World ID SDK needs an App ID"
- ✅ Component renders without errors

---

## Next Steps

1. **Get your App ID** from World ID dashboard
2. **Update `.env`** with the App ID
3. **Restart server**
4. **Test full verification flow**

---

## Troubleshooting

**If the button doesn't appear:**
- Check browser console for errors
- Verify component is imported correctly
- Check that `react-app-rewired` is being used

**If modal doesn't open:**
- Check App ID format (must start with `app_`)
- Verify World ID SDK is installed: `npm list @worldcoin/idkit`
- Check browser console for SDK errors

**If verification fails:**
- Make sure you have World App installed on your phone
- Check that App ID matches your World ID dashboard
- Verify network connection

---

**Ready to test!** 🚀

Open http://localhost:3000 and click "Create Bundle" → "Verify with World ID"

