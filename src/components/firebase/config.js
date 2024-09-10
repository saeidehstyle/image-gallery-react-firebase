import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4iKrlJIqcXamHNY2LvyzSU_Rb5pvOq-M",
  authDomain: "saeideh-479.firebaseapp.com",
  projectId: "saeideh-479",
  storageBucket: "saeideh-479.appspot.com",
  messagingSenderId: "981947597360",
  appId: "1:981947597360:web:bfe8275a7affcf40c8a3f5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
