# 📌 Pinata IPFS Integration Summary

## What Was Changed

IPfolio now uses **Pinata** for IPFS file storage instead of web3.storage or mock uploads.

---

## ✅ Updated Files

### 1. `frontend/src/services/ipfsService.ts`

**Changes:**
- ✅ Updated to use Pinata API
- ✅ Real file uploads via Pinata
- ✅ Fallback to demo mode if JWT not configured
- ✅ Proper error handling
- ✅ Uses Pinata gateway URLs

**Key Functions:**
- `uploadFileToIPFS()` - Uploads files to Pinata IPFS
- `uploadMetadataToIPFS()` - Uploads JSON metadata to Pinata IPFS
- Both functions check for `REACT_APP_PINATA_JWT` environment variable
- Falls back to demo mode if JWT not found

### 2. `docs/PINATA_SETUP.md`

**New Documentation:**
- Complete Pinata setup guide
- Step-by-step instructions
- Troubleshooting guide
- Security best practices
- Production deployment guide

### 3. Updated Documentation

- `REALISTIC_USER_FLOW.md` - Updated to mention Pinata
- All IPFS references updated to Pinata

---

## 🔧 How It Works

### With Pinata JWT (Production):

```typescript
// User uploads file
const file = new File([...], 'song.mp3');

// File uploaded to Pinata
const result = await uploadFileToIPFS(file);
// Returns: { cid: 'QmABC...', url: 'https://gateway.pinata.cloud/ipfs/QmABC...' }
```

**Flow:**
1. File sent to Pinata API (`https://api.pinata.cloud/pinning/pinFileToIPFS`)
2. Pinata pins file to IPFS
3. CID returned
4. File accessible via Pinata gateway

### Without Pinata JWT (Demo Mode):

```typescript
// Falls back to demo mode
// Generates mock CID
// Shows warning in console
```

---

## 🚀 Setup Required

### For Production:

1. **Get Pinata Account:**
   - Sign up at https://pinata.cloud
   - Free tier: 1GB storage

2. **Get API Key:**
   - Dashboard → API Keys → New Key
   - Copy JWT token

3. **Set Environment Variable:**
   ```bash
   REACT_APP_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Restart Dev Server:**
   ```bash
   npm start
   ```

### For Demo (No Setup):

- Works without Pinata JWT
- Uses demo mode (mock uploads)
- Shows warning in console
- Perfect for development/testing

---

## 📊 Pinata API Usage

### Endpoint Used:

```
POST https://api.pinata.cloud/pinning/pinFileToIPFS
```

### Headers:

```
Authorization: Bearer {JWT_TOKEN}
```

### Body:

```
FormData:
- file: File object
- pinataMetadata: JSON string
- pinataOptions: JSON string
```

### Response:

```json
{
  "IpfsHash": "QmABC123...",
  "PinSize": 5242880,
  "Timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎯 Benefits of Pinata

### ✅ Reliability:
- Professional IPFS pinning service
- High uptime
- Fast gateway

### ✅ Easy Integration:
- Simple REST API
- No complex SDK needed
- Works with fetch API

### ✅ Free Tier:
- 1GB storage free
- Perfect for hackathon/demo
- Easy to upgrade

### ✅ Gateway:
- Fast CDN-backed gateway
- `gateway.pinata.cloud`
- Reliable access

---

## 🔒 Security

### Environment Variables:

**✅ Secure:**
- JWT stored in `.env`
- Never committed to git
- Added to `.gitignore`

**❌ Insecure:**
- Hardcoded in code
- Committed to repository
- Exposed in client-side

### Best Practices:

1. ✅ Use environment variables
2. ✅ Never commit `.env` file
3. ✅ Rotate keys regularly
4. ✅ Use minimal permissions

---

## 📝 Usage Examples

### Upload Music File:

```typescript
const audioFile = new File([audioData], 'song.mp3', { type: 'audio/mpeg' });
const result = await uploadFileToIPFS(audioFile);
console.log('CID:', result.cid);
console.log('URL:', result.url);
```

### Upload Artwork:

```typescript
const imageFile = new File([imageData], 'cover.jpg', { type: 'image/jpeg' });
const result = await uploadFileToIPFS(imageFile);
```

### Upload Metadata:

```typescript
const metadata = {
  name: 'Track Name',
  artist: 'Artist Name',
  audio: 'ipfs://QmABC...',
};
const result = await uploadMetadataToIPFS(metadata);
```

---

## 🐛 Troubleshooting

### Issue: "Pinata API error: 401"

**Solution:**
- Check `REACT_APP_PINATA_JWT` is set
- Verify token is correct
- Restart dev server

### Issue: Files not uploading

**Solution:**
- Check network tab for API errors
- Verify Pinata API key permissions
- Check file size limits

### Issue: CIDs not resolving

**Solution:**
- Wait a few minutes (IPFS propagation)
- Try different gateway
- Check Pinata dashboard for file status

---

## ✅ Testing

### Test Upload:

1. Set `REACT_APP_PINATA_JWT` in `.env`
2. Start dev server
3. Upload a test file
4. Check console for CID
5. Visit gateway URL
6. Verify file loads

### Test Demo Mode:

1. Remove `REACT_APP_PINATA_JWT` from `.env`
2. Start dev server
3. Upload a test file
4. Should see demo mode warning
5. Mock CID generated
6. Still works for testing

---

## 🎉 Summary

**Pinata Integration Complete!**

- ✅ Real IPFS uploads via Pinata
- ✅ Demo mode fallback
- ✅ Complete documentation
- ✅ Easy setup
- ✅ Production ready

**Next Steps:**
1. Get Pinata account
2. Set JWT token
3. Test file uploads
4. Deploy to production

---

**Pinata makes IPFS easy and reliable!** 🚀

