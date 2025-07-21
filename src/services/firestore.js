import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Submit registration form
export const submitRegistrationForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'registration'), {
      ...formData,
      submittedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting registration:', error);
    return { success: false, error: error.message };
  }
};

// Submit partnership form
export const submitPartnershipForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'partnership'), {
      ...formData,
      submittedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting partnership:', error);
    return { success: false, error: error.message };
  }
};

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'contactForms'), {
      ...formData,
      submittedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

// Fetch all registrations for admin dashboard
export const fetchApplications = async () => {
  try {
    const q = query(collection(db, 'registration'), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const applications = [];
    
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: applications };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error: error.message };
  }
};

// Fetch all partnerships for admin dashboard
export const fetchPartnerships = async () => {
  try {
    const q = query(collection(db, 'partnership'), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const partnerships = [];
    
    querySnapshot.forEach((doc) => {
      partnerships.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: partnerships };
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return { success: false, error: error.message };
  }
};

// Fetch all contact forms for admin dashboard
export const fetchContactForms = async () => {
  try {
    const q = query(collection(db, 'contactForms'), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const contactForms = [];
    
    querySnapshot.forEach((doc) => {
      contactForms.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: contactForms };
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    return { success: false, error: error.message };
  }
};