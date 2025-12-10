# World ID Action Setup Guide

## The "Request Not Found" Error

If you see "request not found" when scanning with World App, it usually means the **action** is not configured in your World ID dashboard.

## Quick Fix

### Option 1: Create the Action in World ID Dashboard (Recommended)

1. Go to https://developer.worldcoin.org/
2. Sign in to your account
3. Navigate to your app (App ID: `app_3bf28d32a396a2288d494c5aaff0fc37`)
4. Go to "Actions" section
5. Click "Create New Action"
6. Set Action ID to: `verify-human`
7. Set Display Name: "Verify Human"
8. Save the action

### Option 2: Use a Different Action Name

If you already have an action configured, update the component to use that action name:

```typescript
<IDKitWidget
  app_id={WORLD_ID_APP_ID}
  action="your-existing-action-id" // Use your existing action ID
  // ... rest of props
/>
```

### Option 3: Remove Action (Simple Verification)

For basic human verification without actions, you can try removing the action parameter:

```typescript
<IDKitWidget
  app_id={WORLD_ID_APP_ID}
  // Remove action parameter for basic verification
  handleVerify={handleVerify}
  onSuccess={onSuccess}
  onError={handleError}
  verification_level={VerificationLevel.Orb}
>
```

**Note:** Some World ID configurations require an action, so this might not work for all apps.

## Current Configuration

The component currently uses:
- **App ID**: `app_3bf28d32a396a2288d494c5aaff0fc37` (from your .env)
- **Action**: `verify-human` (needs to be created in dashboard)

## Steps to Fix

1. **Verify App ID is correct:**
   - Check browser console for: `🌍 World ID App ID loaded: app_...`
   - Ensure it matches your World ID dashboard

2. **Create the Action:**
   - Login to World ID Developer Portal
   - Go to your app
   - Create action with ID: `verify-human`
   - Save

3. **Test Again:**
   - Click "Verify with World ID"
   - Scan QR code with World App
   - Should work now!

## Alternative: Use Device Verification

If Orb verification is causing issues, you can switch to device verification:

```typescript
verification_level={VerificationLevel.Device} // Instead of Orb
```

Device verification uses your phone's biometrics instead of scanning a QR code.

## Still Having Issues?

1. Check World ID dashboard:
   - App is active
   - Action is created and matches exactly
   - App URL matches your deployment URL

2. Check browser console:
   - Look for any error messages
   - Verify App ID is loading correctly

3. Try different action names:
   - Some apps work with simple names like "verify" or "login"
   - Test with different action IDs

4. Contact World ID Support:
   - Discord: https://discord.gg/worldcoin
   - Check if your app needs any special configuration

