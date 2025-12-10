/**
 * Sigma Music IP Assets
 * 
 * These are music tracks from indie artists that are already registered
 * on Story Protocol with "Creative Commons Attribution" + "Commercial Remix" 
 * with 5% royalty license terms.
 * 
 * Note: In production, these would be fetched from Sigma Music API.
 * For hackathon demo, we're using placeholder addresses that represent
 * real IP assets on Story Protocol.
 */

export interface SigmaMusicTrack {
  ipAssetAddress: string; // Story Protocol IP Asset address
  trackName: string;
  artist: string;
  genre: string;
  artwork: string;
  previewUrl?: string;
  licenseTerms: string;
  royaltyRate: string; // e.g., "5%"
}

// Demo Sigma Music IP Assets
// TODO: Replace with actual IP addresses from Sigma Music
export const SIGMA_MUSIC_TRACKS: SigmaMusicTrack[] = [
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000001", // Placeholder - replace with real IP
    trackName: "Midnight Rain",
    artist: "Lo-Fi Dreams",
    genre: "Lo-Fi",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000002",
    trackName: "Coffee Shop Vibes",
    artist: "Chill Beats Collective",
    genre: "Lo-Fi",
    artwork: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000003",
    trackName: "Study Session",
    artist: "Focus Music Lab",
    genre: "Lo-Fi",
    artwork: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000004",
    trackName: "City Lights",
    artist: "Urban Soundscapes",
    genre: "Lo-Fi",
    artwork: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000005",
    trackName: "Peaceful Mind",
    artist: "Ambient Waves",
    genre: "Lo-Fi",
    artwork: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000006",
    trackName: "Electric Dreams",
    artist: "Synth Wave",
    genre: "Electronic",
    artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000007",
    trackName: "Dance Floor",
    artist: "EDM Collective",
    genre: "Electronic",
    artwork: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  },
  {
    ipAssetAddress: "0x0000000000000000000000000000000000000008",
    trackName: "Acoustic Morning",
    artist: "Folk Stories",
    genre: "Folk",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    licenseTerms: "Creative Commons Attribution + Commercial Remix",
    royaltyRate: "5%"
  }
];

// Pre-configured bundle templates
export const MUSIC_BUNDLE_TEMPLATES = [
  {
    name: "Lo-Fi Beats Collection",
    description: "A curated collection of lo-fi music perfect for studying, working, or relaxing",
    tracks: SIGMA_MUSIC_TRACKS.filter(t => t.genre === "Lo-Fi").slice(0, 5),
    symbol: "LFB"
  },
  {
    name: "Electronic Dance Mix",
    description: "High-energy electronic tracks for parties and workouts",
    tracks: SIGMA_MUSIC_TRACKS.filter(t => t.genre === "Electronic").slice(0, 3),
    symbol: "EDM"
  },
  {
    name: "Acoustic Folk Set",
    description: "Peaceful acoustic and folk music for quiet moments",
    tracks: SIGMA_MUSIC_TRACKS.filter(t => t.genre === "Folk").slice(0, 3),
    symbol: "AFS"
  }
];

/**
 * Get tracks by genre
 */
export function getTracksByGenre(genre: string): SigmaMusicTrack[] {
  return SIGMA_MUSIC_TRACKS.filter(track => track.genre === genre);
}

/**
 * Get all available genres
 */
export function getAvailableGenres(): string[] {
  return Array.from(new Set(SIGMA_MUSIC_TRACKS.map(track => track.genre)));
}

