import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "flawless-howl-q07pf",
  appId: "1:982727052868:web:2c42b58201a5a3983f7611",
  apiKey: "AIzaSyD81sOtn50_wU8hYoyrOVESkmC8Kze3IL0",
  authDomain: "flawless-howl-q07pf.firebaseapp.com",
  storageBucket: "flawless-howl-q07pf.firebasestorage.app",
  messagingSenderId: "982727052868"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-workshopianacapa-c970ce82-4791-4857-bbe1-97495ecc6cd5");

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
