import React from 'react';
import { BookOpen, ArrowLeft, Sparkles, Music, TrendingUp, Shield } from 'lucide-react';

interface HowItWorksProps {
  onNavigate?: (view: 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works') => void;
}

export default function HowItWorks({ onNavigate }: HowItWorksProps) {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is IPfolio?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              IPfolio is the first IP bundling marketplace on Story Protocol. Think of it as "index funds for intellectual property" - you can create diversified portfolios of IP assets, trade bundle tokens, and earn automatic royalties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Getting Started</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.) to get started. This allows you to interact with the blockchain and manage your IP bundles.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verify with World ID</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Complete World ID verification to prove you're human. This helps maintain platform quality and prevents spam.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Your Bundle</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Select IP assets (like music tracks from Sigma Music), give your bundle a name and symbol, and deploy it to Story Protocol. Each bundle becomes a tradeable token.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Trade & Earn</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Trade your bundle tokens on the marketplace. When royalties are distributed from Story Protocol, they're automatically split among all token holders based on their ownership percentage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">One-Click Bundling</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Create IP bundles in minutes with our intuitive interface. Use templates or create custom bundles.
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto Royalties</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Royalties from Story Protocol are automatically distributed to all token holders proportionally.
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Diversified Risk</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Reduce exposure by investing in portfolios of multiple IP assets instead of single assets.
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Music className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Liquid Market</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Trade bundle tokens anytime on our secondary marketplace. No lock-up periods.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Bonus Challenge Integrations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              IPfolio integrates multiple hackathon bonus challenges:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Sigma Music IP:</strong> Bundle real music tracks from indie artists registered on Story Protocol</li>
              <li><strong>World ID:</strong> Human verification ensures quality and prevents spam</li>
              <li><strong>AI Assistant (ABV.dev):</strong> AI-powered bundle creation suggestions</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Built on Story Protocol</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              IPfolio leverages Story Protocol's infrastructure for IP asset registration, licensing, and royalty distribution. All IP assets are registered on-chain and royalties flow automatically through smart contracts.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions or need assistance, please contact us:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:support@ipfolio.io" className="text-purple-600 dark:text-purple-400 hover:underline">support@ipfolio.io</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Documentation: <a href="https://docs.story.foundation" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">Story Protocol Docs</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

