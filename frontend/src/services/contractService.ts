import { Address } from 'viem';
import { ethers } from 'ethers';
import BundleTokenArtifact from '../../../contracts/artifacts/contracts/BundleToken.sol/BundleToken.json';

/**
 * Contract Service for BundleToken interactions
 * 
 * Handles:
 * - Deploying new bundles
 * - Reading bundle data
 * - Interacting with deployed bundles
 */

// ABI and bytecode from compiled artifact
export const BUNDLE_TOKEN_ABI = BundleTokenArtifact.abi;
export const BUNDLE_TOKEN_BYTECODE = BundleTokenArtifact.bytecode;

// We'll need to import the bytecode from the artifact
// For now, we'll use a factory pattern or deploy via a factory contract

export interface BundleConfig {
  name: string;
  symbol: string;
  description: string;
  ipAssets: Address[];
  shares: number[]; // Basis points (10000 = 100%)
  totalSupply: string; // In tokens (e.g., "10000")
}

export interface BundleInfo {
  address: Address;
  name: string;
  symbol: string;
  description: string;
  totalSupply: string;
  ipAssets: Address[];
  owner: Address;
}

/**
 * Deploy a new BundleToken contract
 * 
 * @param signer - Ethers signer (from wagmi useWalletClient)
 * @param config - Bundle configuration
 * @returns Contract address and transaction hash
 */
export async function deployBundleToken(
  signer: ethers.Signer,
  config: BundleConfig
): Promise<{ address: Address; txHash: string }> {
  try {
    // Validate shares sum to 10000 (100%)
    const totalShares = config.shares.reduce((sum, share) => sum + share, 0);
    if (totalShares !== 10000) {
      throw new Error(`Shares must sum to 10000 (100%), got ${totalShares}`);
    }

    // Validate IP assets and shares arrays match
    if (config.ipAssets.length !== config.shares.length) {
      throw new Error(`IP assets (${config.ipAssets.length}) and shares (${config.shares.length}) arrays must have the same length`);
    }

    // Create contract factory with bytecode from artifact
    const BundleTokenFactory = new ethers.ContractFactory(
      BUNDLE_TOKEN_ABI,
      BUNDLE_TOKEN_BYTECODE,
      signer
    );

    // Deploy the contract
    console.log('🚀 Deploying BundleToken contract...', {
      name: config.name,
      symbol: config.symbol,
      ipAssets: config.ipAssets.length,
      totalSupply: config.totalSupply
    });

    const bundleToken = await BundleTokenFactory.deploy(
      config.name,
      config.symbol,
      config.description,
      config.ipAssets,
      config.shares,
      ethers.parseEther(config.totalSupply)
    );

    console.log('⏳ Waiting for deployment transaction...');
    await bundleToken.waitForDeployment();
    
    const address = await bundleToken.getAddress();
    const deploymentTx = bundleToken.deploymentTransaction();

    console.log('✅ BundleToken deployed successfully!', {
      address,
      txHash: deploymentTx?.hash
    });

    return {
      address: address as Address,
      txHash: deploymentTx?.hash || '',
    };
  } catch (error: any) {
    console.error('❌ Error deploying BundleToken:', error);
    throw new Error(error.message || 'Failed to deploy bundle contract');
  }
}

/**
 * Get bundle information from deployed contract
 */
export async function getBundleInfo(
  provider: ethers.Provider,
  bundleAddress: Address
): Promise<BundleInfo> {
  try {
    const bundleToken = new ethers.Contract(
      bundleAddress,
      BUNDLE_TOKEN_ABI,
      provider
    );

    const [name, symbol, description, totalSupply, ipAssets, owner] = await Promise.all([
      bundleToken.name(),
      bundleToken.symbol(),
      bundleToken.bundleDescription(),
      bundleToken.totalSupply(),
      bundleToken.getIPAssets(),
      bundleToken.owner(),
    ]);

    return {
      address: bundleAddress,
      name,
      symbol,
      description,
      totalSupply: ethers.formatEther(totalSupply),
      ipAssets: ipAssets.map((addr: string) => addr as Address),
      owner: owner as Address,
    };
  } catch (error) {
    console.error('Error getting bundle info:', error);
    throw error;
  }
}

/**
 * Distribute royalties to a bundle
 */
export async function distributeRoyalties(
  signer: ethers.Signer,
  bundleAddress: Address,
  amount: string // In ETH/IP
): Promise<string> {
  try {
    const bundleToken = new ethers.Contract(
      bundleAddress,
      BUNDLE_TOKEN_ABI,
      signer
    );

    const tx = await bundleToken.distributeRoyalties({
      value: ethers.parseEther(amount),
    });

    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Error distributing royalties:', error);
    throw error;
  }
}

/**
 * Claim royalties from a bundle
 */
export async function claimRoyalties(
  signer: ethers.Signer,
  bundleAddress: Address
): Promise<{ txHash: string; amount: string }> {
  try {
    const bundleToken = new ethers.Contract(
      bundleAddress,
      BUNDLE_TOKEN_ABI,
      signer
    );

    const userAddress = await signer.getAddress();
    const claimableBefore = await bundleToken.getClaimableRoyalties(userAddress);

    const tx = await bundleToken.claimRoyalties();
    const receipt = await tx.wait();

    return {
      txHash: receipt!.hash,
      amount: ethers.formatEther(claimableBefore),
    };
  } catch (error) {
    console.error('Error claiming royalties:', error);
    throw error;
  }
}

/**
 * Get claimable royalties for a user
 */
export async function getClaimableRoyalties(
  provider: ethers.Provider,
  bundleAddress: Address,
  userAddress: Address
): Promise<string> {
  try {
    const bundleToken = new ethers.Contract(
      bundleAddress,
      BUNDLE_TOKEN_ABI,
      provider
    );

    const claimable = await bundleToken.getClaimableRoyalties(userAddress);
    return ethers.formatEther(claimable);
  } catch (error) {
    console.error('Error getting claimable royalties:', error);
    throw error;
  }
}

/**
 * Calculate royalty shares from tracks
 * Equal distribution by default
 */
export function calculateRoyaltyShares(trackCount: number): number[] {
  if (trackCount === 0) return [];
  
  const sharePerTrack = Math.floor(10000 / trackCount);
  const shares = new Array(trackCount).fill(sharePerTrack);
  
  // Handle remainder (if 10000 doesn't divide evenly)
  const remainder = 10000 - (sharePerTrack * trackCount);
  if (remainder > 0) {
    shares[0] += remainder; // Add remainder to first track
  }
  
  return shares;
}

