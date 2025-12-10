# World ID Troubleshooting Guide

## Common Issues and Solutions

### 1. World App Opens But Shows Error

**Error: "world app was opened to handle a request from another app or website but we could find the request"**

**Possible Causes:**
- App ID is incorrect or not set
- App ID format is wrong (using API key instead of App ID)
- Environment variable not loaded

**Solutions:**
1. Verify your App ID format:
   - ✅ Correct: `app_staging_3bf28d32a396a2288d494c5aaff0fc37`
   - ✅ Correct: `app_3bf28d32a396a2288d494c5aaff0fc37`
   - ❌ Wrong: `api_3bf28d32a396a2288d494c5aaff0fc37` (this is an API key, not App ID)

2. Check environment variable:
   ```bash
   # In frontend/.env file:
   REACT_APP_WORLD_ID_APP_ID=app_staging_3bf28d32a396a2288d494c5aaff0fc37
   ```

3. Restart dev server after changing .env:
   ```bash
   cd frontend
   npm start
   ```

4. Check browser console for the loaded App ID:
   - Look for: `🌍 World ID App ID loaded: app_...`
   - Verify it matches your App ID

### 2. Button Doesn't Open World App

**Possible Causes:**
- IDKitWidget not properly initialized
- JavaScript errors preventing widget from loading
- Network/CORS issues

**Solutions:**
1. Check browser console for errors
2. Verify `@worldcoin/idkit` is installed:
   ```bash
   cd frontend
   npm list @worldcoin/idkit
   ```

3. Check if IDKitWidget is rendering:
   - Inspect the button element in browser DevTools
   - Verify the `onClick` handler is attached

### 3. Verification Completes But Not Marked as Verified

**Possible Causes:**
- Backend API endpoint not responding
- handleVerify callback failing silently
- State not updating

**Solutions:**
1. Check browser console for:
   - `🔐 World ID proof received:` - confirms proof was received
   - `✅ Backend verification response:` - confirms backend responded
   - `✅ World ID verification successful` - confirms state updated

2. Check Network tab:
   - Look for POST request to `/api/verify-world-id`
   - Check response status and body

3. For development (no backend):
   - The component should fallback to client-side verification
   - Check console for: `⚠️ Could not reach backend API, using client-side verification`

### 4. Environment Variable Not Loading

**Symptoms:**
- Console shows fallback App ID: `app_staging_1234567890abcdef`
- Warning: `⚠️ No World ID App ID found`

**Solutions:**
1. Create/update `frontend/.env`:
   ```bash
   REACT_APP_WORLD_ID_APP_ID=app_staging_3bf28d32a396a2288d494c5aaff0fc37
   ```

2. Restart dev server (env vars only load on start)

3. For production (Vercel):
   - Set environment variable in Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `REACT_APP_WORLD_ID_APP_ID` = `app_staging_...`

### 5. Getting Your App ID

1. Go to https://developer.worldcoin.org/
2. Sign in or create account
3. Go to "Apps" section
4. Find your app (or create new one)
5. Copy the **App ID** (starts with `app_`)
6. **NOT** the API key (starts with `api_`)

### 6. Testing Checklist

- [ ] App ID is set in `.env` file
- [ ] App ID starts with `app_` (not `api_`)
- [ ] Dev server restarted after setting env var
- [ ] Browser console shows correct App ID
- [ ] World App opens when clicking button
- [ ] Verification completes successfully
- [ ] Component shows "Verified Human" status

### 7. Debug Mode

Enable detailed logging by checking browser console for:
- `🌍 World ID App ID loaded:` - Shows loaded App ID
- `🌍 Opening World ID verification...` - Button clicked
- `🔐 World ID proof received:` - Proof received from World App
- `✅ Backend verification response:` - Backend responded
- `✅ World ID verification successful` - Verification complete
- `❌` - Any errors

### 8. Still Not Working?

1. **Check World ID Dashboard:**
   - Verify app is active
   - Check app settings match your configuration
   - Verify action ID matches: `ipfolio-bundle-creation`

2. **Test with Simple Example:**
   - Try the official World ID React example
   - Compare with your implementation

3. **Check World ID Status:**
   - Visit https://status.worldcoin.org/
   - Verify services are operational

4. **Contact Support:**
   - World ID Discord: https://discord.gg/worldcoin
   - World ID Docs: https://docs.worldcoin.org/
