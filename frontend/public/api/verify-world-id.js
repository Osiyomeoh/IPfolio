// This is a placeholder for the World ID verification endpoint
// In production, this should be a serverless function that verifies the proof
// For Vercel, create: frontend/api/verify-world-id.js

// Example implementation (needs @worldcoin/idkit-core):
/*
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
*/

// For hackathon demo: Simple mock that accepts all verifications
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Mock verification - accepts all proofs for demo
  // In production, replace with real verifyCloudProof call
  console.log('World ID verification request:', req.body);
  
  return res.status(200).json({ 
    success: true,
    message: 'Verification successful (mock for demo)'
  });
}

