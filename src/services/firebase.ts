import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  databaseURL: Constants.manifest.extra.databaseURL,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};

export const firebase = initializeApp(firebaseConfig);
export const firestore = initializeFirestore(firebase, { experimentalAutoDetectLongPolling: true });