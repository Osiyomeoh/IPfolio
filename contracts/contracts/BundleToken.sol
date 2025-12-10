// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BundleToken
 * @notice ERC-20 token representing fractional ownership of an IP bundle
 */
contract BundleToken is ERC20, Ownable, ReentrancyGuard {
    address[] public ipAssets;
    mapping(address => uint256) public royaltyShares;
    
    uint256 public totalRoyaltiesCollected;
    uint256 public royaltiesPerToken;
    mapping(address => uint256) public royaltiesClaimedPerToken;
    
    string public bundleDescription;
    uint256 public createdAt;
    
    event RoyaltiesDistributed(uint256 amount, uint256 newRoyaltiesPerToken);
    event RoyaltiesClaimed(address indexed user, uint256 amount);
    event IPAssetAdded(address indexed ipAsset, uint256 share);
    
    constructor(
        string memory name_,
        string memory symbol_,
        string memory description_,
        address[] memory ipAssets_,
        uint256[] memory shares_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        require(ipAssets_.length > 0, "Must have at least one IP asset");
        require(ipAssets_.length == shares_.length, "Arrays length mismatch");
        
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares_.length; i++) {
            totalShares += shares_[i];
            ipAssets.push(ipAssets_[i]);
            royaltyShares[ipAssets_[i]] = shares_[i];
            emit IPAssetAdded(ipAssets_[i], shares_[i]);
        }
        require(totalShares == 10000, "Shares must sum to 100%");
        
        bundleDescription = description_;
        createdAt = block.timestamp;
        _mint(msg.sender, totalSupply_);
    }
    
    function distributeRoyalties() external payable nonReentrant {
        require(msg.value > 0, "No royalties to distribute");
        require(totalSupply() > 0, "No tokens exist");
        
        totalRoyaltiesCollected += msg.value;
        uint256 royaltiesPerTokenIncrease = (msg.value * 1e18) / totalSupply();
        royaltiesPerToken += royaltiesPerTokenIncrease;
        
        emit RoyaltiesDistributed(msg.value, royaltiesPerToken);
    }
    
    function claimRoyalties() external nonReentrant returns (uint256) {
        uint256 balance = balanceOf(msg.sender);
        require(balance > 0, "No tokens held");
        
        uint256 unclaimedRoyaltiesPerToken = royaltiesPerToken - royaltiesClaimedPerToken[msg.sender];
        uint256 amount = (balance * unclaimedRoyaltiesPerToken) / 1e18;
        
        require(amount > 0, "No royalties to claim");
        
        royaltiesClaimedPerToken[msg.sender] = royaltiesPerToken;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit RoyaltiesClaimed(msg.sender, amount);
        return amount;
    }
    
    function getClaimableRoyalties(address account) external view returns (uint256) {
        uint256 balance = balanceOf(account);
        if (balance == 0) return 0;
        
        uint256 unclaimedRoyaltiesPerToken = royaltiesPerToken - royaltiesClaimedPerToken[account];
        return (balance * unclaimedRoyaltiesPerToken) / 1e18;
    }
    
    function getIPAssets() external view returns (address[] memory) {
        return ipAssets;
    }
    
    receive() external payable {
        if (msg.value > 0) {
            this.distributeRoyalties{value: msg.value}();
        }
    }
}
