# 🔑 Quick Pinata API Key Setup

## Where to Add the Pinata API Key

**Location:** `frontend/.env` file

---

## Step-by-Step Instructions

### 1. Get Your Pinata JWT Token

1. Go to **https://pinata.cloud**
2. Sign up / Log in
3. Go to **API Keys** → **New Key**
4. Name it "IPfolio"
5. Enable `pinFileToIPFS` permission
6. **Copy the JWT Token** (starts with `eyJ...`)

### 2. Add to `.env` File

**File Location:** `frontend/.env`

**Add this line:**
```bash
REACT_APP_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_actual_token_here
```

**Replace `your_actual_token_here` with your actual JWT token from Pinata.**

### 3. Restart Dev Server

After adding the key, restart your dev server:

```bash
cd frontend
npm start
```

---

## Current `.env` File Structure

Your `.env` file should look like this:

```bash
# World ID App ID (NOT API key!)
# Get this from https://developer.worldcoin.org/
REACT_APP_WORLD_ID_APP_ID=app_staging_YOUR_APP_ID_HERE

# Pinata IPFS Configuration
# Get your JWT token from https://pinata.cloud
# Go to API Keys → New Key → Copy JWT Token
REACT_APP_PINATA_JWT=your_pinata_jwt_token_here
```

---

## Quick Command to Add

**On Mac/Linux:**
```bash
cd frontend
echo "REACT_APP_PINATA_JWT=your_token_here" >> .env
```

**On Windows (PowerShell):**
```powershell
cd frontend
Add-Content .env "REACT_APP_PINATA_JWT=your_token_here"
```

**Then edit the file to replace `your_token_here` with your actual token.**

---

## Verify It's Working

1. **Start dev server:**
   ```bash
   cd frontend
   npm start
   ```

2. **Open browser console** (F12)

3. **Try uploading a file:**
   - Go to "Create Bundle" page
   - Upload a test file
   - Check console:
     - ✅ Should see: `📤 Uploading file to Pinata IPFS...`
     - ❌ Should NOT see: `⚠️ Pinata JWT not found. Using demo mode.`

---

## Important Notes

- ✅ `.env` file is in `frontend/` directory (not root)
- ✅ Variable name must be exactly: `REACT_APP_PINATA_JWT`
- ✅ No quotes around the token value
- ✅ Restart dev server after adding
- ✅ `.env` file is gitignored (safe to store token)

---

## For Production (Vercel)

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - **Key:** `REACT_APP_PINATA_JWT`
   - **Value:** Your Pinata JWT token
4. Redeploy

---

**That's it! Once added, file uploads will use real Pinata IPFS.** 🚀

