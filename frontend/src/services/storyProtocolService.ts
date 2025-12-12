/**
 * Story Protocol Service
 * 
 * Handles IP asset registration on Story Protocol using the Story SDK.
 * This service provides a clean interface for registering music tracks
 * and other IP assets on Story Protocol.
 * 
 * ⛓️ REAL BLOCKCHAIN REGISTRATION - Uses Story Protocol SDK for on-chain transactions
 */

import { StoryClient, StoryConfig, SupportedChainIds, PILFlavor, WIP_TOKEN_ADDRESS, convertCIDtoHashIPFS } from '@story-protocol/core-sdk';
import { WalletClient, Address, parseEther } from 'viem';
import { http } from 'viem';
import { aeneid } from '../config/chains';

// SPG NFT Contract addresses for Story Protocol testnets
// Default: Public collection provided by Story Protocol for Aeneid testnet
// Source: https://docs.story.foundation/docs/register-ip-asset
const SPG_NFT_CONTRACTS: Record<number, Address> = {
  1315: (process.env.REACT_APP_SPG_NFT_CONTRACT_AENEID || '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc') as Address, // Aeneid - public collection
  1516: (process.env.REACT_APP_SPG_NFT_CONTRACT_ODYSSEY || '0x0000000000000000000000000000000000000000') as Address, // Odyssey
};

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
      // - ipMetadataHash: Hash of the IP metadata (bytes32, not CID)
      // - nftMetadataURI: URI of the NFT metadata (e.g., IPFS URL)
      // - nftMetadataHash: Hash of the NFT metadata (bytes32, not CID)
      const ipfsCID = params.metadata?.ipfsHash || ''; // This is actually a CID, not a hash
      const ipfsUrl = params.metadata?.ipfsUrl || `ipfs://${ipfsCID}`;
      
      // Convert IPFS CID to bytes32 hash (required by Story Protocol)
      const ipfsHash = ipfsCID ? convertCIDtoHashIPFS(ipfsCID) : '0x0' as `0x${string}`;
      
      // Use IPFS metadata if available, otherwise construct from params
      response = await storyClient.ipAsset.register({
        nftContract,
        tokenId,
        ipMetadata: {
          ipMetadataURI: ipfsUrl,
          ipMetadataHash: ipfsHash,
          nftMetadataURI: ipfsUrl, // Use same metadata for NFT
          nftMetadataHash: ipfsHash,
        },
      });
    } else {
      // Use registerIpAsset with mint workflow for music tracks
      // This mints an NFT and registers it as an IP asset in one transaction
      const spgNftContract = SPG_NFT_CONTRACTS[aeneid.id];
      
      if (!spgNftContract || spgNftContract === '0x0000000000000000000000000000000000000000') {
        throw new Error(
          'SPG NFT contract not configured. Please set REACT_APP_SPG_NFT_CONTRACT_AENEID environment variable.\n\n' +
          'Default public collection for Aeneid: 0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc'
        );
      }

      console.log('🎨 Minting NFT and registering IP asset...', { spgNftContract });

      // Get IPFS metadata
      const ipfsCID = params.metadata?.ipfsHash || ''; // This is actually a CID, not a hash
      const ipfsUrl = params.metadata?.ipfsUrl || `https://ipfs.io/ipfs/${ipfsCID}`;
      
      // Convert IPFS CID to bytes32 hash (required by Story Protocol)
      // Story Protocol expects bytes32 hash, not the CID string
      const ipfsHash = ipfsCID ? convertCIDtoHashIPFS(ipfsCID) : '0x0' as `0x${string}`;
      
      // Use registerIpAsset with mint type (recommended API)
      // This is the modern way to mint and register in one transaction
      // License terms are optional - we'll register first, then attach terms separately if needed
      const request: any = {
        nft: {
          type: 'mint',
          spgNftContract,
        },
        ipMetadata: {
          ipMetadataURI: ipfsUrl,
          ipMetadataHash: ipfsHash,
          nftMetadataURI: ipfsUrl,
          nftMetadataHash: ipfsHash,
        },
      };

      // Add license terms if royalty rate is provided
      const royaltyRatePercent = params.metadata?.royaltyRate ? parseFloat(params.metadata.royaltyRate as string) : null;
      if (royaltyRatePercent !== null && royaltyRatePercent > 0) {
        // Ensure royalty rate is within valid range (0-100)
        const validRoyaltyRate = Math.max(0, Math.min(100, royaltyRatePercent));
        request.licenseTermsData = [{
          terms: PILFlavor.commercialRemix({
            commercialRevShare: validRoyaltyRate, // Percentage (0-100, e.g., 5 = 5%)
            defaultMintingFee: parseEther('0'), // Free minting for demo
            currency: WIP_TOKEN_ADDRESS,
          }),
        }];
      }

      response = await storyClient.ipAsset.registerIpAsset(request);

      console.log('✅ NFT minted and IP asset registered:', {
        ipId: response.ipId,
        txHash: response.txHash,
      });
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

    // Note: License terms should be attached during IP registration using registerIpAsset
    // with licenseTermsData parameter. This function is kept for backward compatibility
    // but the recommended approach is to attach license terms during registration.
    
    // For attaching license terms to an already registered IP, we need to:
    // 1. Register PIL terms first
    // 2. Then attach them to the IP
    
    // For now, we'll register and attach PIL terms in one call
    const licenseTermsResponse = await storyClient.license.registerPilTermsAndAttach({
      ipId: ipAssetAddress as `0x${string}`,
      licenseTermsData: [{
        terms: PILFlavor.commercialRemix({
          commercialRevShare: licenseTerms.commercialRevShare / 100, // Convert basis points to percentage
          defaultMintingFee: parseEther('0'), // Free minting for demo
          currency: WIP_TOKEN_ADDRESS,
        }),
      }],
    });

    console.log('✅ License terms attached on blockchain:', licenseTermsResponse.txHash);
    return licenseTermsResponse.txHash || '';
  } catch (error: any) {
    console.error('❌ Error attaching license terms:', error);
    throw new Error(`Failed to attach license terms: ${error.message || 'Unknown error'}`);
  }
}

