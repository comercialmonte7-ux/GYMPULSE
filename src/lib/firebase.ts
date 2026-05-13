import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence,
  indexedDBLocalPersistence,
  initializeAuth
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Ensure singleton app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use initializeAuth with explicit persistence for better control in PWA context
// We try IndexedDB first but fallback to browserLocalPersistence (LocalStorage)
// This is the most robust way to handle the iOS standalone sandbox
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});

// Capture the underlying promise for persistence setup
export const authInitialized = (auth as any)._initializationPromise || Promise.resolve();

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
  prompt: 'select_account',
  display: 'touch' 
});

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

export const handleFirestoreError = (error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null) => {
  if (error?.code === 'permission-denied') {
    const errorInfo: FirestoreErrorInfo = {
      error: error.message,
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid || 'unauthenticated',
        email: auth.currentUser?.email || 'none',
        emailVerified: auth.currentUser?.emailVerified || false,
        isAnonymous: auth.currentUser?.isAnonymous || false,
        providerInfo: auth.currentUser?.providerData?.map(p => ({
          providerId: p.providerId,
          displayName: p.displayName || '',
          email: p.email || '',
        })) || [],
      }
    };
    throw new Error(JSON.stringify(errorInfo));
  }
  throw error;
};

// Conexión inicial para verificar estado del cliente
const testConnection = async () => {
    try {
      // Intentamos leer un documento inexistente para disparar la conexión al servidor
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Firebase Connection Error: Please check your configuration.");
      }
    }
};

testConnection();
