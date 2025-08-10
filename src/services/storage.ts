import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
  'application/rtf'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.odt', '.txt', '.rtf'];

export const validateDocumentFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return {
        isValid: false,
        error: 'Only document files are allowed (PDF, DOC, DOCX, ODT, TXT, RTF)'
      };
    }
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB'
    };
  }

  return { isValid: true };
};

export const uploadDocument = async (file: File, applicantName: string): Promise<string> => {
  const validation = validateDocumentFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const timestamp = Date.now();
  const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_');
  const fileExtension = file.name.split('.').pop();
  const fileName = `${sanitizedName}_${timestamp}.${fileExtension}`;
  
  const storageRef = ref(storage, `application-documents/${fileName}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw new Error('Failed to upload document. Please try again.');
  }
};