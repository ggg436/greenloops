import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Convert a file to base64 string
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Resize an image file on the client to reduce payload size
export const resizeImageFile = async (
  file: File,
  options: { maxDimension?: number; outputType?: 'image/jpeg' | 'image/webp' | 'image/png'; quality?: number } = {}
): Promise<File> => {
  const { maxDimension = 1280, outputType = 'image/jpeg', quality = 0.8 } = options;
  if (!file.type.startsWith('image/')) return file;

  const imageDataUrl = await fileToBase64(file);
  const img = document.createElement('img');
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image for resizing'));
    img.src = imageDataUrl;
  });

  const canvas = document.createElement('canvas');
  let { width, height } = img;

  const scale = Math.min(1, maxDimension / Math.max(width, height));
  width = Math.round(width * scale);
  height = Math.round(height * scale);

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const blob: Blob = await new Promise((resolve) => canvas.toBlob(b => resolve(b as Blob), outputType, quality));
  return new File([blob], file.name.replace(/\.(png|jpg|jpeg|webp)$/i, '') + '.jpg', { type: outputType });
};

// Upload a file to Firebase Storage
export const uploadFile = async (file: File, path: string) => {
  try {
    console.log(`Starting upload of ${file.name} (${file.size} bytes) to ${path}`);
    
    // Check if file is valid
    if (!file || file.size === 0) {
      throw new Error('Invalid file: File is empty or undefined');
    }
    
    const storageRef = ref(storage, path);
    
    // Upload with metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        'originalName': file.name,
        'uploadedAt': new Date().toISOString()
      }
    };
    
    console.log('Uploading file...');
    const snapshot = await uploadBytes(storageRef, file, metadata);
    console.log('File uploaded successfully');
    
    console.log('Getting download URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL obtained:', downloadURL);
    
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath
    };
  } catch (error: any) {
    console.error("Error uploading file:", error);
    
    // Enhanced error messages
    let errorMessage = error.message || 'Unknown error during file upload';
    
    if (error.code) {
      console.error(`Firebase error code: ${error.code}`);
      
      // Provide more helpful error messages based on Firebase error codes
      switch (error.code) {
        case 'storage/unauthorized':
          errorMessage = 'Access to Firebase Storage denied. Check your security rules.';
          break;
        case 'storage/canceled':
          errorMessage = 'File upload was canceled.';
          break;
        case 'storage/unknown':
          errorMessage = 'Unknown error occurred during upload. Please try again.';
          break;
        case 'storage/quota-exceeded':
          errorMessage = 'Storage quota exceeded. Please contact support.';
          break;
      }
    }
    
    throw new Error(errorMessage);
  }
};

// Get the download URL for a file
export const getFileURL = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

// Delete a file from Firebase Storage
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}; 