import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader, Wallet, Coins, Percent, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { ethers } from 'ethers';
import { BUNDLE_TOKEN_ABI } from '../services/contractService';
import type { Address } from 'viem';
import { toast } from '../utils/toast';

/**
 * Bundle Trading Component
 * 
 * Allows users to buy/sell bundle tokens.
 * Uses ERC-20 transfer functionality for trading.
 * 
 * In production, this could integrate with a DEX or order book.
 */

interface BundleTradingProps {
  bundleAddress: Address;
  bundleSymbol: string;
  bundleName: string;
}

export default function BundleTrading({ bundleAddress, bundleSymbol, bundleName }: BundleTradingProps) {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [totalSupply, setTotalSupply] = useState<string>('0');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price] = useState('0.01'); // Price per token in IP/ETH
  const [recipientAddress, setRecipientAddress] = useState<string>(''); // For selling - recipient address
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    if (isConnected && bundleAddress && address) {
      loadBundleData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, bundleAddress, address]);

  const loadBundleData = async () => {
    if (!walletClient || !address) return;

    try {
      const provider = new BrowserProvider(walletClient as any);
      const contract = new ethers.Contract(
        bundleAddress,
        BUNDLE_TOKEN_ABI,
        provider
      );

      const [userBalance, supply] = await Promise.all([
        contract.balanceOf(address),
        contract.totalSupply(),
      ]);

      setBalance(ethers.formatEther(userBalance));
      setTotalSupply(ethers.formatEther(supply));
    } catch (error) {
      console.error('Error loading bundle data:', error);
    }
  };

  const handleTrade = async () => {
    if (!walletClient || !address || !amount) {
      toast.warning('Please connect wallet and enter amount');
      return;
    }

    setIsLoading(true);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      if (tradeType === 'buy') {
        // For buying, we need to find a seller or use a simple transfer
        // In production, this would use a DEX or order book
        // For demo: We'll simulate buying from the contract owner
        toast.info(
          `Buying ${amount} ${bundleSymbol} tokens...\n\nIn production, this would:\n1. Find available sellers\n2. Execute trade via DEX/order book\n3. Transfer tokens to buyer\n\nFor demo, you can ask the bundle creator to transfer tokens to you.`,
          { duration: 8000 }
        );
      } else {
        // Selling: Transfer tokens to recipient address
        // User can specify their own testnet address to test the full flow
        if (!recipientAddress || !recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
          toast.warning('Please enter a valid recipient address (0x...) to transfer tokens to');
          return;
        }

        const contract = new ethers.Contract(
          bundleAddress,
          BUNDLE_TOKEN_ABI,
          signer
        );

        const amountWei = ethers.parseEther(amount);
        const tx = await contract.transfer(recipientAddress as Address, amountWei);
        
        toast.success(
          `Transferred ${amount} ${bundleSymbol} tokens to ${recipientAddress}\n\nTransaction: ${tx.hash}\n\nYou can now log in with that account to see the tokens!`,
          { duration: 10000 }
        );
        
        await tx.wait();
        await loadBundleData(); // Refresh balance
      }
    } catch (error: any) {
      console.error('Trading error:', error);
      toast.error(`Trading failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCost = amount && !isNaN(parseFloat(amount))
    ? (parseFloat(amount) * parseFloat(price)).toFixed(4)
    : '0.0000';

  const balanceNum = parseFloat(balance);
  const totalSupplyNum = parseFloat(totalSupply);
  const ownershipPercent = totalSupplyNum > 0 ? ((balanceNum / totalSupplyNum) * 100).toFixed(2) : '0.00';

  const setAmountPercent = (percent: number) => {
    if (tradeType === 'sell') {
      const maxAmount = balanceNum;
      setAmount((maxAmount * (percent / 100)).toFixed(2));
    } else {
      // For buying, we could set a max based on available funds
      // For now, just set a reasonable amount
      setAmount((totalSupplyNum * (percent / 100)).toFixed(2));
    }
  };

  const setMaxAmount = () => {
    if (tradeType === 'sell') {
      setAmount(balanceNum.toFixed(2));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            tradeType === 'buy' 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            {tradeType === 'buy' ? (
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Trade {bundleSymbol}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{bundleName}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Your Balance</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {balanceNum.toFixed(2)}
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">{bundleSymbol}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-1">
            <Percent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Ownership</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {ownershipPercent}%
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">of total supply</p>
        </div>
      </div>

      {/* Total Supply Info */}
      <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Supply</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {totalSupplyNum.toLocaleString()} {bundleSymbol}
          </span>
        </div>
      </div>

      {/* Trade Type Toggle */}
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <button
          onClick={() => {
            setTradeType('buy');
            setAmount('');
          }}
          className={`flex-1 px-4 py-2.5 rounded-md font-semibold transition-all ${
            tradeType === 'buy'
              ? 'bg-green-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Buy
          </div>
        </button>
        <button
          onClick={() => {
            setTradeType('sell');
            setAmount('');
          }}
          className={`flex-1 px-4 py-2.5 rounded-md font-semibold transition-all ${
            tradeType === 'sell'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Sell
          </div>
        </button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Amount ({bundleSymbol})
          </label>
          {tradeType === 'sell' && balanceNum > 0 && (
            <button
              onClick={setMaxAmount}
              className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              Max: {balanceNum.toFixed(2)}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            max={tradeType === 'sell' ? balanceNum : undefined}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
          />
        </div>
        
        {/* Quick Amount Buttons */}
        {tradeType === 'sell' && balanceNum > 0 && (
          <div className="flex gap-2 mt-3">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => setAmountPercent(percent)}
                className="flex-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {percent}%
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recipient Address Input (for selling) */}
      {tradeType === 'sell' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Recipient Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
              className="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 font-mono text-sm transition-colors"
            />
            {address && (
              <button
                onClick={() => {
                  setRecipientAddress(address);
                  copyToClipboard(address);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Use your address"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {recipientAddress && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(recipientAddress)}
                className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {copiedAddress ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Enter your testnet wallet address to receive tokens. You can then log in with that account to see the bundle!
          </p>
        </div>
      )}

      {/* Price Info */}
      {amount && parseFloat(amount) > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Price per token</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {price} IP
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-blue-200 dark:border-blue-700">
            <span className="text-base font-semibold text-gray-900 dark:text-white">Total Cost</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {totalCost} IP
            </span>
          </div>
        </div>
      )}

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={
          isLoading || 
          !amount || 
          parseFloat(amount) <= 0 ||
          (tradeType === 'sell' && parseFloat(amount) > balanceNum) ||
          (tradeType === 'sell' && (!recipientAddress || !recipientAddress.startsWith('0x') || recipientAddress.length !== 42))
        }
        className={`w-full px-6 py-4 rounded-lg font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg ${
          tradeType === 'buy'
            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
        }`}
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Processing Transaction...</span>
          </>
        ) : (
          <>
            {tradeType === 'buy' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {amount || '0'} {bundleSymbol}
            </span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Info Cards */}
      <div className="mt-6 space-y-3">
        {tradeType === 'sell' && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>💡 Tip:</strong> Enter your testnet wallet address as the recipient. 
              After the transaction confirms, log out and log in with that account to see your bundle tokens!
            </p>
          </div>
        )}
        
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            <strong>ℹ️ Note:</strong> This is a simplified trading interface. In production, trading would use:
            <br />• DEX integration (Uniswap, etc.) for liquidity
            <br />• Order book for limit orders
            <br />• Real-time price discovery
          </p>
        </div>
      </div>
    </div>
  );
}

