# 📌 Pinata IPFS Setup Guide

## Overview

IPfolio uses **Pinata** for IPFS file storage. Pinata provides reliable IPFS pinning services with a free tier and easy-to-use API.

---

## 🚀 Quick Setup

### Step 1: Create Pinata Account

1. Go to https://pinata.cloud
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key

1. Log in to Pinata dashboard
2. Go to **API Keys** section
3. Click **"New Key"**
4. Name it: "IPfolio"
5. Select permissions:
   - ✅ `pinFileToIPFS`
   - ✅ `pinJSONToIPFS`
6. Click **"Create Key"**
7. Copy the **JWT Token** (starts with `eyJ...`)

**⚠️ Important:** Save this token securely. You won't be able to see it again!

### Step 3: Add to Environment Variables

Create or update `.env` file in `frontend/` directory:

```bash
REACT_APP_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**For Production:**
- Add to Vercel environment variables
- Or your hosting platform's environment settings

---

## 📋 Pinata Free Tier Limits

**Free Tier Includes:**
- 1 GB storage
- Unlimited files
- 100 API calls/day
- Public gateway access

**For Production:**
- Paid plans start at $20/month
- More storage and API calls
- Better performance

---

## 🔧 How It Works

### File Upload Flow:

```
User selects file
    ↓
File validated (type, size)
    ↓
Upload to Pinata API
    ↓
Pinata pins to IPFS
    ↓
CID (Content Identifier) returned
    ↓
File accessible via IPFS gateway
```

### Example:

1. User uploads `song.mp3` (5MB)
2. File sent to Pinata API
3. Pinata pins to IPFS
4. CID returned: `QmABC123...`
5. File accessible at: `https://gateway.pinata.cloud/ipfs/QmABC123...`

---

## 🎯 Usage in IPfolio

### Automatic Upload

When users upload files:
1. **Music File** → Uploaded to Pinata → CID stored
2. **Artwork** → Uploaded to Pinata → CID stored
3. **Metadata** → Uploaded to Pinata → CID stored

### Storage Structure

```
IPFS Storage:
├── Music Files
│   ├── QmABC123... (song1.mp3)
│   ├── QmDEF456... (song2.mp3)
│   └── ...
├── Artwork
│   ├── QmGHI789... (cover1.jpg)
│   └── ...
└── Metadata
    ├── QmJKL012... (metadata1.json)
    └── ...
```

---

## 🔒 Security Best Practices

### 1. Never Commit JWT Token

**❌ Bad:**
```javascript
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

**✅ Good:**
```javascript
const token = process.env.REACT_APP_PINATA_JWT;
```

### 2. Use Environment Variables

Always use `.env` file:
```bash
REACT_APP_PINATA_JWT=your_token_here
```

### 3. Restrict API Key Permissions

Only enable what you need:
- ✅ `pinFileToIPFS` - Upload files
- ✅ `pinJSONToIPFS` - Upload JSON (if needed)
- ❌ Don't enable admin permissions

### 4. Rotate Keys Regularly

- Change API keys every 90 days
- Revoke old keys when rotating

---

## 🐛 Troubleshooting

### Error: "Pinata API error: 401"

**Problem:** Invalid or missing JWT token

**Solution:**
1. Check `.env` file exists
2. Verify `REACT_APP_PINATA_JWT` is set
3. Restart dev server after adding env var
4. Verify token is correct in Pinata dashboard

### Error: "Pinata API error: 403"

**Problem:** API key doesn't have required permissions

**Solution:**
1. Go to Pinata dashboard
2. Check API key permissions
3. Ensure `pinFileToIPFS` is enabled
4. Create new key if needed

### Error: "File too large"

**Problem:** File exceeds Pinata limits

**Solution:**
- Free tier: 1GB total storage
- Individual files: Usually up to 100MB
- Consider file compression
- Upgrade to paid plan for larger files

### Files Not Accessible

**Problem:** CID not resolving

**Solution:**
1. Check CID is correct
2. Wait a few minutes (IPFS propagation)
3. Try different gateway:
   - `https://gateway.pinata.cloud/ipfs/{cid}`
   - `https://ipfs.io/ipfs/{cid}`
   - `https://cloudflare-ipfs.com/ipfs/{cid}`

---

## 📊 Monitoring Usage

### Check Pinata Dashboard:

1. **Storage Used:**
   - Dashboard → Storage
   - See total GB used
   - See files count

2. **API Calls:**
   - Dashboard → API Keys
   - See API call count
   - Monitor rate limits

3. **Files:**
   - Dashboard → Files
   - See all pinned files
   - View CIDs
   - Delete if needed

---

## 🚀 Production Deployment

### Vercel:

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - Key: `REACT_APP_PINATA_JWT`
   - Value: Your Pinata JWT token
5. Redeploy

### Other Platforms:

Add environment variable:
- **Key:** `REACT_APP_PINATA_JWT`
- **Value:** Your Pinata JWT token

---

## 💡 Tips

### 1. Use Pinata Dedicated Gateway (Paid)

For better performance:
- Faster loading times
- Custom domain support
- Better reliability

### 2. Monitor Storage

- Set up alerts in Pinata
- Monitor usage regularly
- Upgrade before hitting limits

### 3. File Optimization

- Compress audio files (MP3)
- Optimize images (WebP)
- Reduce file sizes when possible

### 4. Backup CIDs

Store CIDs in database:
- Track which files belong to which user
- Enable file management
- Track storage usage per user

---

## 📝 Example Configuration

### `.env` file:

```bash
# Pinata IPFS Configuration
REACT_APP_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMjM0NTY3OCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiSXBmb2xpbyJ9LCJpYXQiOjE2NDAwMDAwMDAsImV4cCI6MTY0MDAwMDAwMH0.signature
```

### Usage in Code:

```typescript
// Automatically uses Pinata if JWT is set
const result = await uploadFileToIPFS(file);
console.log('CID:', result.cid);
console.log('URL:', result.url);
```

---

## ✅ Checklist

- [ ] Pinata account created
- [ ] API key generated
- [ ] JWT token copied
- [ ] `.env` file created
- [ ] `REACT_APP_PINATA_JWT` set
- [ ] Dev server restarted
- [ ] Test file upload
- [ ] Verify CID works
- [ ] Add to production env vars

---

**Pinata makes IPFS easy!** 🎉

