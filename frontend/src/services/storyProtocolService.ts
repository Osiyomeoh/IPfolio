/**
 * Story Protocol Service
 * 
 * Handles IP asset registration on Story Protocol using the Story SDK.
 * This service provides a clean interface for registering music tracks
 * and other IP assets on Story Protocol.
 * 
 * ⛓️ REAL BLOCKCHAIN REGISTRATION - Uses Story Protocol SDK for on-chain transactions
 */

import { StoryClient, StoryConfig, SupportedChainIds } from '@story-protocol/core-sdk';
import { WalletClient } from 'viem';
import { http } from 'viem';
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
 * Initialize Story Protocol client with real blockchain connection
 * 
 * ⛓️ REAL BLOCKCHAIN - Creates Story SDK client for on-chain transactions
 */
export function createStoryClient(walletClient: WalletClient): StoryClient {
  if (!walletClient.account) {
    throw new Error('Wallet client must have an account');
  }

  const config: StoryConfig = {
    chainId: aeneid.id as SupportedChainIds,
    transport: http(process.env.REACT_APP_AENEID_RPC_URL || 'https://aeneid.storyrpc.io'),
    account: walletClient.account,
  };
  
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
 * ⛓️ REAL BLOCKCHAIN REGISTRATION - Creates on-chain transaction
 * 
 * @param walletClient - Viem wallet client from wagmi
 * @param params - IP asset registration parameters
 * @returns IP asset address and transaction hash
 */
export async function registerIPAsset(
  walletClient: WalletClient,
  params: IPAssetRegistrationParams
): Promise<IPAssetRegistrationResult> {
  try {
    if (!walletClient.account) {
      throw new Error('Wallet client must have an account');
    }

    console.log('📝 Registering IP asset on Story Protocol blockchain...', params);

    // Create Story Protocol client
    const storyClient = createStoryClient(walletClient);

    // Story Protocol requires an NFT contract and token ID to register an IP asset.
    // For music tracks, we need to either:
    // 1. Use an existing NFT (if nftContract and tokenId are provided)
    // 2. Use the mint-and-register workflow (requires SPG NFT contract)
    //
    // For hackathon demo, we'll check if NFT info is provided, otherwise
    // we'll use a workflow approach or provide clear error.
    
    const nftContract = params.metadata?.nftContract as `0x${string}` | undefined;
    const tokenId = params.metadata?.tokenId as bigint | number | undefined;

    let response;
    
    if (nftContract && tokenId !== undefined) {
      // Register existing NFT as IP asset
      // ipMetadata must match IpMetadataForWorkflow type:
      // - ipMetadataURI: URI of the IP metadata (e.g., IPFS URL)
      // - ipMetadataHash: Hash of the IP metadata
      // - nftMetadataURI: URI of the NFT metadata (e.g., IPFS URL)
      // - nftMetadataHash: Hash of the NFT metadata
      const ipfsHash = params.metadata?.ipfsHash || '';
      const ipfsUrl = params.metadata?.ipfsUrl || `ipfs://${ipfsHash}`;
      
      // Use IPFS metadata if available, otherwise construct from params
      response = await storyClient.ipAsset.register({
        nftContract,
        tokenId,
        ipMetadata: {
          ipMetadataURI: ipfsUrl,
          ipMetadataHash: ipfsHash as `0x${string}` || '0x0' as `0x${string}`,
          nftMetadataURI: ipfsUrl, // Use same metadata for NFT
          nftMetadataHash: ipfsHash as `0x${string}` || '0x0' as `0x${string}`,
        },
      });
    } else {
      // For music tracks, we would typically use mint-and-register workflow
      // This requires an SPG NFT contract address
      // For now, throw a clear error explaining the requirement
      throw new Error(
        'NFT contract and token ID are required to register an IP asset on Story Protocol. ' +
        'For music tracks, you need to either:\n' +
        '1. Mint an NFT first using an SPG NFT contract, then register it\n' +
        '2. Use the mint-and-register workflow (requires SPG NFT contract setup)\n\n' +
        'For hackathon demo, please provide nftContract and tokenId in metadata.'
      );
    }

    console.log('✅ IP asset registered on blockchain:', {
      ipId: response.ipId,
      txHash: response.txHash,
    });

    return {
      ipAssetId: response.ipId || '',
      ipAssetAddress: response.ipId || '',
      txHash: response.txHash || '',
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
 * ⛓️ REAL BLOCKCHAIN REGISTRATION - Creates on-chain transaction
 * 
 * @param walletClient - Viem wallet client from wagmi
 * @param ipAssetAddress - IP asset address
 * @param licenseTerms - License terms configuration
 */
export async function attachLicenseTerms(
  walletClient: WalletClient,
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
    if (!walletClient.account) {
      throw new Error('Wallet client must have an account');
    }

    console.log('📄 Attaching license terms to IP asset on blockchain...', {
      ipAssetAddress,
      licenseTerms,
    });

    // Create Story Protocol client
    const storyClient = createStoryClient(walletClient);

    // Attach license terms on blockchain
    // Story Protocol uses PIL (Programmable IP License) terms
    // First, we need to create/get license terms ID, then attach it
    // 
    // Note: The actual API requires a licenseTermsId, not the full terms object
    // For a full implementation, we'd need to:
    // 1. Create PIL terms using the PIL template
    // 2. Get the license terms ID
    // 3. Attach it to the IP asset
    //
    // For hackathon demo, this is a simplified version
    // In production, use the license workflow client for full PIL terms support
    
    // For now, we'll use a default PIL terms ID (this would need to be created first)
    // In production, you'd create the PIL terms and get the ID
    const licenseTermsId = 1; // This should be the actual PIL terms ID
    
    const response = await storyClient.license.attachLicenseTerms({
      ipId: ipAssetAddress as `0x${string}`,
      licenseTermsId,
    });

    console.log('✅ License terms attached on blockchain:', response.txHash);
    return response.txHash || '';
  } catch (error: any) {
    console.error('❌ Error attaching license terms:', error);
    throw new Error(`Failed to attach license terms: ${error.message || 'Unknown error'}`);
  }
}

