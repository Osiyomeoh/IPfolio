import { ethers } from "hardhat";

/**
 * Test script for deployed BundleToken contract
 * 
 * Tests the deployed contract on Aeneid network
 * 
 * Usage:
 *   npx hardhat run scripts/testDeployed.ts --network aeneid
 */

const DEPLOYED_CONTRACT_ADDRESS = "0xEbf84CE8945B7e1BE6dBfB6914320222Cf05467b";

async function main() {
  console.log("\n🧪 Testing Deployed BundleToken Contract\n");
  console.log("Contract Address:", DEPLOYED_CONTRACT_ADDRESS);
  console.log("Network: Aeneid (Chain ID: 1315)\n");

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  // Use deployer as tester if only one signer available
  const tester1 = signers[1] || deployer;
  const tester2 = signers[2] || deployer;
  
  console.log("📝 Test Accounts:");
  console.log("   Deployer:", deployer.address);
  if (signers.length > 1) {
    console.log("   Tester 1:", tester1.address);
    console.log("   Tester 2:", tester2.address);
  } else {
    console.log("   ⚠️  Only one account available - using deployer for all tests");
  }
  console.log();

  // Attach to deployed contract
  const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
  const bundleToken = BundleTokenFactory.attach(DEPLOYED_CONTRACT_ADDRESS);

  console.log("🔗 Attached to deployed contract\n");

  // Test 1: Read contract information
  console.log("📊 Test 1: Reading Contract Information");
  console.log("─".repeat(50));
  const name = await bundleToken.name();
  const symbol = await bundleToken.symbol();
  const totalSupply = await bundleToken.totalSupply();
  const owner = await bundleToken.owner();
  const description = await bundleToken.bundleDescription();
  const ipAssets = await bundleToken.getIPAssets();

  console.log("   ✅ Name:", name);
  console.log("   ✅ Symbol:", symbol);
  console.log("   ✅ Total Supply:", ethers.formatEther(totalSupply), "tokens");
  console.log("   ✅ Owner:", owner);
  console.log("   ✅ Description:", description);
  console.log("   ✅ IP Assets Count:", ipAssets.length);
  console.log("   ✅ IP Assets:", ipAssets);
  console.log();

  // Test 2: Check balances
  console.log("💰 Test 2: Checking Token Balances");
  console.log("─".repeat(50));
  const deployerBalance = await bundleToken.balanceOf(deployer.address);
  const tester1Balance = await bundleToken.balanceOf(tester1.address);
  const tester2Balance = await bundleToken.balanceOf(tester2.address);

  console.log("   ✅ Deployer Balance:", ethers.formatEther(deployerBalance), symbol);
  console.log("   ✅ Tester 1 Balance:", ethers.formatEther(tester1Balance), symbol);
  console.log("   ✅ Tester 2 Balance:", ethers.formatEther(tester2Balance), symbol);
  console.log();

  // Test 3: Transfer tokens (only if we have multiple accounts)
  console.log("🔄 Test 3: Transferring Tokens");
  console.log("─".repeat(50));
  const transferAmount = ethers.parseEther("1000"); // Transfer 1000 tokens
  
  if (signers.length > 1 && deployerBalance >= transferAmount && tester1.address !== deployer.address) {
    console.log(`   ⏳ Transferring ${ethers.formatEther(transferAmount)} tokens to Tester 1...`);
    const transferTx = await bundleToken.transfer(tester1.address, transferAmount);
    await transferTx.wait();
    console.log("   ✅ Transfer successful!");
    console.log("   📝 Transaction Hash:", transferTx.hash);
    
    const newTester1Balance = await bundleToken.balanceOf(tester1.address);
    console.log("   ✅ Tester 1 New Balance:", ethers.formatEther(newTester1Balance), symbol);
  } else {
    console.log("   ⚠️  Skipping transfer test (using same account or insufficient balance)");
  }
  console.log();

  // Test 4: Distribute royalties
  console.log("💎 Test 4: Distributing Royalties");
  console.log("─".repeat(50));
  const royaltyAmount = ethers.parseEther("0.1"); // 0.1 IP
  
  console.log(`   ⏳ Distributing ${ethers.formatEther(royaltyAmount)} IP in royalties...`);
  const distributeTx = await bundleToken.distributeRoyalties({ value: royaltyAmount });
  await distributeTx.wait();
  console.log("   ✅ Royalties distributed!");
  console.log("   📝 Transaction Hash:", distributeTx.hash);
  
  const totalRoyalties = await bundleToken.totalRoyaltiesCollected();
  const royaltiesPerToken = await bundleToken.royaltiesPerToken();
  console.log("   ✅ Total Royalties Collected:", ethers.formatEther(totalRoyalties), "IP");
  console.log("   ✅ Royalties Per Token:", ethers.formatEther(royaltiesPerToken), "IP");
  console.log();

  // Test 5: Check claimable royalties
  console.log("💵 Test 5: Checking Claimable Royalties");
  console.log("─".repeat(50));
  const deployerClaimable = await bundleToken.getClaimableRoyalties(deployer.address);
  const tester1Claimable = await bundleToken.getClaimableRoyalties(tester1.address);
  
  console.log("   ✅ Deployer Claimable:", ethers.formatEther(deployerClaimable), "IP");
  console.log("   ✅ Tester 1 Claimable:", ethers.formatEther(tester1Claimable), "IP");
  console.log();

  // Test 6: Claim royalties (if any)
  console.log("💸 Test 6: Claiming Royalties");
  console.log("─".repeat(50));
  
  // Claim as deployer (who has tokens) - using deployerClaimable from Test 5
  if (deployerClaimable > 0n) {
    const deployerBalanceBefore = await ethers.provider.getBalance(deployer.address);
    console.log("   ⏳ Deployer claiming royalties...");
    const claimTx = await bundleToken.claimRoyalties();
    const claimReceipt = await claimTx.wait();
    const gasUsed = claimReceipt!.gasUsed * claimReceipt!.gasPrice;
    const deployerBalanceAfter = await ethers.provider.getBalance(deployer.address);
    const claimed = deployerBalanceAfter - deployerBalanceBefore + gasUsed;
    
    console.log("   ✅ Claim successful!");
    console.log("   📝 Transaction Hash:", claimTx.hash);
    console.log("   ✅ Claimed Amount:", ethers.formatEther(claimed), "IP");
  } else {
    console.log("   ⚠️  No royalties to claim (may have already been claimed)");
  }
  console.log();

  // Test 7: Final state
  console.log("📊 Test 7: Final Contract State");
  console.log("─".repeat(50));
  const finalDeployerBalance = await bundleToken.balanceOf(deployer.address);
  const finalTester1Balance = await bundleToken.balanceOf(tester1.address);
  const finalTotalRoyalties = await bundleToken.totalRoyaltiesCollected();
  
  console.log("   ✅ Final Deployer Balance:", ethers.formatEther(finalDeployerBalance), symbol);
  console.log("   ✅ Final Tester 1 Balance:", ethers.formatEther(finalTester1Balance), symbol);
  console.log("   ✅ Total Royalties Collected:", ethers.formatEther(finalTotalRoyalties), "IP");
  console.log();

  console.log("🎉 All Tests Completed Successfully!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });

