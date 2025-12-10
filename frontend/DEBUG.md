# Frontend Debugging Guide

## Common Issues & Solutions

### 1. Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### 2. Missing Dependencies
```bash
cd frontend
npm install --legacy-peer-deps
```

### 3. Wagmi Configuration Issues
Check that:
- `wagmi` and `@tanstack/react-query` are installed
- WagmiProvider wraps the app in `index.tsx`
- Chain configuration is correct

### 4. Import Errors
Verify all component files exist:
- `components/MusicBundleCreator.tsx`
- `components/WorldIDVerification.tsx`
- `components/AIBundleAssistant.tsx`
- `components/WalletConnect.tsx`
- `data/sigmaMusicIPs.ts`

### 5. Browser Console Errors
Open browser DevTools (F12) and check:
- Console tab for errors
- Network tab for failed requests
- React DevTools for component tree

## Quick Fixes

### Clear Cache and Restart
```bash
cd frontend
rm -rf node_modules/.cache
npm start
```

### Check React Version Compatibility
```bash
npm list react react-dom
```

### Verify Wagmi Setup
```bash
npm list wagmi @tanstack/react-query
```

