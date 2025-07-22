import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
  DocumentReference,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Define interfaces for your form data
interface ApplicationData {
  [key: string]: any;
  submittedAt?: Date;
}

interface ApplicationWithId extends ApplicationData {
  id: string;
  submittedAt: Date;
}

export const submitRegistrationForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "registration"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const submitPartnershipForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "partnership"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error details:", {
      message: (error as Error).message,
      code: (error as any).code,
      stack: (error as Error).stack
    });
    throw error;
  }
};

export const submitContactForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "contactForms"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const fetchApplications = async (): Promise<ApplicationWithId[]> => {
  try {
    const q = query(
      collection(db, "registration"), 
      orderBy("submittedAt", "desc")
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt.toDate()
      } as ApplicationWithId;
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
};


export const fetchPartnerships = async (): Promise<ApplicationWithId[]> => {
  try {
    const q = query(
      collection(db, "registration"), 
      orderBy("submittedAt", "desc")
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt.toDate()
      } as ApplicationWithId;
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
};

export { db };