import React, { useState } from 'react';
import { Music, Play, Plus, CheckCircle, Sparkles } from 'lucide-react';
import { SIGMA_MUSIC_TRACKS, SigmaMusicTrack, MUSIC_BUNDLE_TEMPLATES } from '../data/sigmaMusicIPs';

interface MusicBundleCreatorProps {
  onBundleCreate?: (bundle: {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  }) => void;
}

export default function MusicBundleCreator({ onBundleCreate }: MusicBundleCreatorProps) {
  const [selectedTracks, setSelectedTracks] = useState<SigmaMusicTrack[]>([]);
  const [bundleName, setBundleName] = useState('');
  const [bundleSymbol, setBundleSymbol] = useState('');
  const [bundleDescription, setBundleDescription] = useState('');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const toggleTrack = (track: SigmaMusicTrack) => {
    if (selectedTracks.find(t => t.ipAssetAddress === track.ipAssetAddress)) {
      setSelectedTracks(selectedTracks.filter(t => t.ipAssetAddress !== track.ipAssetAddress));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const applyTemplate = (template: typeof MUSIC_BUNDLE_TEMPLATES[0]) => {
    setBundleName(template.name);
    setBundleSymbol(template.symbol);
    setBundleDescription(template.description);
    setSelectedTracks(template.tracks);
    setShowTemplates(false);
  };

  const handleCreate = () => {
    if (!bundleName || !bundleSymbol || selectedTracks.length === 0) {
      alert('Please fill in bundle name, symbol, and select at least one track');
      return;
    }

    if (onBundleCreate) {
      onBundleCreate({
        name: bundleName,
        symbol: bundleSymbol,
        description: bundleDescription,
        tracks: selectedTracks
      });
    }
  };

  const genres = Array.from(new Set(SIGMA_MUSIC_TRACKS.map(t => t.genre)));
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const filteredTracks = selectedGenre === 'All' 
    ? SIGMA_MUSIC_TRACKS 
    : SIGMA_MUSIC_TRACKS.filter(t => t.genre === selectedGenre);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Music className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Music Bundle</h2>
          <div className="ml-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <Sparkles className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">Sigma Music IP</span>
            </div>
          </div>
        </div>

        {/* Templates */}
        {!showTemplates && (
          <button
            onClick={() => setShowTemplates(true)}
            className="mb-6 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all font-medium"
          >
            Use Pre-configured Template
          </button>
        )}

        {showTemplates && (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Start Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MUSIC_BUNDLE_TEMPLATES.map((template) => (
                <button
                  key={template.name}
                  onClick={() => applyTemplate(template)}
                  className="text-left p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{template.description}</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{template.tracks.length} tracks</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTemplates(false)}
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Or create custom bundle
            </button>
          </div>
        )}

        {/* Bundle Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bundle Name</label>
            <input
              type="text"
              value={bundleName}
              onChange={(e) => setBundleName(e.target.value)}
              placeholder="e.g., Lo-Fi Beats Collection"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bundle Symbol</label>
            <input
              type="text"
              value={bundleSymbol}
              onChange={(e) => setBundleSymbol(e.target.value.toUpperCase())}
              placeholder="e.g., LFB"
              maxLength={10}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={bundleDescription}
            onChange={(e) => setBundleDescription(e.target.value)}
            placeholder="Describe your music bundle..."
            rows={3}
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
          />
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Genre</label>
          <div className="flex flex-wrap gap-2">
            {['All', ...genres].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedGenre === genre
                    ? 'bg-purple-600 dark:bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tracks Summary */}
        {selectedTracks.length > 0 && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {selectedTracks.length} Track{selectedTracks.length !== 1 ? 's' : ''} Selected
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Royalty split: {Math.round(10000 / selectedTracks.length) / 100}% per track
                </p>
              </div>
              <button
                onClick={() => setSelectedTracks([])}
                className="px-4 py-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredTracks.map((track) => {
            const isSelected = selectedTracks.find(t => t.ipAssetAddress === track.ipAssetAddress);
            return (
              <div
                key={track.ipAssetAddress}
                onClick={() => toggleTrack(track)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 ring-2 ring-purple-500 dark:ring-purple-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
                }`}
              >
                <div className="relative mb-3">
                  <img
                    src={track.artwork}
                    alt={track.trackName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {track.previewUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingTrack(playingTrack === track.ipAssetAddress ? null : track.ipAssetAddress);
                      }}
                      className="absolute bottom-2 left-2 bg-black/70 rounded-full p-2 hover:bg-black/90 transition-all"
                    >
                      <Play className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{track.trackName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{track.artist}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-medium">
                    {track.genre}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{track.royaltyRate} royalty</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!bundleName || !bundleSymbol || selectedTracks.length === 0}
          className="w-full px-6 py-4 bg-purple-600 dark:bg-purple-500 rounded-lg font-semibold text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create Music Bundle
          {selectedTracks.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-white/20 rounded text-sm">
              {selectedTracks.length} tracks
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

