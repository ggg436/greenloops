import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

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