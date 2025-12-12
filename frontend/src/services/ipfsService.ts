/**
 * IPFS Service
 * 
 * Handles uploading files (music, artwork, metadata) to IPFS.
 * Uses Pinata for reliable IPFS pinning and storage.
 * 
 * Setup:
 * 1. Get API key from https://pinata.cloud
 * 2. Set REACT_APP_PINATA_JWT in .env
 * 3. Files will be pinned to IPFS via Pinata
 */

export interface IPFSUploadResult {
  cid: string; // Content Identifier (IPFS hash)
  url: string; // IPFS gateway URL
}

/**
 * Upload a file to IPFS
 * 
 * @param file - File to upload (audio, image, etc.)
 * @returns IPFS CID and gateway URL
 */
/**
 * Upload a file to IPFS using Pinata
 * 
 * @param file - File to upload (audio, image, etc.)
 * @returns IPFS CID and gateway URL
 */
export async function uploadFileToIPFS(file: File): Promise<IPFSUploadResult> {
  try {
    const pinataJWT = process.env.REACT_APP_PINATA_JWT;

    if (!pinataJWT) {
      console.warn('⚠️ Pinata JWT not found. Using demo mode.');
      // Demo mode: Simulate IPFS upload
      console.log('📤 [DEMO] Uploading file to IPFS...', {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockCID = `Qm${Array.from({ length: 44 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
          Math.floor(Math.random() * 62)
        ]
      ).join('')}`;

      return {
        cid: mockCID,
        url: `https://gateway.pinata.cloud/ipfs/${mockCID}`,
      };
    }

    // Real Pinata upload
    console.log('📤 Uploading file to Pinata IPFS...', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const formData = new FormData();
    formData.append('file', file);

    // Add metadata
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        type: file.type,
        uploadedAt: new Date().toISOString(),
      },
    });
    formData.append('pinataMetadata', metadata);

    // Add options
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.details || `Pinata API error: ${response.statusText}`);
    }

    const data = await response.json();
    const cid = data.IpfsHash;

    console.log('✅ File uploaded to Pinata IPFS:', {
      cid,
      name: file.name,
    });

    return {
      cid,
      url: `https://gateway.pinata.cloud/ipfs/${cid}`,
    };
  } catch (error: any) {
    console.error('❌ Error uploading to IPFS:', error);
    throw new Error(`Failed to upload file to IPFS: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Upload metadata JSON to IPFS
 * 
 * @param metadata - Metadata object to upload
 * @returns IPFS CID and gateway URL
 */
/**
 * Upload metadata JSON to IPFS using Pinata
 * 
 * @param metadata - Metadata object to upload
 * @returns IPFS CID and gateway URL
 */
export async function uploadMetadataToIPFS(metadata: Record<string, any>): Promise<IPFSUploadResult> {
  try {
    const pinataJWT = process.env.REACT_APP_PINATA_JWT;

    if (!pinataJWT) {
      console.warn('⚠️ Pinata JWT not found. Using demo mode.');
      // Demo mode: Simulate metadata upload
      console.log('📤 [DEMO] Uploading metadata to IPFS...', metadata);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCID = `Qm${Array.from({ length: 44 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
          Math.floor(Math.random() * 62)
        ]
      ).join('')}`;

      return {
        cid: mockCID,
        url: `https://gateway.pinata.cloud/ipfs/${mockCID}`,
      };
    }

    // Real Pinata upload
    console.log('📤 Uploading metadata to Pinata IPFS...', metadata);

    const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
    const jsonFile = new File([jsonBlob], 'metadata.json', { type: 'application/json' });

    const formData = new FormData();
    formData.append('file', jsonFile);

    // Add metadata
    const pinataMetadata = JSON.stringify({
      name: 'metadata.json',
      keyvalues: {
        type: 'metadata',
        uploadedAt: new Date().toISOString(),
      },
    });
    formData.append('pinataMetadata', pinataMetadata);

    // Add options
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.details || `Pinata API error: ${response.statusText}`);
    }

    const data = await response.json();
    const cid = data.IpfsHash;

    console.log('✅ Metadata uploaded to Pinata IPFS:', {
      cid,
      metadata,
    });

    return {
      cid,
      url: `https://gateway.pinata.cloud/ipfs/${cid}`,
    };
  } catch (error: any) {
    console.error('❌ Error uploading metadata to IPFS:', error);
    throw new Error(`Failed to upload metadata to IPFS: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Validate audio file
 */
export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp4', 'audio/x-m4a'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: MP3, WAV, FLAC, M4A`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: JPG, PNG, WebP`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

