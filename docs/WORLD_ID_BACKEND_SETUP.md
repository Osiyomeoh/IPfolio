# World ID Backend Verification Setup

## Overview

World ID verification requires server-side proof verification to prevent man-in-the-middle attacks. This document explains how to set up the backend verification endpoint.

## Current Status

The frontend is configured to send proofs to `/api/verify-world-id`, but this endpoint needs to be implemented as a serverless function.

## Implementation Options

### Option 1: Vercel Serverless Function (Recommended for Vercel deployments)

Create a serverless function at `frontend/api/verify-world-id.js`:

```javascript
import { verifyCloudProof } from '@worldcoin/idkit-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const proof = req.body;
    const app_id = process.env.REACT_APP_WORLD_ID_APP_ID;
    const action = 'ipfolio-bundle-creation';

    const verifyRes = await verifyCloudProof(proof, app_id, action);

    if (verifyRes.success) {
      // Verification successful - perform backend actions here
      // e.g., mark user as verified in database
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: verifyRes.error || 'Verification failed' 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
```

### Option 2: Express.js Backend

If you have a separate backend server:

```javascript
const express = require('express');
const { verifyCloudProof } = require('@worldcoin/idkit-core');

const app = express();
app.use(express.json());

app.post('/api/verify-world-id', async (req, res) => {
  try {
    const proof = req.body;
    const app_id = process.env.WORLD_ID_APP_ID;
    const action = 'ipfolio-bundle-creation';

    const verifyRes = await verifyCloudProof(proof, app_id, action);

    if (verifyRes.success) {
      // Mark user as verified in database
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: verifyRes.error || 'Verification failed' 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});
```

## Required Dependencies

Install the World ID core package:

```bash
npm install @worldcoin/idkit-core
```

## Environment Variables

Set these environment variables:

- `REACT_APP_WORLD_ID_APP_ID`: Your World ID App ID (format: `app_...` or `app_staging_...`)
- For backend: `WORLD_ID_APP_ID`: Same App ID (without REACT_APP_ prefix)

## Testing

1. Get your App ID from https://developer.worldcoin.org/
2. Set the environment variable
3. Test the verification flow
4. Check backend logs for verification requests

## Important Notes

- **Never verify proofs client-side** - Always verify on the backend
- The `verifyCloudProof` function must be called server-side
- Store verification status in your database to prevent replay attacks
- Use the `nullifier_hash` to ensure users can only verify once per action

## Current Demo Implementation

For the hackathon demo, the frontend includes a mock that accepts all verifications. Replace this with real backend verification before production deployment.

