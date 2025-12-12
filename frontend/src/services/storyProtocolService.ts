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
 * 
 * Note: This function is not currently used as we're using demo mode.
 * In production, you'd need to properly configure the Story SDK with viem.
 */
export function createStoryClient(signer: Signer): StoryClient {
  // Note: Story SDK requires viem account, not ethers signer
  // For now, we're using demo mode, so this function is not actively used
  // In production, you'd need to convert ethers signer to viem account
  
  const config = {
    chainId: aeneid.id as any,
    transport: 'http' as any,
    account: signer as any, // Story SDK expects viem account, but we'll adapt
  } as StoryConfig;
  
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
    // ⚠️ CURRENTLY IN DEMO MODE - NOT ON BLOCKCHAIN ⚠️
    // 
    // This function currently SIMULATES registration for hackathon demo.
    // In production, this MUST use real Story Protocol SDK for blockchain registration:
    //
    // REAL BLOCKCHAIN REGISTRATION (Production):
    // const storyClient = createStoryClient(signer);
    // const response = await storyClient.ipAsset.register({
    //   name: params.name,
    //   type: 'STORY',
    //   metadata: {
    //     description: params.description || '',
    //     ipfsHash: params.metadata.ipfsHash,
    //     ...params.metadata,
    //   },
    // });
    // 
    // This would:
    // - Create real blockchain transaction
    // - Pay gas fees
    // - Return real IP asset address
    // - Return real transaction hash
    // - Be verifiable on block explorer
    //
    // return {
    //   ipAssetId: response.ipAssetId,
    //   ipAssetAddress: response.ipAssetAddress,
    //   txHash: response.txHash,
    // };

    // DEMO MODE: Simulated registration (NOT on blockchain)
    console.log('📝 [DEMO] Simulating IP asset registration (NOT on blockchain)...', params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock data (NOT real blockchain addresses)
    // In production, these come from Story Protocol blockchain transaction
    const ipAssetAddress = `0x${Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    const ipAssetId = `ip_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Mock transaction hash (NOT real blockchain transaction)
    const txHash = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    console.log('✅ [DEMO] IP asset registration simulated (NOT on blockchain):', {
      ipAssetId,
      ipAssetAddress,
      txHash,
      note: 'This is mock data. In production, this would be a real blockchain transaction.',
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

    // ⚠️ DEMO MODE: Simulated license attachment (NOT on blockchain)
    // In production, this would be a real blockchain transaction via Story Protocol
    console.log('📄 [DEMO] Simulating license terms attachment (NOT on blockchain)...', {
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

