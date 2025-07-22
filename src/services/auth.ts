import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  UserCredential 
} from 'firebase/auth';
import { auth } from './firebaseConfig';

export const signIn = (email: string, password: string): Promise<UserCredential> => 
  signInWithEmailAndPassword(auth, email, password);

export const signUp = (email: string, password: string): Promise<UserCredential> => 
  createUserWithEmailAndPassword(auth, email, password);

export const signOut = (): Promise<void> => firebaseSignOut(auth);