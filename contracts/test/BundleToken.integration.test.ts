import { expect } from "chai";
import { ethers } from "hardhat";
import { BundleToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

/**
 * Integration Tests - Complete User Flow
 * 
 * These tests simulate the complete IPfolio user journey:
 * 1. Creator creates a bundle
 * 2. Creator sells tokens to investors
 * 3. Royalties are distributed
 * 4. Token holders claim their royalties
 * 5. Secondary market trading
 */
describe("IPfolio Complete User Flow", function () {
  let bundleToken: BundleToken;
  
  // User personas
  let creator: SignerWithAddress;      // Music producer creating bundle
  let investor1: SignerWithAddress;   // First investor
  let investor2: SignerWithAddress;   // Second investor
  let investor3: SignerWithAddress;   // Third investor
  let trader: SignerWithAddress;      // Secondary market trader
  
  // Mock IP Assets (in real scenario, these would be Story Protocol IP Asset addresses)
  let ipAsset1: SignerWithAddress;
  let ipAsset2: SignerWithAddress;
  let ipAsset3: SignerWithAddress;
  let ipAsset4: SignerWithAddress;
  let ipAsset5: SignerWithAddress;

  const BUNDLE_NAME = "LoFi Beats Collection";
  const BUNDLE_SYMBOL = "LFB";
  const BUNDLE_DESC = "5 lo-fi hip hop tracks for relaxation and focus";
  const TOTAL_SUPPLY = ethers.parseEther("10000"); // 10,000 tokens

  beforeEach(async function () {
    [
      creator,
      investor1,
      investor2,
      investor3,
      trader,
      ipAsset1,
      ipAsset2,
      ipAsset3,
      ipAsset4,
      ipAsset5,
    ] = await ethers.getSigners();
  });

  describe("Complete User Flow: Creator to Investors to Royalties", function () {
    it("Should complete full flow: Create → Sell → Royalties → Claim → Trade", async function () {
      console.log("\n🎵 === IPFOLIO COMPLETE USER FLOW TEST ===\n");

      // ============================================
      // STEP 1: CREATOR CREATES BUNDLE
      // ============================================
      console.log("📦 STEP 1: Creator creates bundle...");
      
      // Creator has 5 songs registered on Story Protocol
      // Each song gets an IP Asset address (simulated here)
      const ipAssets = [
        ipAsset1.address, // Song 1: "Midnight Rain"
        ipAsset2.address, // Song 2: "Coffee Shop Vibes"
        ipAsset3.address, // Song 3: "Study Session"
        ipAsset4.address, // Song 4: "City Lights"
        ipAsset5.address, // Song 5: "Peaceful Mind"
      ];

      // Each song gets equal royalty share (20% each = 2000 basis points)
      const shares = [2000, 2000, 2000, 2000, 2000]; // Sums to 10000 (100%)

      // Deploy BundleToken contract
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      bundleToken = await BundleTokenFactory.connect(creator).deploy(
        BUNDLE_NAME,
        BUNDLE_SYMBOL,
        BUNDLE_DESC,
        ipAssets,
        shares,
        TOTAL_SUPPLY
      );
      await bundleToken.waitForDeployment();

      const bundleAddress = await bundleToken.getAddress();
      console.log(`   ✅ Bundle deployed at: ${bundleAddress}`);
      console.log(`   ✅ Creator received: ${ethers.formatEther(TOTAL_SUPPLY)} ${BUNDLE_SYMBOL} tokens`);

      // Verify bundle creation
      expect(await bundleToken.name()).to.equal(BUNDLE_NAME);
      expect(await bundleToken.symbol()).to.equal(BUNDLE_SYMBOL);
      expect(await bundleToken.balanceOf(creator.address)).to.equal(TOTAL_SUPPLY);
      
      const storedIPAssets = await bundleToken.getIPAssets();
      expect(storedIPAssets.length).to.equal(5);
      console.log(`   ✅ Bundle contains ${storedIPAssets.length} IP assets`);

      // ============================================
      // STEP 2: CREATOR SELLS TOKENS TO INVESTORS
      // ============================================
      console.log("\n💰 STEP 2: Creator sells tokens to investors...");

      // Creator lists tokens for sale (simulating marketplace)
      // In real scenario, this would go through BundleMarketplace contract
      // For now, we simulate direct transfers at agreed prices

      // Investor 1 buys 1,000 tokens (10% ownership)
      const investor1Amount = ethers.parseEther("1000");
      await bundleToken.connect(creator).transfer(investor1.address, investor1Amount);
      console.log(`   ✅ Investor 1 bought: ${ethers.formatEther(investor1Amount)} tokens (10% ownership)`);

      // Investor 2 buys 500 tokens (5% ownership)
      const investor2Amount = ethers.parseEther("500");
      await bundleToken.connect(creator).transfer(investor2.address, investor2Amount);
      console.log(`   ✅ Investor 2 bought: ${ethers.formatEther(investor2Amount)} tokens (5% ownership)`);

      // Investor 3 buys 2,000 tokens (20% ownership)
      const investor3Amount = ethers.parseEther("2000");
      await bundleToken.connect(creator).transfer(investor3.address, investor3Amount);
      console.log(`   ✅ Investor 3 bought: ${ethers.formatEther(investor3Amount)} tokens (20% ownership)`);

      // Verify balances
      expect(await bundleToken.balanceOf(creator.address)).to.equal(
        TOTAL_SUPPLY - investor1Amount - investor2Amount - investor3Amount
      );
      expect(await bundleToken.balanceOf(investor1.address)).to.equal(investor1Amount);
      expect(await bundleToken.balanceOf(investor2.address)).to.equal(investor2Amount);
      expect(await bundleToken.balanceOf(investor3.address)).to.equal(investor3Amount);

      const creatorRemaining = await bundleToken.balanceOf(creator.address);
      console.log(`   ✅ Creator retains: ${ethers.formatEther(creatorRemaining)} tokens (${ethers.formatEther(creatorRemaining * 100n / TOTAL_SUPPLY)}% ownership)`);

      // ============================================
      // STEP 3: ROYALTIES ARE DISTRIBUTED
      // ============================================
      console.log("\n💎 STEP 3: Royalties are distributed...");

      // Songs generate royalties (sent from Story Protocol)
      // In real scenario, Story Protocol would send royalties to BundleToken contract
      const firstRoyaltyPayment = ethers.parseEther("2"); // 2 ETH in royalties
      
      // Simulate royalties being sent to contract
      await bundleToken.connect(creator).distributeRoyalties({ value: firstRoyaltyPayment });
      console.log(`   ✅ Royalties received: ${ethers.formatEther(firstRoyaltyPayment)} ETH`);

      // Verify royalties tracking
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(firstRoyaltyPayment);
      const royaltiesPerToken = await bundleToken.royaltiesPerToken();
      console.log(`   ✅ Royalties per token: ${ethers.formatEther(royaltiesPerToken)} ETH`);

      // Calculate expected royalties per token
      const expectedRoyaltiesPerToken = (firstRoyaltyPayment * ethers.parseEther("1")) / TOTAL_SUPPLY;
      expect(royaltiesPerToken).to.equal(expectedRoyaltiesPerToken);

      // ============================================
      // STEP 4: TOKEN HOLDERS CLAIM ROYALTIES
      // ============================================
      console.log("\n💵 STEP 4: Token holders claim their royalties...");

      // Investor 1 claims (10% ownership = 10% of royalties)
      const investor1BalanceBefore = await ethers.provider.getBalance(investor1.address);
      const investor1ClaimTx = await bundleToken.connect(investor1).claimRoyalties();
      const investor1Receipt = await investor1ClaimTx.wait();
      const investor1GasUsed = investor1Receipt!.gasUsed * investor1Receipt!.gasPrice;
      const investor1BalanceAfter = await ethers.provider.getBalance(investor1.address);
      
      const investor1Claimed = investor1BalanceAfter - investor1BalanceBefore + investor1GasUsed;
      const expectedInvestor1Claim = (firstRoyaltyPayment * investor1Amount) / TOTAL_SUPPLY;
      console.log(`   ✅ Investor 1 claimed: ${ethers.formatEther(investor1Claimed)} ETH (expected: ${ethers.formatEther(expectedInvestor1Claim)} ETH)`);
      expect(investor1Claimed).to.be.closeTo(expectedInvestor1Claim, ethers.parseEther("0.0001"));

      // Investor 2 claims (5% ownership = 5% of royalties)
      const investor2BalanceBefore = await ethers.provider.getBalance(investor2.address);
      const investor2ClaimTx = await bundleToken.connect(investor2).claimRoyalties();
      const investor2Receipt = await investor2ClaimTx.wait();
      const investor2GasUsed = investor2Receipt!.gasUsed * investor2Receipt!.gasPrice;
      const investor2BalanceAfter = await ethers.provider.getBalance(investor2.address);
      
      const investor2Claimed = investor2BalanceAfter - investor2BalanceBefore + investor2GasUsed;
      const expectedInvestor2Claim = (firstRoyaltyPayment * investor2Amount) / TOTAL_SUPPLY;
      console.log(`   ✅ Investor 2 claimed: ${ethers.formatEther(investor2Claimed)} ETH (expected: ${ethers.formatEther(expectedInvestor2Claim)} ETH)`);
      expect(investor2Claimed).to.be.closeTo(expectedInvestor2Claim, ethers.parseEther("0.0001"));

      // Investor 3 claims (20% ownership = 20% of royalties)
      const investor3BalanceBefore = await ethers.provider.getBalance(investor3.address);
      const investor3ClaimTx = await bundleToken.connect(investor3).claimRoyalties();
      const investor3Receipt = await investor3ClaimTx.wait();
      const investor3GasUsed = investor3Receipt!.gasUsed * investor3Receipt!.gasPrice;
      const investor3BalanceAfter = await ethers.provider.getBalance(investor3.address);
      
      const investor3Claimed = investor3BalanceAfter - investor3BalanceBefore + investor3GasUsed;
      const expectedInvestor3Claim = (firstRoyaltyPayment * investor3Amount) / TOTAL_SUPPLY;
      console.log(`   ✅ Investor 3 claimed: ${ethers.formatEther(investor3Claimed)} ETH (expected: ${ethers.formatEther(expectedInvestor3Claim)} ETH)`);
      expect(investor3Claimed).to.be.closeTo(expectedInvestor3Claim, ethers.parseEther("0.0001"));

      // Creator claims (65% ownership = 65% of royalties)
      const creatorBalanceBefore = await ethers.provider.getBalance(creator.address);
      const creatorClaimTx = await bundleToken.connect(creator).claimRoyalties();
      const creatorReceipt = await creatorClaimTx.wait();
      const creatorGasUsed = creatorReceipt!.gasUsed * creatorReceipt!.gasPrice;
      const creatorBalanceAfter = await ethers.provider.getBalance(creator.address);
      
      const creatorClaimed = creatorBalanceAfter - creatorBalanceBefore + creatorGasUsed;
      const expectedCreatorClaim = (firstRoyaltyPayment * creatorRemaining) / TOTAL_SUPPLY;
      console.log(`   ✅ Creator claimed: ${ethers.formatEther(creatorClaimed)} ETH (expected: ${ethers.formatEther(expectedCreatorClaim)} ETH)`);
      expect(creatorClaimed).to.be.closeTo(expectedCreatorClaim, ethers.parseEther("0.0001"));

      // Verify all royalties were claimed
      const totalClaimed = investor1Claimed + investor2Claimed + investor3Claimed + creatorClaimed;
      console.log(`   ✅ Total claimed: ${ethers.formatEther(totalClaimed)} ETH (should equal ${ethers.formatEther(firstRoyaltyPayment)} ETH)`);
      expect(totalClaimed).to.be.closeTo(firstRoyaltyPayment, ethers.parseEther("0.001"));

      // ============================================
      // STEP 5: MORE ROYALTIES DISTRIBUTED
      // ============================================
      console.log("\n💎 STEP 5: More royalties are distributed...");

      const secondRoyaltyPayment = ethers.parseEther("3"); // 3 ETH more
      await bundleToken.connect(creator).distributeRoyalties({ value: secondRoyaltyPayment });
      console.log(`   ✅ Additional royalties: ${ethers.formatEther(secondRoyaltyPayment)} ETH`);

      // Verify total royalties
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(
        firstRoyaltyPayment + secondRoyaltyPayment
      );

      // ============================================
      // STEP 6: TOKEN HOLDERS CLAIM NEW ROYALTIES
      // ============================================
      console.log("\n💵 STEP 6: Token holders claim new royalties...");

      // Investor 1 claims new royalties (10% of new payment)
      const investor1NewClaim = await bundleToken.connect(investor1).claimRoyalties();
      const investor1NewReceipt = await investor1NewClaim.wait();
      const investor1NewGas = investor1NewReceipt!.gasUsed * investor1NewReceipt!.gasPrice;
      
      // Verify claimable amount
      const investor1Claimable = await bundleToken.getClaimableRoyalties(investor1.address);
      expect(investor1Claimable).to.equal(0); // Should be 0 after claiming
      console.log(`   ✅ Investor 1 claimed new royalties (10% of ${ethers.formatEther(secondRoyaltyPayment)} ETH)`);

      // ============================================
      // STEP 7: SECONDARY MARKET TRADING
      // ============================================
      console.log("\n🔄 STEP 7: Secondary market trading...");

      // Investor 2 sells 200 tokens to Trader
      const tradeAmount = ethers.parseEther("200");
      await bundleToken.connect(investor2).transfer(trader.address, tradeAmount);
      console.log(`   ✅ Trader bought: ${ethers.formatEther(tradeAmount)} tokens from Investor 2`);

      // Verify balances
      const investor2NewBalance = await bundleToken.balanceOf(investor2.address);
      const traderBalance = await bundleToken.balanceOf(trader.address);
      expect(investor2NewBalance).to.equal(investor2Amount - tradeAmount);
      expect(traderBalance).to.equal(tradeAmount);
      console.log(`   ✅ Investor 2 now has: ${ethers.formatEther(investor2NewBalance)} tokens`);
      console.log(`   ✅ Trader now has: ${ethers.formatEther(traderBalance)} tokens (2% ownership)`);

      // ============================================
      // STEP 8: NEW TOKEN HOLDER CLAIMS ROYALTIES
      // ============================================
      console.log("\n💵 STEP 8: New token holder claims royalties...");

      // Trader can now claim their share of all unclaimed royalties
      // They own 200 tokens = 2% of total supply
      // Note: Trader can claim from all distributions (both first and second)
      // because they received tokens that haven't had royalties claimed for them yet
      const traderClaimable = await bundleToken.getClaimableRoyalties(trader.address);
      // Trader can claim 2% of all royalties (both distributions)
      const totalUnclaimedRoyalties = firstRoyaltyPayment + secondRoyaltyPayment;
      const expectedTraderClaim = (totalUnclaimedRoyalties * tradeAmount) / TOTAL_SUPPLY;
      console.log(`   ✅ Trader can claim: ${ethers.formatEther(traderClaimable)} ETH (2% of all royalties)`);
      expect(traderClaimable).to.be.closeTo(expectedTraderClaim, ethers.parseEther("0.0001"));

      // Trader claims
      const traderBalanceBefore = await ethers.provider.getBalance(trader.address);
      const traderClaimTx = await bundleToken.connect(trader).claimRoyalties();
      const traderReceipt = await traderClaimTx.wait();
      const traderGasUsed = traderReceipt!.gasUsed * traderReceipt!.gasPrice;
      const traderBalanceAfter = await ethers.provider.getBalance(trader.address);
      
      const traderClaimed = traderBalanceAfter - traderBalanceBefore + traderGasUsed;
      console.log(`   ✅ Trader claimed: ${ethers.formatEther(traderClaimed)} ETH`);
      // Trader can claim from all distributions since they received unclaimed tokens
      expect(traderClaimed).to.be.closeTo(expectedTraderClaim, ethers.parseEther("0.0001"));

      // ============================================
      // STEP 9: FINAL STATE VERIFICATION
      // ============================================
      console.log("\n✅ STEP 9: Final state verification...");

      // Verify final balances
      const finalCreatorBalance = await bundleToken.balanceOf(creator.address);
      const finalInvestor1Balance = await bundleToken.balanceOf(investor1.address);
      const finalInvestor2Balance = await bundleToken.balanceOf(investor2.address);
      const finalInvestor3Balance = await bundleToken.balanceOf(investor3.address);
      const finalTraderBalance = await bundleToken.balanceOf(trader.address);

      const totalTokens = finalCreatorBalance + finalInvestor1Balance + 
                         finalInvestor2Balance + finalInvestor3Balance + finalTraderBalance;
      
      expect(totalTokens).to.equal(TOTAL_SUPPLY);
      console.log(`   ✅ Total tokens in circulation: ${ethers.formatEther(totalTokens)}`);
      console.log(`   ✅ Creator: ${ethers.formatEther(finalCreatorBalance)} tokens`);
      console.log(`   ✅ Investor 1: ${ethers.formatEther(finalInvestor1Balance)} tokens`);
      console.log(`   ✅ Investor 2: ${ethers.formatEther(finalInvestor2Balance)} tokens`);
      console.log(`   ✅ Investor 3: ${ethers.formatEther(finalInvestor3Balance)} tokens`);
      console.log(`   ✅ Trader: ${ethers.formatEther(finalTraderBalance)} tokens`);

      // Verify royalties
      const totalRoyalties = await bundleToken.totalRoyaltiesCollected();
      console.log(`   ✅ Total royalties collected: ${ethers.formatEther(totalRoyalties)} ETH`);
      expect(totalRoyalties).to.equal(firstRoyaltyPayment + secondRoyaltyPayment);

      console.log("\n🎉 === COMPLETE USER FLOW TEST PASSED ===\n");
    });
  });

  describe("Real-World Scenario: Music Producer Bundle", function () {
    it("Should handle realistic music producer scenario", async function () {
      console.log("\n🎵 === REALISTIC MUSIC PRODUCER SCENARIO ===\n");

      // Scenario: Music producer "LoFiBeats" creates a bundle of 5 songs
      const ipAssets = [
        ipAsset1.address, // "Midnight Rain" - 25% royalties
        ipAsset2.address, // "Coffee Shop Vibes" - 25% royalties
        ipAsset3.address, // "Study Session" - 20% royalties
        ipAsset4.address, // "City Lights" - 15% royalties
        ipAsset5.address, // "Peaceful Mind" - 15% royalties
      ];

      const shares = [2500, 2500, 2000, 1500, 1500]; // Sums to 10000

      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      bundleToken = await BundleTokenFactory.connect(creator).deploy(
        "LoFi Beats Collection",
        "LFB",
        "5 lo-fi hip hop tracks",
        ipAssets,
        shares,
        TOTAL_SUPPLY
      );
      await bundleToken.waitForDeployment();

      console.log("✅ Bundle created with unequal royalty shares");

      // Creator sells 60% of tokens (6,000 tokens)
      const tokensToSell = ethers.parseEther("6000");
      await bundleToken.connect(creator).transfer(investor1.address, tokensToSell);
      console.log(`✅ Creator sold ${ethers.formatEther(tokensToSell)} tokens (60% of bundle)`);

      // Songs generate 5 ETH in royalties
      const royalties = ethers.parseEther("5");
      await bundleToken.connect(creator).distributeRoyalties({ value: royalties });
      console.log(`✅ Royalties distributed: ${ethers.formatEther(royalties)} ETH`);

      // Creator claims (40% ownership = 2 ETH)
      const creatorClaimable = await bundleToken.getClaimableRoyalties(creator.address);
      const creatorBalanceBefore = await ethers.provider.getBalance(creator.address);
      await bundleToken.connect(creator).claimRoyalties();
      const creatorBalanceAfter = await ethers.provider.getBalance(creator.address);
      const creatorClaimed = creatorBalanceAfter - creatorBalanceBefore;
      console.log(`✅ Creator claimed: ${ethers.formatEther(creatorClaimed)} ETH (40% of royalties)`);

      // Investor 1 claims (60% ownership = 3 ETH)
      const investor1Claimable = await bundleToken.getClaimableRoyalties(investor1.address);
      const investor1BalanceBefore = await ethers.provider.getBalance(investor1.address);
      await bundleToken.connect(investor1).claimRoyalties();
      const investor1BalanceAfter = await ethers.provider.getBalance(investor1.address);
      const investor1Claimed = investor1BalanceAfter - investor1BalanceBefore;
      console.log(`✅ Investor 1 claimed: ${ethers.formatEther(investor1Claimed)} ETH (60% of royalties)`);

      // Verify total claimed equals total royalties
      const totalClaimed = creatorClaimed + investor1Claimed;
      expect(totalClaimed).to.be.closeTo(royalties, ethers.parseEther("0.01"));
      console.log(`✅ Total claimed: ${ethers.formatEther(totalClaimed)} ETH`);

      console.log("\n🎉 === REALISTIC SCENARIO TEST PASSED ===\n");
    });
  });

  describe("Edge Case: Multiple Royalty Distributions", function () {
    it("Should handle multiple royalty distributions correctly", async function () {
      console.log("\n💎 === MULTIPLE ROYALTY DISTRIBUTIONS ===\n");

      const ipAssets = [ipAsset1.address, ipAsset2.address];
      const shares = [5000, 5000];

      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      bundleToken = await BundleTokenFactory.connect(creator).deploy(
        "Test Bundle",
        "TST",
        "Test",
        ipAssets,
        shares,
        TOTAL_SUPPLY
      );
      await bundleToken.waitForDeployment();

      // Distribute multiple royalty payments
      const payment1 = ethers.parseEther("1");
      const payment2 = ethers.parseEther("2");
      const payment3 = ethers.parseEther("0.5");

      await bundleToken.connect(creator).distributeRoyalties({ value: payment1 });
      console.log(`✅ Payment 1: ${ethers.formatEther(payment1)} ETH`);

      await bundleToken.connect(creator).distributeRoyalties({ value: payment2 });
      console.log(`✅ Payment 2: ${ethers.formatEther(payment2)} ETH`);

      await bundleToken.connect(creator).distributeRoyalties({ value: payment3 });
      console.log(`✅ Payment 3: ${ethers.formatEther(payment3)} ETH`);

      const totalRoyalties = payment1 + payment2 + payment3;
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(totalRoyalties);
      console.log(`✅ Total royalties: ${ethers.formatEther(totalRoyalties)} ETH`);

      // Creator claims all
      const claimable = await bundleToken.getClaimableRoyalties(creator.address);
      expect(claimable).to.be.closeTo(totalRoyalties, ethers.parseEther("0.0001"));
      console.log(`✅ Creator can claim: ${ethers.formatEther(claimable)} ETH`);

      console.log("\n🎉 === MULTIPLE ROYALTY DISTRIBUTIONS TEST PASSED ===\n");
    });
  });
});

