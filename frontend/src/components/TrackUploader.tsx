import React, { useState } from 'react';
import { Upload, Music, Loader, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { registerIPAsset, attachLicenseTerms } from '../services/storyProtocolService';
import { uploadMetadataToIPFS } from '../services/ipfsService';
import { aeneid } from '../config/chains';
import MusicFileUpload from './MusicFileUpload';

/**
 * Track Uploader Component
 * 
 * Allows users to register music tracks on Story Protocol.
 * Uses Story Protocol SDK to register IP assets on-chain.
 * 
 * Registered tracks can then be used in bundles.
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
    licenseTerms: string;
  }) => void;
}

export default function TrackUploader({ onTrackRegistered }: TrackUploaderProps) {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isRegistering, setIsRegistering] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [audioIPFSCID, setAudioIPFSCID] = useState<string | null>(null);
  const [audioIPFSURL, setAudioIPFSURL] = useState<string | null>(null);
  const [artworkIPFSCID, setArtworkIPFSCID] = useState<string | null>(null);
  const [artworkIPFSURL, setArtworkIPFSURL] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    trackName: '',
    artist: '',
    genre: 'Lo-Fi',
    description: '',
    royaltyRate: '5',
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

    if (!audioFile || !audioIPFSCID) {
      alert('Please upload your music file first');
      return;
    }

    setIsRegistering(true);

    try {
      // Convert wallet client to ethers signer
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      // Step 1: Upload metadata to IPFS
      console.log('📤 Uploading metadata to IPFS...');
      const metadata = {
        name: formData.trackName,
        artist: formData.artist,
        genre: formData.genre,
        description: formData.description || `Music track by ${formData.artist}`,
        audio: audioIPFSURL || `ipfs://${audioIPFSCID}`,
        artwork: artworkIPFSURL || (artworkIPFSCID ? `ipfs://${artworkIPFSCID}` : undefined),
        royaltyRate: parseFloat(formData.royaltyRate),
        createdAt: new Date().toISOString(),
      };

      const metadataResult = await uploadMetadataToIPFS(metadata);
      console.log('✅ Metadata uploaded:', metadataResult);

      // Step 2: Register IP asset on Story Protocol
      console.log('📝 Registering IP asset on Story Protocol...');
      const registrationResult = await registerIPAsset(signer, {
        name: formData.trackName,
        description: formData.description || `Music track by ${formData.artist}`,
        metadata: {
          ipfsHash: metadataResult.cid,
          ipfsUrl: metadataResult.url,
          artist: formData.artist,
          genre: formData.genre,
          audioCID: audioIPFSCID,
          artworkCID: artworkIPFSCID,
        },
      });

      // Step 3: Attach license terms (PIL - Programmable IP License)
      console.log('📄 Attaching license terms...');
      const royaltyBasisPoints = Math.floor(parseFloat(formData.royaltyRate) * 100); // Convert % to basis points
      
      await attachLicenseTerms(signer, registrationResult.ipAssetAddress, {
        commercialUse: true,
        commercialAttribution: true,
        commercialRevShare: royaltyBasisPoints, // e.g., 500 = 5%
        derivativesAllowed: true,
        derivativesAttribution: true,
        derivativesApproval: false,
        derivativesReciprocal: false,
      });

      // Create track object for bundle creator
      const registeredTrack = {
        ipAssetAddress: registrationResult.ipAssetAddress,
        trackName: formData.trackName,
        artist: formData.artist,
        genre: formData.genre,
        artwork: artworkIPFSURL || `https://via.placeholder.com/300/6366f1/ffffff?text=${encodeURIComponent(formData.trackName)}`,
        previewUrl: audioIPFSURL || undefined,
        royaltyRate: `${formData.royaltyRate}%`,
        licenseTerms: `Commercial Use + Attribution + ${formData.royaltyRate}% Royalty`,
      };

      console.log('✅ Track registered on Story Protocol:', registeredTrack);

      // Notify parent component
      if (onTrackRegistered) {
        onTrackRegistered(registeredTrack);
      }

      // Reset form
      const trackName = formData.trackName;
      setFormData({
        trackName: '',
        artist: '',
        genre: 'Lo-Fi',
        description: '',
        royaltyRate: '5',
      });
      setAudioFile(null);
      setArtworkFile(null);
      setAudioIPFSCID(null);
      setAudioIPFSURL(null);
      setArtworkIPFSCID(null);
      setArtworkIPFSURL(null);

      // Show success message with transaction details
      alert(
        `Track "${trackName}" registered successfully! 🎉\n\n` +
        `IP Asset Address: ${registrationResult.ipAssetAddress}\n` +
        `Transaction Hash: ${registrationResult.txHash}\n` +
        `Audio IPFS: ${audioIPFSCID}\n` +
        `Metadata IPFS: ${metadataResult.cid}\n\n` +
        `View on explorer: ${aeneid.blockExplorers?.default.url}/tx/${registrationResult.txHash}\n\n` +
        `Your track is now available in the bundle creator!`
      );
    } catch (error: any) {
      console.error('❌ Error registering track:', error);
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

      {/* File Upload Section */}
      <MusicFileUpload
        audioFile={audioFile}
        artworkFile={artworkFile}
        onAudioFileChange={setAudioFile}
        onArtworkFileChange={setArtworkFile}
        onAudioUploaded={(cid, url) => {
          setAudioIPFSCID(cid);
          setAudioIPFSURL(url);
        }}
        onArtworkUploaded={(cid, url) => {
          setArtworkIPFSCID(cid);
          setArtworkIPFSURL(url);
        }}
      />

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

        <button
          onClick={handleRegister}
          disabled={isRegistering || !formData.trackName || !formData.artist || !audioFile || !audioIPFSCID}
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
              Register Track on Story Protocol
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
          <strong>Real-World Flow:</strong>
        </p>
        <ol className="text-xs text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-1">
          <li>Upload your music file → Stored on IPFS (decentralized storage)</li>
          <li>Upload artwork (optional) → Stored on IPFS</li>
          <li>Metadata created → Uploaded to IPFS</li>
          <li>IP asset registered on Story Protocol → On-chain record</li>
          <li>License terms attached → Royalty rate set</li>
          <li>Track available for bundling → Use in bundles</li>
        </ol>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
          <strong>Note:</strong> In production, this uses real IPFS and Story Protocol. 
          Files are permanently stored and verifiable on-chain.
        </p>
      </div>
    </div>
  );
}

