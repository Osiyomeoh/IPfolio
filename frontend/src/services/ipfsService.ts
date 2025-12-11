/**
 * IPFS Service
 * 
 * Handles uploading files (music, artwork, metadata) to IPFS.
 * Uses web3.storage for easy IPFS integration.
 * 
 * In production, you would:
 * 1. Get API token from web3.storage
 * 2. Set REACT_APP_WEB3_STORAGE_TOKEN in .env
 * 3. Use real uploads instead of mock
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
export async function uploadFileToIPFS(file: File): Promise<IPFSUploadResult> {
  try {
    // In production, use web3.storage:
    // const { Web3Storage } = await import('web3.storage');
    // const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN! });
    // const cid = await client.put([file]);
    // return { cid, url: `https://${cid}.ipfs.w3s.link` };

    // Demo: Simulate IPFS upload
    console.log('📤 Uploading file to IPFS...', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate realistic-looking IPFS CID (Qm... format)
    const mockCID = `Qm${Array.from({ length: 44 }, () => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
        Math.floor(Math.random() * 62)
      ]
    ).join('')}`;

    const result: IPFSUploadResult = {
      cid: mockCID,
      url: `https://${mockCID}.ipfs.w3s.link`,
    };

    console.log('✅ File uploaded to IPFS:', result);
    return result;
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
export async function uploadMetadataToIPFS(metadata: Record<string, any>): Promise<IPFSUploadResult> {
  try {
    // In production:
    // const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
    // const jsonFile = new File([jsonBlob], 'metadata.json', { type: 'application/json' });
    // return await uploadFileToIPFS(jsonFile);

    // Demo: Simulate metadata upload
    console.log('📤 Uploading metadata to IPFS...', metadata);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockCID = `Qm${Array.from({ length: 44 }, () => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
        Math.floor(Math.random() * 62)
      ]
    ).join('')}`;

    const result: IPFSUploadResult = {
      cid: mockCID,
      url: `https://${mockCID}.ipfs.w3s.link/metadata.json`,
    };

    console.log('✅ Metadata uploaded to IPFS:', result);
    return result;
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

