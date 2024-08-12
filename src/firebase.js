import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: 'AIzaSyBi7ITBmH4YhsSTkCSHcInB2zObgf8n0uo',
  authDomain: 'l-sbase.firebaseapp.com',
  databaseURL:
    'https://l-sbase-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'l-sbase',
  storageBucket: 'l-sbase.appspot.com',
  messagingSenderId: '1024438208849',
  appId: '1:1024438208849:web:115ce720512f2a0dc3ab70',
});

const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { database, storage };
export default auth;
