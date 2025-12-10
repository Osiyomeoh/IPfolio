import { Address } from 'viem';
import { ethers, ContractFactory, Contract, Signer, Provider } from 'ethers';

/**
 * Contract Service for BundleToken interactions
 * 
 * Handles:
 * - Deploying new bundles
 * - Reading bundle data
 * - Interacting with deployed bundles
 */

// ABI for BundleToken (from compiled artifact)
export const BUNDLE_TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function getIPAssets() view returns (address[])',
  'function distributeRoyalties() payable',
  'function claimRoyalties() returns (uint256)',
  'function getClaimableRoyalties(address) view returns (uint256)',
  'function totalRoyaltiesCollected() view returns (uint256)',
  'function owner() view returns (address)',
  'function bundleDescription() view returns (string)',
  'function createdAt() view returns (uint256)',
] as const;

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
 * Note: This requires the BundleToken bytecode. For production, you would:
 * 1. Import bytecode from artifacts
 * 2. Or use a factory contract
 * 3. Or deploy via a backend service
 */
export async function deployBundleToken(
  signer: Signer,
  config: BundleConfig,
  bytecode?: string
): Promise<{ address: Address; txHash: string }> {
  try {
    // Validate shares sum to 10000 (100%)
    const totalShares = config.shares.reduce((sum, share) => sum + share, 0);
    if (totalShares !== 10000) {
      throw new Error(`Shares must sum to 10000 (100%), got ${totalShares}`);
    }

    if (!bytecode) {
      // For demo purposes, we'll simulate deployment
      // In production, load bytecode from artifacts
      throw new Error('Bytecode required for deployment. Please load from artifacts or use a factory contract.');
    }

    // Create contract factory
    const BundleTokenFactory = new ContractFactory(
      BUNDLE_TOKEN_ABI,
      bytecode,
      signer
    );

    // Deploy the contract
    console.log('Deploying BundleToken...', config);
    const bundleToken = await BundleTokenFactory.deploy(
      config.name,
      config.symbol,
      config.description,
      config.ipAssets,
      config.shares,
      ethers.parseEther(config.totalSupply)
    );

    await bundleToken.waitForDeployment();
    const address = await bundleToken.getAddress();
    const deploymentTx = bundleToken.deploymentTransaction();

    return {
      address: address as Address,
      txHash: deploymentTx?.hash || '',
    };
  } catch (error) {
    console.error('Error deploying BundleToken:', error);
    throw error;
  }
}

/**
 * Get bundle information from deployed contract
 */
export async function getBundleInfo(
  provider: Provider,
  bundleAddress: Address
): Promise<BundleInfo> {
  try {
    const bundleToken = new Contract(
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
  signer: Signer,
  bundleAddress: Address,
  amount: string // In ETH/IP
): Promise<string> {
  try {
    const bundleToken = new Contract(
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
  signer: Signer,
  bundleAddress: Address
): Promise<{ txHash: string; amount: string }> {
  try {
    const bundleToken = new Contract(
      bundleAddress,
      BUNDLE_TOKEN_ABI,
      signer
    );

    const userAddress = await signer.getAddress();
    const claimableBefore = await bundleToken.getClaimableRoyalties(userAddress);

    const tx = await bundleToken.claimRoyalties();
    const receipt = await tx.wait();

    return {
      txHash: receipt.hash,
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
  provider: Provider,
  bundleAddress: Address,
  userAddress: Address
): Promise<string> {
  try {
    const bundleToken = new Contract(
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

