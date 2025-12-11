/**
 * Story Protocol Service
 * 
 * Handles IP asset registration on Story Protocol using the Story SDK.
 * This service provides a clean interface for registering music tracks
 * and other IP assets on Story Protocol.
 */

import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { Signer } from 'ethers';
import { aeneid } from '../config/chains';

export interface IPAssetRegistrationParams {
  name: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface IPAssetRegistrationResult {
  ipAssetId: string;
  ipAssetAddress: string;
  txHash: string;
}

/**
 * Initialize Story Protocol client
 */
export function createStoryClient(signer: Signer): StoryClient {
  const config: StoryConfig = {
    chainId: aeneid.id,
    transport: 'http',
    account: signer as any, // Story SDK expects viem account, but we'll adapt
  };

  // Note: Story SDK requires specific configuration
  // For now, we'll use a simplified approach that works with ethers
  // In production, you'd need to properly convert ethers signer to viem account
  
  try {
    return StoryClient.newClient(config);
  } catch (error) {
    console.error('Error creating Story client:', error);
    throw new Error('Failed to initialize Story Protocol client');
  }
}

/**
 * Register an IP asset on Story Protocol
 * 
 * @param signer - Ethers signer from wallet
 * @param params - IP asset registration parameters
 * @returns IP asset address and transaction hash
 */
export async function registerIPAsset(
  signer: Signer,
  params: IPAssetRegistrationParams
): Promise<IPAssetRegistrationResult> {
  try {
    // For hackathon demo, we'll simulate the registration
    // In production, this would use the real Story SDK:
    
    // const storyClient = createStoryClient(signer);
    // const response = await storyClient.ipAsset.register({
    //   name: params.name,
    //   type: 'STORY', // or 'CHARACTER', 'STORY', etc.
    //   metadata: {
    //     description: params.description || '',
    //     ...params.metadata,
    //   },
    // });
    // 
    // return {
    //   ipAssetId: response.ipAssetId,
    //   ipAssetAddress: response.ipAssetAddress,
    //   txHash: response.txHash,
    // };

    // Demo: Simulate registration with realistic delay
    console.log('📝 Registering IP asset on Story Protocol...', params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a realistic-looking IP asset address
    // In production, this comes from Story Protocol
    const ipAssetAddress = `0x${Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    // Generate a mock IP asset ID (Story Protocol format)
    const ipAssetId = `ip_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Generate a mock transaction hash
    const txHash = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    console.log('✅ IP asset registered:', {
      ipAssetId,
      ipAssetAddress,
      txHash,
    });

    return {
      ipAssetId,
      ipAssetAddress,
      txHash,
    };
  } catch (error: any) {
    console.error('❌ Error registering IP asset:', error);
    throw new Error(`Failed to register IP asset: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Get IP asset information from Story Protocol
 * 
 * @param ipAssetAddress - The IP asset address
 * @returns IP asset metadata
 */
export async function getIPAssetInfo(ipAssetAddress: string): Promise<any> {
  try {
    // In production, this would query Story Protocol:
    // const storyClient = createStoryClient(signer);
    // const ipAsset = await storyClient.ipAsset.get({
    //   ipAssetId: ipAssetAddress,
    // });
    // return ipAsset;

    // Demo: Return mock data
    return {
      address: ipAssetAddress,
      name: 'Music Track',
      registeredAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting IP asset info:', error);
    throw error;
  }
}

/**
 * Attach license terms to an IP asset (PIL - Programmable IP License)
 * 
 * @param signer - Ethers signer
 * @param ipAssetAddress - IP asset address
 * @param licenseTerms - License terms configuration
 */
export async function attachLicenseTerms(
  signer: Signer,
  ipAssetAddress: string,
  licenseTerms: {
    commercialUse: boolean;
    commercialAttribution: boolean;
    commercialRevShare: number; // Basis points (e.g., 500 = 5%)
    derivativesAllowed: boolean;
    derivativesAttribution: boolean;
    derivativesApproval: boolean;
    derivativesReciprocal: boolean;
  }
): Promise<string> {
  try {
    // In production, this would use Story SDK:
    // const storyClient = createStoryClient(signer);
    // const response = await storyClient.license.attachLicenseTerms({
    //   ipAssetId: ipAssetAddress,
    //   licenseTerms: {
    //     commercialUse: licenseTerms.commercialUse,
    //     commercialAttribution: licenseTerms.commercialAttribution,
    //     commercialRevShare: licenseTerms.commercialRevShare,
    //     // ... other terms
    //   },
    // });
    // return response.txHash;

    // Demo: Simulate license attachment
    console.log('📄 Attaching license terms to IP asset...', {
      ipAssetAddress,
      licenseTerms,
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    const txHash = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    console.log('✅ License terms attached:', txHash);
    return txHash;
  } catch (error: any) {
    console.error('❌ Error attaching license terms:', error);
    throw new Error(`Failed to attach license terms: ${error.message || 'Unknown error'}`);
  }
}

