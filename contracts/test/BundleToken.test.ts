import { expect } from "chai";
import { ethers } from "hardhat";
import { BundleToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("BundleToken", function () {
  let bundleToken: BundleToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  const BUNDLE_NAME = "Test Bundle";
  const BUNDLE_SYMBOL = "TBDL";
  const BUNDLE_DESC = "Test IP Bundle";
  const TOTAL_SUPPLY = ethers.parseEther("10000");

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const ipAssets = [addr1.address, addr2.address];
    const shares = [5000, 5000]; // 50% each

    const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
    bundleToken = await BundleTokenFactory.deploy(
      BUNDLE_NAME,
      BUNDLE_SYMBOL,
      BUNDLE_DESC,
      ipAssets,
      shares,
      TOTAL_SUPPLY
    );
    await bundleToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await bundleToken.name()).to.equal(BUNDLE_NAME);
      expect(await bundleToken.symbol()).to.equal(BUNDLE_SYMBOL);
    });

    it("Should mint initial supply to owner", async function () {
      expect(await bundleToken.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("Should store IP assets correctly", async function () {
      const ipAssets = await bundleToken.getIPAssets();
      expect(ipAssets.length).to.equal(2);
      expect(ipAssets[0]).to.equal(addr1.address);
      expect(ipAssets[1]).to.equal(addr2.address);
    });

    it("Should store bundle description", async function () {
      expect(await bundleToken.bundleDescription()).to.equal(BUNDLE_DESC);
    });

    it("Should set createdAt timestamp", async function () {
      const createdAt = await bundleToken.createdAt();
      expect(createdAt).to.be.gt(0);
      expect(createdAt).to.be.closeTo(await ethers.provider.getBlock("latest").then(b => b!.timestamp), 5);
    });

    it("Should store royalty shares correctly", async function () {
      expect(await bundleToken.royaltyShares(addr1.address)).to.equal(5000);
      expect(await bundleToken.royaltyShares(addr2.address)).to.equal(5000);
    });

    it("Should revert if IP assets array is empty", async function () {
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      await expect(
        BundleTokenFactory.deploy(
          BUNDLE_NAME,
          BUNDLE_SYMBOL,
          BUNDLE_DESC,
          [],
          [],
          TOTAL_SUPPLY
        )
      ).to.be.revertedWith("Must have at least one IP asset");
    });

    it("Should revert if IP assets and shares arrays length mismatch", async function () {
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      await expect(
        BundleTokenFactory.deploy(
          BUNDLE_NAME,
          BUNDLE_SYMBOL,
          BUNDLE_DESC,
          [addr1.address],
          [5000, 5000],
          TOTAL_SUPPLY
        )
      ).to.be.revertedWith("Arrays length mismatch");
    });

    it("Should revert if shares don't sum to 10000", async function () {
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      await expect(
        BundleTokenFactory.deploy(
          BUNDLE_NAME,
          BUNDLE_SYMBOL,
          BUNDLE_DESC,
          [addr1.address, addr2.address],
          [5000, 4000], // Only 9000, not 10000
          TOTAL_SUPPLY
        )
      ).to.be.revertedWith("Shares must sum to 100%");
    });

    it("Should work with single IP asset", async function () {
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      const singleIPBundle = await BundleTokenFactory.deploy(
        "Single IP Bundle",
        "SIP",
        "Single IP",
        [addr1.address],
        [10000],
        TOTAL_SUPPLY
      );
      await singleIPBundle.waitForDeployment();
      
      const ipAssets = await singleIPBundle.getIPAssets();
      expect(ipAssets.length).to.equal(1);
      expect(ipAssets[0]).to.equal(addr1.address);
      expect(await singleIPBundle.royaltyShares(addr1.address)).to.equal(10000);
    });

    it("Should work with multiple IP assets (3+)", async function () {
      const BundleTokenFactory = await ethers.getContractFactory("BundleToken");
      const multiIPBundle = await BundleTokenFactory.deploy(
        "Multi IP Bundle",
        "MIP",
        "Multiple IPs",
        [addr1.address, addr2.address, addr3.address],
        [3333, 3333, 3334], // Sums to 10000
        TOTAL_SUPPLY
      );
      await multiIPBundle.waitForDeployment();
      
      const ipAssets = await multiIPBundle.getIPAssets();
      expect(ipAssets.length).to.equal(3);
    });
  });

  describe("Royalty Distribution", function () {
    it("Should distribute royalties correctly", async function () {
      const royaltyAmount = ethers.parseEther("1");
      
      await bundleToken.distributeRoyalties({ value: royaltyAmount });
      
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(royaltyAmount);
      expect(await bundleToken.royaltiesPerToken()).to.be.gt(0);
    });

    it("Should revert if trying to distribute zero royalties", async function () {
      await expect(
        bundleToken.distributeRoyalties({ value: 0 })
      ).to.be.revertedWith("No royalties to distribute");
    });

    it("Should update royaltiesPerToken correctly", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });
      
      const expectedRoyaltiesPerToken = (royaltyAmount * ethers.parseEther("1")) / TOTAL_SUPPLY;
      expect(await bundleToken.royaltiesPerToken()).to.equal(expectedRoyaltiesPerToken);
    });

    it("Should handle multiple royalty distributions", async function () {
      const royalty1 = ethers.parseEther("1");
      const royalty2 = ethers.parseEther("2");
      const royalty3 = ethers.parseEther("0.5");
      
      await bundleToken.distributeRoyalties({ value: royalty1 });
      await bundleToken.distributeRoyalties({ value: royalty2 });
      await bundleToken.distributeRoyalties({ value: royalty3 });
      
      const totalExpected = royalty1 + royalty2 + royalty3;
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(totalExpected);
    });

    it("Should emit RoyaltiesDistributed event", async function () {
      const royaltyAmount = ethers.parseEther("1");
      const tx = bundleToken.distributeRoyalties({ value: royaltyAmount });
      await expect(tx)
        .to.emit(bundleToken, "RoyaltiesDistributed")
        .withArgs(royaltyAmount, (value: bigint) => value > 0n);
    });

    it("Should allow anyone to distribute royalties", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await expect(
        bundleToken.connect(addr3).distributeRoyalties({ value: royaltyAmount })
      ).to.not.be.reverted;
      
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(royaltyAmount);
    });
  });

  describe("Royalty Claiming", function () {
    beforeEach(async function () {
      // Transfer tokens to multiple users
      await bundleToken.transfer(addr1.address, ethers.parseEther("3000")); // 30%
      await bundleToken.transfer(addr2.address, ethers.parseEther("2000")); // 20%
      // Owner keeps 50%
    });

    it("Should allow claiming royalties", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable).to.be.closeTo(royaltyAmount * 3000n / 10000n, ethers.parseEther("0.0001"));

      const balanceBefore = await ethers.provider.getBalance(addr1.address);
      const tx = await bundleToken.connect(addr1).claimRoyalties();
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;
      const balanceAfter = await ethers.provider.getBalance(addr1.address);

      expect(balanceAfter - balanceBefore + gasUsed).to.be.closeTo(
        royaltyAmount * 3000n / 10000n,
        ethers.parseEther("0.0001")
      );
    });

    it("Should revert if user has no tokens", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      await expect(
        bundleToken.connect(addr3).claimRoyalties()
      ).to.be.revertedWith("No tokens held");
    });

    it("Should revert if no royalties to claim", async function () {
      await expect(
        bundleToken.connect(addr1).claimRoyalties()
      ).to.be.revertedWith("No royalties to claim");
    });

    it("Should return zero claimable for zero balance", async function () {
      expect(await bundleToken.getClaimableRoyalties(addr3.address)).to.equal(0);
    });

    it("Should return zero claimable when no royalties distributed", async function () {
      expect(await bundleToken.getClaimableRoyalties(addr1.address)).to.equal(0);
    });

    it("Should allow multiple users to claim their share", async function () {
      const royaltyAmount = ethers.parseEther("10");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      // addr1 should get 30% (3000/10000)
      const claimable1 = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable1).to.be.closeTo(royaltyAmount * 3000n / 10000n, ethers.parseEther("0.0001"));

      // addr2 should get 20% (2000/10000)
      const claimable2 = await bundleToken.getClaimableRoyalties(addr2.address);
      expect(claimable2).to.be.closeTo(royaltyAmount * 2000n / 10000n, ethers.parseEther("0.0001"));

      // Owner should get 50% (5000/10000)
      const claimableOwner = await bundleToken.getClaimableRoyalties(owner.address);
      expect(claimableOwner).to.be.closeTo(royaltyAmount * 5000n / 10000n, ethers.parseEther("0.0001"));
    });

    it("Should update royaltiesClaimedPerToken after claiming", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const royaltiesPerTokenBefore = await bundleToken.royaltiesPerToken();
      await bundleToken.connect(addr1).claimRoyalties();
      
      const claimedPerToken = await bundleToken.royaltiesClaimedPerToken(addr1.address);
      expect(claimedPerToken).to.equal(royaltiesPerTokenBefore);
    });

    it("Should not allow double claiming", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      await bundleToken.connect(addr1).claimRoyalties();
      
      // Second claim should revert
      await expect(
        bundleToken.connect(addr1).claimRoyalties()
      ).to.be.revertedWith("No royalties to claim");
    });

    it("Should allow claiming after new royalties are distributed", async function () {
      const royalty1 = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royalty1 });
      await bundleToken.connect(addr1).claimRoyalties();

      // Distribute more royalties
      const royalty2 = ethers.parseEther("2");
      await bundleToken.distributeRoyalties({ value: royalty2 });

      // Should be able to claim the new royalties
      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable).to.be.closeTo(royalty2 * 3000n / 10000n, ethers.parseEther("0.0001"));
    });

    it("Should emit RoyaltiesClaimed event", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      await expect(bundleToken.connect(addr1).claimRoyalties())
        .to.emit(bundleToken, "RoyaltiesClaimed")
        .withArgs(addr1.address, claimable);
    });

    it("Should return correct claimable amount", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const expectedClaimable = (royaltyAmount * ethers.parseEther("3000")) / TOTAL_SUPPLY;
      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable).to.be.closeTo(expectedClaimable, ethers.parseEther("0.0001"));
    });

    it("Should handle partial token holdings correctly", async function () {
      // Transfer small amount to addr3
      await bundleToken.transfer(addr3.address, ethers.parseEther("100")); // 1%
      
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const claimable = await bundleToken.getClaimableRoyalties(addr3.address);
      expect(claimable).to.be.closeTo(royaltyAmount * 100n / 10000n, ethers.parseEther("0.0001"));
    });
  });

  describe("Token Transfers and Royalties", function () {
    it("Should allow new token holders to claim royalties after transfer", async function () {
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      // Transfer tokens after royalties distributed
      await bundleToken.transfer(addr1.address, ethers.parseEther("1000"));

      // New holder should be able to claim proportional share
      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable).to.be.closeTo(royaltyAmount * 1000n / 10000n, ethers.parseEther("0.0001"));
    });

    it("Should handle royalties correctly when token holdings change", async function () {
      // Transfer tokens to multiple addresses first
      await bundleToken.transfer(addr1.address, ethers.parseEther("1000")); // Owner now has 9000
      await bundleToken.transfer(addr2.address, ethers.parseEther("1000")); // Owner now has 8000
      await bundleToken.transfer(addr3.address, ethers.parseEther("2000")); // Owner now has 6000

      // Now distribute royalties - should be distributed based on current holdings
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      // Owner now has 6000 tokens out of 10000 total, so should get 60% of royalties
      const ownerClaimable = await bundleToken.getClaimableRoyalties(owner.address);
      expect(ownerClaimable).to.be.closeTo(royaltyAmount * 6000n / 10000n, ethers.parseEther("0.0001"));
      
      // addr1 has 1000 tokens, should get 10% of royalties
      const addr1Claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(addr1Claimable).to.be.closeTo(royaltyAmount * 1000n / 10000n, ethers.parseEther("0.0001"));
      
      // addr2 has 1000 tokens, should get 10% of royalties
      const addr2Claimable = await bundleToken.getClaimableRoyalties(addr2.address);
      expect(addr2Claimable).to.be.closeTo(royaltyAmount * 1000n / 10000n, ethers.parseEther("0.0001"));
      
      // addr3 has 2000 tokens, should get 20% of royalties
      const addr3Claimable = await bundleToken.getClaimableRoyalties(addr3.address);
      expect(addr3Claimable).to.be.closeTo(royaltyAmount * 2000n / 10000n, ethers.parseEther("0.0001"));
    });
  });

  describe("Receive Function", function () {
    it("Should automatically distribute royalties when ETH is sent", async function () {
      const royaltyAmount = ethers.parseEther("1");
      
      await expect(
        addr1.sendTransaction({
          to: await bundleToken.getAddress(),
          value: royaltyAmount
        })
      ).to.emit(bundleToken, "RoyaltiesDistributed");

      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(royaltyAmount);
    });

    it("Should handle zero value in receive function", async function () {
      await expect(
        addr1.sendTransaction({
          to: await bundleToken.getAddress(),
          value: 0
        })
      ).to.not.be.reverted;
    });
  });

  describe("Edge Cases", function () {
    it("Should handle very small royalty amounts", async function () {
      const smallRoyalty = ethers.parseEther("0.000001");
      await bundleToken.distributeRoyalties({ value: smallRoyalty });
      
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(smallRoyalty);
    });

    it("Should handle very large royalty amounts", async function () {
      // Use a large but reasonable amount (100 ETH) that should be within test account balance
      const largeRoyalty = ethers.parseEther("100");
      await bundleToken.distributeRoyalties({ value: largeRoyalty });
      
      expect(await bundleToken.totalRoyaltiesCollected()).to.equal(largeRoyalty);
    });

    it("Should handle royalties when all tokens are transferred away from owner", async function () {
      await bundleToken.transfer(addr1.address, TOTAL_SUPPLY);
      
      const royaltyAmount = ethers.parseEther("1");
      await bundleToken.distributeRoyalties({ value: royaltyAmount });

      const claimable = await bundleToken.getClaimableRoyalties(addr1.address);
      expect(claimable).to.be.closeTo(royaltyAmount, ethers.parseEther("0.0001"));
    });
  });

  describe("IP Assets Management", function () {
    it("Should return correct IP assets array", async function () {
      const ipAssets = await bundleToken.getIPAssets();
      expect(ipAssets.length).to.equal(2);
      expect(ipAssets[0]).to.equal(addr1.address);
      expect(ipAssets[1]).to.equal(addr2.address);
    });

    it("Should maintain IP assets after multiple operations", async function () {
      await bundleToken.distributeRoyalties({ value: ethers.parseEther("1") });
      await bundleToken.transfer(addr1.address, ethers.parseEther("1000"));
      
      const ipAssets = await bundleToken.getIPAssets();
      expect(ipAssets.length).to.equal(2);
    });
  });
});
