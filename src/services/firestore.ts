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
interface PartnershipFormData {
  [key: string]: any;
  submittedAt?: Date;
}

interface ApplicationWithId extends ApplicationData {
  id: string;
  submittedAt: Date;
}

export const submitRegistrationForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "applications-2025"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const fetchApplications = async (): Promise<ApplicationWithId[]> => {
  try {
    const q = query(
      collection(db, "applications-2025"), 
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
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export { db };