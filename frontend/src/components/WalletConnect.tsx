import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300 font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2 text-sm"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  // Use the first available connector (usually injected/MetaMask)
  const primaryConnector = connectors.find(c => c.id === 'injected' || c.type === 'injected') || connectors[0];

  if (!primaryConnector) {
    return null;
  }

  return (
    <button
      onClick={() => connect({ connector: primaryConnector })}
      disabled={isPending}
      className="px-4 py-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
    >
      <Wallet className="w-4 h-4" />
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}

