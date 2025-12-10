import { ethers } from "hardhat";

/**
 * Deployment script for IPfolio contracts
 * 
 * Deploys BundleToken contract to the specified network
 * 
 * Usage:
 *   Local:  npx hardhat run scripts/deploy.ts --network hardhat
 *   Testnet: npx hardhat run scripts/deploy.ts --network odyssey
 */

async function main() {
  console.log("\n🚀 Starting IPfolio deployment...\n");

  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No signers found. Please check your PRIVATE_KEY in .env file.");
  }
  
  const deployer = signers[0];
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Get network info first
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, `(Chain ID: ${network.chainId})\n`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  const nativeToken = network.chainId === 1516n || network.chainId === 1315n ? "IP" : "ETH";
  console.log("💰 Account balance:", ethers.formatEther(balance), `${nativeToken}\n`);

  // For demo/testing purposes, we'll deploy with mock IP assets
  // In production, these would be real Story Protocol IP Asset addresses

  // Example bundle configuration
  // In production, these values would come from user input or frontend
  const bundleName = "Demo Bundle";
  const bundleSymbol = "DEMO";
  const bundleDescription = "Demo IP bundle for testing";
  
  // Mock IP assets (in production, these are Story Protocol IP Asset addresses)
  // For testing, we'll use deployer address as placeholder
  const mockIPAssets = [
    deployer.address, // IP Asset 1
    deployer.address, // IP Asset 2 (using same for demo)
  ];
  
  // Equal royalty shares (50% each = 5000 basis points each)
  const royaltyShares = [5000, 5000];
  
  // Standard supply: 10,000 tokens
  const totalSupply = ethers.parseEther("10000");

  console.log("📦 Bundle Configuration:");
  console.log("   Name:", bundleName);
  console.log("   Symbol:", bundleSymbol);
  console.log("   Description:", bundleDescription);
  console.log("   IP Assets:", mockIPAssets.length);
  console.log("   Total Supply:", ethers.formatEther(totalSupply), "tokens\n");

  // Deploy BundleToken
  console.log("⏳ Deploying BundleToken contract...");
  const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
  const bundleToken = await BundleTokenFactory.deploy(
    bundleName,
    bundleSymbol,
    bundleDescription,
    mockIPAssets,
    royaltyShares,
    totalSupply
  );

  const deploymentTx = bundleToken.deploymentTransaction();
  await bundleToken.waitForDeployment();
  const bundleTokenAddress = await bundleToken.getAddress();
  const deploymentReceipt = await deploymentTx?.wait();

  console.log("✅ BundleToken deployed to:", bundleTokenAddress);
  if (deploymentReceipt) {
    console.log("📝 Deployment Transaction Hash:", deploymentReceipt.hash);
    console.log("🔗 View transaction:", getExplorerUrl(network.chainId, deploymentReceipt.hash, "tx"));
  }
  console.log("🔗 View contract:", getExplorerUrl(network.chainId, bundleTokenAddress, "address"));

  // Verify deployment
  const name = await bundleToken.name();
  const symbol = await bundleToken.symbol();
  const owner = await bundleToken.owner();
  const totalSupplyDeployed = await bundleToken.totalSupply();

  console.log("\n📊 Deployment Verification:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Owner:", owner);
  console.log("   Total Supply:", ethers.formatEther(totalSupplyDeployed), "tokens");

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    contracts: {
      BundleToken: {
        address: bundleTokenAddress,
        name: name,
        symbol: symbol,
        totalSupply: ethers.formatEther(totalSupplyDeployed),
      },
    },
    timestamp: new Date().toISOString(),
  };

  console.log("\n💾 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n✨ Deployment complete!\n");

  // Instructions for verification
  if (network.chainId === 1516n) {
    console.log("📝 To verify contract on Story Odyssey Explorer:");
    console.log(`   npx hardhat verify --network odyssey ${bundleTokenAddress} "${bundleName}" "${bundleSymbol}" "${bundleDescription}" "[${mockIPAssets.join(',')}]" "[${royaltyShares.join(',')}]" "${totalSupply}"`);
  } else if (network.chainId === 1315n) {
    console.log("📝 To verify contract on Story Aeneid Explorer:");
    console.log(`   npx hardhat verify --network aeneid ${bundleTokenAddress} "${bundleName}" "${bundleSymbol}" "${bundleDescription}" "[${mockIPAssets.join(',')}]" "[${royaltyShares.join(',')}]" "${totalSupply}"`);
  }

  return {
    bundleToken: bundleTokenAddress,
  };
}

function getExplorerUrl(chainId: bigint, hashOrAddress: string, type: "address" | "tx" = "address"): string {
  if (chainId === 1516n) {
    return `https://odyssey.storyscan.xyz/${type}/${hashOrAddress}`;
  }
  if (chainId === 1315n) {
    // Try different explorer URL formats for Aeneid
    return `https://aeneid.explorer.story.foundation/${type === "address" ? "accounts" : "transactions"}/${hashOrAddress}`;
  }
  return `https://etherscan.io/${type}/${hashOrAddress}`;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

