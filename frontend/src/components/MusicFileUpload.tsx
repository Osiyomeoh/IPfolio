import React, { useState, useRef } from 'react';
import { Upload, X, Music, Image, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadFileToIPFS, validateAudioFile, validateImageFile, formatFileSize } from '../services/ipfsService';

interface MusicFileUploadProps {
  onAudioUploaded?: (cid: string, url: string) => void;
  onArtworkUploaded?: (cid: string, url: string) => void;
  audioFile?: File | null;
  artworkFile?: File | null;
  onAudioFileChange?: (file: File | null) => void;
  onArtworkFileChange?: (file: File | null) => void;
}

export default function MusicFileUpload({
  onAudioUploaded,
  onArtworkUploaded,
  audioFile,
  artworkFile,
  onAudioFileChange,
  onArtworkFileChange,
}: MusicFileUploadProps) {
  const [audioUploading, setAudioUploading] = useState(false);
  const [artworkUploading, setArtworkUploading] = useState(false);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [artworkUploadProgress, setArtworkUploadProgress] = useState(0);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);

  const handleAudioFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid audio file');
      return;
    }

    setError(null);
    if (onAudioFileChange) {
      onAudioFileChange(file);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setAudioPreview(previewUrl);

    // Auto-upload to IPFS
    setAudioUploading(true);
    setAudioUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAudioUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await uploadFileToIPFS(file);
      clearInterval(progressInterval);
      setAudioUploadProgress(100);

      if (onAudioUploaded) {
        onAudioUploaded(result.cid, result.url);
      }
    } catch (err: any) {
      setError(`Failed to upload audio: ${err.message}`);
    } finally {
      setAudioUploading(false);
    }
  };

  const handleArtworkFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid image file');
      return;
    }

    setError(null);
    if (onArtworkFileChange) {
      onArtworkFileChange(file);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setArtworkPreview(previewUrl);

    // Auto-upload to IPFS
    setArtworkUploading(true);
    setArtworkUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setArtworkUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await uploadFileToIPFS(file);
      clearInterval(progressInterval);
      setArtworkUploadProgress(100);

      if (onArtworkUploaded) {
        onArtworkUploaded(result.cid, result.url);
      }
    } catch (err: any) {
      setError(`Failed to upload artwork: ${err.message}`);
    } finally {
      setArtworkUploading(false);
    }
  };

  const removeAudioFile = () => {
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
    }
    setAudioPreview(null);
    if (onAudioFileChange) {
      onAudioFileChange(null);
    }
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  const removeArtworkFile = () => {
    if (artworkPreview) {
      URL.revokeObjectURL(artworkPreview);
    }
    setArtworkPreview(null);
    if (onArtworkFileChange) {
      onArtworkFileChange(null);
    }
    if (artworkInputRef.current) {
      artworkInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
        </div>
      )}

      {/* Audio File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Music File *
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
          {!audioFile ? (
            <div className="text-center">
              <Music className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Upload your music file (MP3, WAV, FLAC, M4A)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Max size: 50MB
              </p>
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="px-4 py-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-lg text-white font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <Upload className="w-4 h-4" />
                Choose Audio File
              </button>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{audioFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(audioFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeAudioFile}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {audioPreview && (
                <audio controls className="w-full" src={audioPreview}>
                  Your browser does not support audio playback.
                </audio>
              )}

              {audioUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Uploading to IPFS... {audioUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${audioUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {!audioUploading && audioFile && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Uploaded to IPFS</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Artwork File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Artwork Image (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
          {!artworkFile ? (
            <div className="text-center">
              <Image className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Upload artwork (JPG, PNG, WebP)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Max size: 10MB
              </p>
              <button
                type="button"
                onClick={() => artworkInputRef.current?.click()}
                className="px-4 py-2 bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-white font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <Upload className="w-4 h-4" />
                Choose Image
              </button>
              <input
                ref={artworkInputRef}
                type="file"
                accept="image/*"
                onChange={handleArtworkFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {artworkPreview && (
                    <img
                      src={artworkPreview}
                      alt="Artwork preview"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{artworkFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(artworkFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeArtworkFile}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {artworkUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Uploading to IPFS... {artworkUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${artworkUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {!artworkUploading && artworkFile && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Uploaded to IPFS</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>How it works:</strong> Files are uploaded to IPFS (InterPlanetary File System) for decentralized storage. 
          Once uploaded, you'll get an IPFS hash (CID) that can be used to reference your files permanently.
        </p>
      </div>
    </div>
  );
}

