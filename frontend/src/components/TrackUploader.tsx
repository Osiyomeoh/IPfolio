import React, { useState } from 'react';
import { Upload, Music, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';

/**
 * Track Uploader Component
 * 
 * Allows users to register music tracks on Story Protocol.
 * In production, this would use the Story Protocol SDK to register IP assets.
 * 
 * For hackathon demo, we'll simulate the registration process.
 */

interface TrackUploaderProps {
  onTrackRegistered?: (track: {
    ipAssetAddress: string;
    trackName: string;
    artist: string;
    genre: string;
    artwork: string;
    previewUrl?: string;
    royaltyRate: string;
  }) => void;
}

export default function TrackUploader({ onTrackRegistered }: TrackUploaderProps) {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    trackName: '',
    artist: '',
    genre: 'Lo-Fi',
    description: '',
    royaltyRate: '5',
    artwork: '',
    previewUrl: '',
  });

  const handleRegister = async () => {
    if (!isConnected || !walletClient) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.trackName || !formData.artist) {
      alert('Please fill in track name and artist');
      return;
    }

    setIsRegistering(true);

    try {
      // In production, this would use Story Protocol SDK:
      // const storyClient = new StoryClient({ ... });
      // const ipAsset = await storyClient.ipAsset.register({
      //   name: formData.trackName,
      //   type: 'STORY',
      //   metadata: { ... }
      // });

      // For demo: Simulate registration with a generated address
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate a mock IP asset address (in production, this comes from Story Protocol)
      const mockIpAddress = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;

      const registeredTrack = {
        ipAssetAddress: mockIpAddress,
        trackName: formData.trackName,
        artist: formData.artist,
        genre: formData.genre,
        artwork: formData.artwork || `https://via.placeholder.com/300/6366f1/ffffff?text=${encodeURIComponent(formData.trackName)}`,
        previewUrl: formData.previewUrl || undefined,
        royaltyRate: `${formData.royaltyRate}%`,
      };

      console.log('✅ Track registered on Story Protocol:', registeredTrack);

      if (onTrackRegistered) {
        onTrackRegistered(registeredTrack);
      }

      // Reset form
      setFormData({
        trackName: '',
        artist: '',
        genre: 'Lo-Fi',
        description: '',
        royaltyRate: '5',
        artwork: '',
        previewUrl: '',
      });

      alert(`Track "${formData.trackName}" registered successfully!\n\nIP Asset Address: ${mockIpAddress}\n\nNote: In production, this would be a real Story Protocol IP asset.`);
    } catch (error: any) {
      console.error('Error registering track:', error);
      alert(`Failed to register track: ${error.message || 'Unknown error'}`);
    } finally {
      setIsRegistering(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="text-center py-8">
          <Music className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Please connect your wallet to register tracks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Register Track on Story Protocol
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Track Name *
          </label>
          <input
            type="text"
            value={formData.trackName}
            onChange={(e) => setFormData({ ...formData, trackName: e.target.value })}
            placeholder="e.g., Midnight Rain"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Artist Name *
          </label>
          <input
            type="text"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            placeholder="e.g., Lo-Fi Dreams"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Genre
          </label>
          <select
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option>Lo-Fi</option>
            <option>Electronic</option>
            <option>Folk</option>
            <option>Jazz</option>
            <option>Hip-Hop</option>
            <option>Rock</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your track..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Royalty Rate (%)
            </label>
            <input
              type="number"
              value={formData.royaltyRate}
              onChange={(e) => setFormData({ ...formData, royaltyRate: e.target.value })}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Artwork URL (optional)
            </label>
            <input
              type="url"
              value={formData.artwork}
              onChange={(e) => setFormData({ ...formData, artwork: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview URL (optional)
          </label>
          <input
            type="url"
            value={formData.previewUrl}
            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={isRegistering || !formData.trackName || !formData.artist}
          className="w-full px-6 py-3 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isRegistering ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Registering on Story Protocol...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Register Track
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>How it works:</strong> Your track will be registered as an IP asset on Story Protocol. 
          Once registered, you'll receive an IP asset address that can be used in bundles. 
          This creates a permanent record on the blockchain.
        </p>
      </div>
    </div>
  );
}

