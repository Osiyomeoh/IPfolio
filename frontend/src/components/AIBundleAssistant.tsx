import React, { useState } from 'react';
import { Sparkles, Wand2, Loader, CheckCircle } from 'lucide-react';
import { SIGMA_MUSIC_TRACKS, SigmaMusicTrack } from '../data/sigmaMusicIPs';

/**
 * AI Bundle Assistant Component
 * 
 * Simplified AI-powered bundle creation assistant for hackathon demo.
 * Uses AI to suggest bundle names, descriptions, and track combinations.
 * 
 * Note: For full implementation, integrate with ABV.dev API for Story Protocol
 * IP registration. This is a simplified version for demo purposes.
 */

interface AIBundleAssistantProps {
  onSuggest?: (suggestion: {
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  }) => void;
}

export default function AIBundleAssistant({ onSuggest }: AIBundleAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    name: string;
    symbol: string;
    description: string;
    tracks: SigmaMusicTrack[];
  } | null>(null);

  const generateSuggestion = async () => {
    if (!prompt.trim()) {
      alert('Please describe your bundle idea');
      return;
    }

    setIsGenerating(true);
    setSuggestion(null);

    try {
      // Simulate AI generation (in production, call ABV.dev API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple AI logic for demo
      const lowerPrompt = prompt.toLowerCase();
      let genre = 'Lo-Fi';
      let theme = 'relaxing';

      if (lowerPrompt.includes('electronic') || lowerPrompt.includes('edm') || lowerPrompt.includes('dance')) {
        genre = 'Electronic';
        theme = 'energetic';
      } else if (lowerPrompt.includes('folk') || lowerPrompt.includes('acoustic')) {
        genre = 'Folk';
        theme = 'peaceful';
      }

      const matchingTracks = SIGMA_MUSIC_TRACKS.filter(t => t.genre === genre).slice(0, 5);
      
      const generatedName = generateBundleName(prompt, genre);
      const generatedSymbol = generateSymbol(generatedName);
      const generatedDescription = `A ${theme} collection of ${genre.toLowerCase()} music. ${prompt}`;

      const result = {
        name: generatedName,
        symbol: generatedSymbol,
        description: generatedDescription,
        tracks: matchingTracks
      };

      setSuggestion(result);
      if (onSuggest) {
        onSuggest(result);
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('Failed to generate suggestion. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBundleName = (prompt: string, genre: string): string => {
    const keywords = prompt.split(' ').filter(w => w.length > 3).slice(0, 2);
    const name = keywords.length > 0 
      ? `${keywords.join(' ')} ${genre} Collection`
      : `${genre} Music Bundle`;
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const generateSymbol = (name: string): string => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 3).toUpperCase().replace(/\s/g, '');
  };

  const useSuggestion = () => {
    if (suggestion && onSuggest) {
      onSuggest(suggestion);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
          <Wand2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Bundle Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Powered by ABV.dev</p>
        </div>
        <div className="ml-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">GenAI Challenge</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Describe your bundle idea and AI will suggest a name, description, and track selection.
      </p>

      <div className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., I want a lo-fi music collection for studying..."
          rows={3}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
        />
      </div>

      <button
        onClick={generateSuggestion}
        disabled={isGenerating || !prompt.trim()}
        className="w-full px-6 py-3 bg-purple-600 dark:bg-purple-500 rounded-lg font-semibold text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isGenerating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Generating AI Suggestion...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Bundle Suggestion
          </>
        )}
      </button>

      {suggestion && (
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">AI Suggestion Generated</h4>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Bundle Name</label>
              <p className="text-gray-900 dark:text-white font-medium">{suggestion.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Symbol</label>
              <p className="text-gray-900 dark:text-white font-medium">{suggestion.symbol}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{suggestion.description}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Selected Tracks</label>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{suggestion.tracks.length} tracks</p>
            </div>
          </div>

          <button
            onClick={useSuggestion}
            className="w-full px-4 py-2 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 rounded-lg font-semibold text-white transition-all"
          >
            Use This Suggestion
          </button>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>About ABV.dev:</strong> ABV.dev provides AI infrastructure with built-in Story Protocol 
          integration. This assistant helps you create optimal IP bundles with AI-powered suggestions.
        </p>
      </div>
    </div>
  );
}

