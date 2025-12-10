# 🔧 Fix: World ID "Can't Find Request" Error

## Problem

You're getting: **"Can't find the request"** when trying to verify with World ID.

## Root Cause

Your `.env` file has an **API key** (`api_...`), but the World ID frontend SDK needs an **App ID** (`app_staging_...`).

The code is currently using a **fake test App ID** (`app_staging_1234567890abcdef`) which doesn't exist, causing the error.

---

## Solution: Get Your Real App ID

### Step 1: Go to World ID Dashboard

1. Visit: **https://developer.worldcoin.org/**
2. Log in with your account

### Step 2: Find Your App

1. Look for your app (probably named "IPfolio")
2. Click on it to open details

### Step 3: Copy the App ID

You'll see something like:
- `app_staging_abc123def456...` (for staging)
- `app_abc123def456...` (for production)

**Copy this App ID** - it starts with `app_` (NOT `api_`)

### Step 4: Update Your `.env` File

```bash
cd frontend

# Edit .env file
# Replace the API key with your App ID
REACT_APP_WORLD_ID_APP_ID=app_staging_xxxxxxxxxxxxx
```

**Example:**
```env
# Before (API key - WRONG for frontend):
REACT_APP_WORLD_ID_APP_ID=api_a2V5XzMyNWVjYjZiMDE3YTBiNTI3NzE0MjU2YjFiM2FiOTkwOnNrXzA3OTc0NGJlMjgyNDcwYzYxMzc0MWYxYzUwYTNiM2Y2YjRhYjEzNTVmYjE3ZjBkOQ

# After (App ID - CORRECT):
REACT_APP_WORLD_ID_APP_ID=app_staging_abc123def456ghi789
```

### Step 5: Restart Dev Server

```bash
# Kill current server
lsof -ti:3000 | xargs kill -9

# Start again
npm start
```

---

## Alternative: Create New App in World ID

If you can't find your app, create a new one:

1. Go to https://developer.worldcoin.org/
2. Click "Create App" or "New App"
3. Fill out the form:
   - **Display name:** `IPfolio`
   - **URL:** `http://localhost:3000`
   - **Category:** `Web3` or `Marketplace`
4. Submit the form
5. Copy the **App ID** (starts with `app_staging_...`)
6. Update `.env` as above

---

## Verify It's Working

After updating:

1. Open http://localhost:3000
2. Go to "Create Bundle"
3. Click "Verify with World ID"
4. The modal should open **without** the "can't find request" error
5. You should see a QR code or verification options

---

## Quick Test

To verify your App ID is correct, check the browser console:

1. Open DevTools (F12)
2. Look for the App ID being used
3. Should see: `app_staging_...` (not `api_...`)

---

## Still Having Issues?

If you still get errors:

1. **Check App ID format:** Must start with `app_staging_` or `app_`
2. **Verify app exists:** Make sure the app exists in your World ID dashboard
3. **Check network:** Ensure you can reach World ID servers
4. **Browser console:** Check for any other error messages

---

**Once you have the App ID, update `.env` and restart!** 🚀

