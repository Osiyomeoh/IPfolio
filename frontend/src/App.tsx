import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Shield, Zap, Music, Wand2 } from 'lucide-react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicBundleCreator from './components/MusicBundleCreator';
import WorldIDVerification from './components/WorldIDVerification';
import AIBundleAssistant from './components/AIBundleAssistant';
import TrackUploader from './components/TrackUploader';
import BundleTrading from './components/BundleTrading';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import HowItWorks from './pages/HowItWorks';
import { SigmaMusicTrack } from './data/sigmaMusicIPs';
import { deployBundleToken, calculateRoyaltyShares, getBundleInfo, type BundleConfig } from './services/contractService';
import { toast } from './utils/toast';
import { aeneid } from './config/chains';

type View = 'home' | 'create' | 'marketplace' | 'privacy' | 'terms' | 'how-it-works';

function App() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [currentView, setCurrentView] = useState<View>('home');
  const [, setIsVerified] = useState(false); // World ID verification status (optional)
  const [isDeploying, setIsDeploying] = useState(false);
  type Bundle = {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
    address?: string;
    txHash?: string;
  };

  const [createdBundles, setCreatedBundles] = useState<Bundle[]>([]);
  const [registeredTracks, setRegisteredTracks] = useState<SigmaMusicTrack[]>([]);
  const [selectedBundleForTrading, setSelectedBundleForTrading] = useState<string | null>(null);
  const [isLoadingBundles, setIsLoadingBundles] = useState(false);

  // Load bundles from blockchain using stored addresses
  useEffect(() => {
    const loadBundlesFromBlockchain = async () => {
      if (!walletClient || !isConnected) return;

      try {
        // Get stored bundle addresses (we only store addresses, not full data)
        const storedAddresses = localStorage.getItem('ipfolio_bundle_addresses');
        if (!storedAddresses) {
          setCreatedBundles([]);
          return;
        }

        const addresses = JSON.parse(storedAddresses) as string[];
        if (addresses.length === 0) {
          setCreatedBundles([]);
          return;
        }

        setIsLoadingBundles(true);
        const provider = new BrowserProvider(walletClient as any);
        
        // Load all bundle data from blockchain
        const bundles = await Promise.all(
          addresses.map(async (address) => {
            try {
              const bundleInfo = await getBundleInfo(provider, address as `0x${string}`);
              
              // Get IP assets from contract
              const ipAssets = bundleInfo.ipAssets;
              
              // Create bundle object with data from blockchain
              // Note: We don't have track metadata on-chain, so we'll use placeholder tracks
              return {
                name: bundleInfo.name,
                symbol: bundleInfo.symbol,
                description: bundleInfo.description,
                address: bundleInfo.address,
                tracks: ipAssets.map((ipAsset, index) => ({
                  ipAssetAddress: ipAsset,
                  trackName: `${bundleInfo.name} Track ${index + 1}`,
                  artist: 'Unknown',
                  genre: 'Unknown',
                  artwork: `https://via.placeholder.com/300/6366f1/ffffff?text=${encodeURIComponent(bundleInfo.name)}`,
                  royaltyRate: '0%',
                  licenseTerms: 'On-chain',
                })) as SigmaMusicTrack[],
              } as Bundle;
            } catch (error) {
              console.error(`Error loading bundle ${address}:`, error);
              // Return minimal bundle if contract read fails
              return {
                name: 'Unknown Bundle',
                symbol: 'UNK',
                description: 'Failed to load from blockchain',
                address: address,
                tracks: [],
              } as Bundle;
            }
          })
        );

        setCreatedBundles(bundles);
        console.log('📦 Loaded bundles from blockchain:', bundles.length);
      } catch (error) {
        console.error('Error loading bundles from blockchain:', error);
        setCreatedBundles([]);
      } finally {
        setIsLoadingBundles(false);
      }
    };

    loadBundlesFromBlockchain();
  }, [isConnected, walletClient]);

  const handleBundleCreate = async (bundle: {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  }) => {
    if (!walletClient || !address) {
      toast.error('Please connect your wallet first');
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

      // Store bundle address in localStorage for persistence
      const storedAddresses = JSON.parse(localStorage.getItem('ipfolio_bundle_addresses') || '[]') as string[];
      if (!storedAddresses.includes(result.address)) {
        storedAddresses.push(result.address);
        localStorage.setItem('ipfolio_bundle_addresses', JSON.stringify(storedAddresses));
      }

      // Add to created bundles (will be reloaded from blockchain)
      setCreatedBundles([...createdBundles, newBundle]);

      // Show success message with contract address
      toast.success(
        `Bundle "${bundle.name}" deployed successfully! 🎉\n\n` +
        `Contract Address: ${result.address}\n` +
        `Transaction: ${result.txHash}\n\n` +
        `View on explorer: ${aeneid.blockExplorers?.default.url}/address/${result.address}`,
        { duration: 8000 }
      );

      setCurrentView('marketplace');
    } catch (error: any) {
      console.error('Error deploying bundle:', error);
      toast.error(`Failed to deploy bundle: ${error.message || 'Unknown error'}`);
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
    toast.info(
      `AI Suggestion Generated!\n\nName: ${suggestion.name}\nSymbol: ${suggestion.symbol}\nTracks: ${suggestion.tracks.length}\n\nUse this in the bundle creator below!`,
      { duration: 7000 }
    );
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

                {/* Track Uploader - Register new tracks */}
                <TrackUploader 
                  onTrackRegistered={(track) => {
                    setRegisteredTracks([...registeredTracks, track]);
                    toast.success(`Track "${track.trackName}" registered! You can now use it in bundles.`);
                  }}
                />

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
                  <MusicBundleCreator 
                    onBundleCreate={handleBundleCreate}
                    registeredTracks={registeredTracks}
                  />
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
              <>
                {/* Bundle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {createdBundles.map((bundle, index) => (
                    <div
                      key={index}
                      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                        selectedBundleForTrading === bundle.address ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''
                      }`}
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
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {bundle.tracks.length} tracks
                          </span>
                          {bundle.address && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-mono">
                              ✓ Deployed
                            </span>
                          )}
                        </div>
                        {bundle.address && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
                            {bundle.address}
                          </div>
                        )}
                        <div className="flex gap-2">
                          {bundle.address && (
                            <>
                              <a
                                href={`https://aeneid.explorer.story.foundation/address/${bundle.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg text-white text-xs font-semibold transition-all text-center"
                              >
                                Explorer
                              </a>
                              <button
                                onClick={() => setSelectedBundleForTrading(
                                  selectedBundleForTrading === bundle.address ? null : bundle.address || null
                                )}
                                className={`flex-1 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-all ${
                                  selectedBundleForTrading === bundle.address
                                    ? 'bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600'
                                    : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
                                }`}
                              >
                                {selectedBundleForTrading === bundle.address ? 'Hide Trade' : 'Trade'}
                              </button>
                            </>
                          )}
                          <button className="flex-1 px-3 py-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg text-white text-xs font-semibold transition-all">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trading Section - Full Width Below Grid */}
                {selectedBundleForTrading && (() => {
                  const bundle = createdBundles.find(b => b.address === selectedBundleForTrading);
                  if (!bundle || !bundle.address) return null;
                  
                  return (
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Trade {bundle.symbol} - {bundle.name}
                        </h3>
                        <button
                          onClick={() => setSelectedBundleForTrading(null)}
                          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          ✕ Close
                        </button>
                      </div>
                      <div className="max-w-2xl mx-auto">
                        <BundleTrading
                          bundleAddress={bundle.address as `0x${string}`}
                          bundleSymbol={bundle.symbol}
                          bundleName={bundle.name}
                        />
                      </div>
                    </div>
                  );
                })()}
              </>
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
