import React, { useState } from 'react';
import { Sparkles, TrendingUp, Shield, Zap, Music, Wand2 } from 'lucide-react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicBundleCreator from './components/MusicBundleCreator';
import WorldIDVerification from './components/WorldIDVerification';
import AIBundleAssistant from './components/AIBundleAssistant';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import HowItWorks from './pages/HowItWorks';
import { SigmaMusicTrack } from './data/sigmaMusicIPs';
import { deployBundleToken, calculateRoyaltyShares, type BundleConfig } from './services/contractService';
import { aeneid } from './config/chains';

type View = 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works';

function App() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [currentView, setCurrentView] = useState<View>('home');
  const [isVerified, setIsVerified] = useState(false); // World ID verification status (optional)
  const [isDeploying, setIsDeploying] = useState(false);
  const [createdBundles, setCreatedBundles] = useState<Array<{
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
    address?: string;
    txHash?: string;
  }>>([]);

  const handleBundleCreate = async (bundle: {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  }) => {
    if (!walletClient || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsDeploying(true);

    try {
      // Convert wallet client to ethers signer
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      // Prepare bundle configuration
      const ipAssets = bundle.tracks.map(track => track.ipAssetAddress as `0x${string}`);
      const shares = calculateRoyaltyShares(bundle.tracks.length);
      const totalSupply = '10000'; // Default total supply

      const config: BundleConfig = {
        name: bundle.name,
        symbol: bundle.symbol,
        description: bundle.description,
        ipAssets,
        shares,
        totalSupply,
      };

      console.log('📦 Deploying bundle contract...', config);

      // Deploy the contract
      const result = await deployBundleToken(signer, config);

      console.log('✅ Bundle deployed!', result);

      // Add to created bundles with contract address
      const newBundle = {
        ...bundle,
        address: result.address,
        txHash: result.txHash,
      };

      setCreatedBundles([...createdBundles, newBundle]);

      // Show success message with contract address
      alert(
        `Bundle "${bundle.name}" deployed successfully! 🎉\n\n` +
        `Contract Address: ${result.address}\n` +
        `Transaction: ${result.txHash}\n\n` +
        `View on explorer: https://aeneid.explorer.story.foundation/address/${result.address}`
      );

      setCurrentView('marketplace');
    } catch (error: any) {
      console.error('Error deploying bundle:', error);
      alert(`Failed to deploy bundle: ${error.message || 'Unknown error'}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleAISuggest = (suggestion: {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  }) => {
    alert(`AI Suggestion:\n\nName: ${suggestion.name}\nSymbol: ${suggestion.symbol}\nTracks: ${suggestion.tracks.length}\n\nUse this in the bundle creator below!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-6">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Built on Story Protocol</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                    Index Funds for
                    <br />
                    <span className="text-purple-600 dark:text-purple-400">Intellectual Property</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Create diversified IP portfolios, trade bundle tokens, and earn automatic royalties.
                    The first IP bundling marketplace on Story Protocol.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setCurrentView('create')}
                      className="px-8 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Create Bundle
                    </button>
                    
                    <button 
                      onClick={() => setCurrentView('marketplace')}
                      className="px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-500 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Explore Marketplace
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Why IPfolio?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard
                    icon={<Zap className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />}
                    title="One-Click Bundling"
                    description="Create IP bundles in minutes with our intuitive interface"
                  />
                  <FeatureCard
                    icon={<TrendingUp className="w-8 h-8 text-green-500 dark:text-green-400" />}
                    title="Auto Royalties"
                    description="Automatic distribution from Story Protocol to all token holders"
                  />
                  <FeatureCard
                    icon={<Shield className="w-8 h-8 text-blue-500 dark:text-blue-400" />}
                    title="Diversified Risk"
                    description="Reduce exposure with portfolios of multiple IP assets"
                  />
                  <FeatureCard
                    icon={<Sparkles className="w-8 h-8 text-purple-500 dark:text-purple-400" />}
                    title="Liquid Market"
                    description="Trade bundle tokens anytime on our secondary marketplace"
                  />
                </div>
              </div>
            </section>

            {/* Bonus Challenges Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                  Bonus Challenge Integrations
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
                  IPfolio integrates multiple hackathon bonus challenges
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BonusCard
                    icon={<Music className="w-6 h-6 text-green-600 dark:text-green-400" />}
                    title="Sigma Music IP"
                    description="Bundle real music tracks from indie artists registered on Story Protocol"
                    badge="Real IP Assets"
                  />
                  <BonusCard
                    icon={<Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                    title="World ID"
                    description="Human verification ensures quality and prevents spam"
                    badge="World ID Challenge"
                  />
                  <BonusCard
                    icon={<Wand2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                    title="AI Assistant"
                    description="AI-powered bundle creation powered by ABV.dev"
                    badge="GenAI Challenge"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'create' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!isConnected ? (
              <div className="max-w-2xl mx-auto text-center py-20">
                <Shield className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect Your Wallet</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please connect your wallet using the button in the navbar above to create bundles.
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* World ID Verification - Optional */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                    <strong>Optional:</strong> World ID verification is available but not required. You can create bundles without it.
                  </p>
                  <WorldIDVerification 
                    onVerified={setIsVerified}
                    required={false}
                  />
                </div>

                {/* AI Bundle Assistant */}
                <AIBundleAssistant onSuggest={handleAISuggest} />

                {/* Music Bundle Creator - Always available */}
                {isDeploying ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                      <p className="text-blue-800 dark:text-blue-300 font-medium">
                        Deploying bundle contract to blockchain...
                      </p>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                      Please confirm the transaction in your wallet
                    </p>
                  </div>
                ) : (
                  <MusicBundleCreator onBundleCreate={handleBundleCreate} />
                )}
              </div>
            )}
          </div>
        )}

        {currentView === 'marketplace' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Bundle Marketplace
            </h2>
            
            {createdBundles.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Music className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No bundles created yet</p>
                <button
                  onClick={() => setCurrentView('create')}
                  className="px-6 py-3 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg text-white font-semibold transition-colors"
                >
                  Create Your First Bundle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdBundles.map((bundle, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bundle.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{bundle.symbol}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{bundle.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {bundle.tracks.length} tracks
                      </span>
                      <button className="px-4 py-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg text-white text-sm font-semibold transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy onNavigate={setCurrentView} />
        )}

        {currentView === 'terms' && (
          <TermsOfService onNavigate={setCurrentView} />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorks onNavigate={setCurrentView} />
        )}
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function BonusCard({ icon, title, description, badge }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="mb-4">{icon}</div>
      <div className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded text-xs text-purple-700 dark:text-purple-300 font-medium mb-2">
        {badge}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default App;
