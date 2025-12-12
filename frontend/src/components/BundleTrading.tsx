import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';
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

  const totalCost = tradeType === 'buy' 
    ? (parseFloat(amount) * parseFloat(price)).toFixed(4)
    : (parseFloat(amount) * parseFloat(price)).toFixed(4);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        {tradeType === 'buy' ? (
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
        ) : (
          <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
        )}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Trade {bundleSymbol} Tokens
        </h3>
      </div>

      {/* Balance Info */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Your Balance</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {parseFloat(balance).toFixed(2)} {bundleSymbol}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Supply</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {parseFloat(totalSupply).toFixed(2)} {bundleSymbol}
          </span>
        </div>
      </div>

      {/* Trade Type Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
            tradeType === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
            tradeType === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount ({bundleSymbol})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Recipient Address Input (for selling) */}
      {tradeType === 'sell' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recipient Address (0x...)
          </label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Enter your testnet wallet address to receive tokens. You can then log in with that account to see the bundle!
          </p>
        </div>
      )}

      {/* Price Info */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 dark:text-gray-300">Price per token</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {price} IP
          </span>
        </div>
        {amount && (
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {totalCost} IP
            </span>
          </div>
        )}
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={
          isLoading || 
          !amount || 
          parseFloat(amount) <= 0 ||
          (tradeType === 'sell' && (!recipientAddress || !recipientAddress.startsWith('0x') || recipientAddress.length !== 42))
        }
        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          tradeType === 'buy'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {tradeType === 'buy' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {amount || '0'} {bundleSymbol}
          </>
        )}
      </button>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>💡 Tip:</strong> When selling, enter your testnet wallet address as the recipient. 
          After the transaction confirms, log out and log in with that account to see your bundle tokens!
        </p>
      </div>
      
      {/* Info */}
      <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          <strong>Note:</strong> This is a simplified trading interface. In production, trading would use:
          <br />• DEX integration (Uniswap, etc.) for liquidity
          <br />• Order book for limit orders
          <br />• Real-time price discovery
        </p>
      </div>
    </div>
  );
}

