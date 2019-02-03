import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
FIREBASE_API_KEY,
AUTH_DOMAIN,
DB_URL,
PROJECT_ID,
STORAGE_BUCKET,
MESSAGING_SENDER_ID,
} from './firebaseSecrets'

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

export const Firestore = firebase.firestore();
