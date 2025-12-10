// Vercel Serverless Function for World ID Verification
// This file should be at: frontend/api/verify-world-id.js
// Vercel will automatically create an API route at /api/verify-world-id

// For production, install: npm install @worldcoin/idkit-core
// const { verifyCloudProof } = require('@worldcoin/idkit-core');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const proof = req.body;
    const app_id = process.env.REACT_APP_WORLD_ID_APP_ID || process.env.WORLD_ID_APP_ID;
    const action = 'ipfolio-bundle-creation';

    if (!app_id) {
      console.error('World ID App ID not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Server configuration error' 
      });
    }

    // TODO: Replace with real verification in production
    // For production, uncomment and use:
    /*
    const verifyRes = await verifyCloudProof(proof, app_id, action);

    if (verifyRes.success) {
      // Verification successful - perform backend actions here
      // e.g., mark user as verified in database, store nullifier_hash
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: verifyRes.error || 'Verification failed' 
      });
    }
    */

    // MOCK VERIFICATION FOR DEMO/HACKATHON
    // Remove this and use real verifyCloudProof in production
    console.log('World ID verification request received:', {
      app_id,
      action,
      nullifier_hash: proof?.nullifier_hash,
      verification_level: proof?.verification_level
    });

    // For demo: Accept all verifications
    // In production, this MUST be replaced with verifyCloudProof
    return res.status(200).json({ 
      success: true,
      message: 'Verification successful (mock for demo)'
    });

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}

