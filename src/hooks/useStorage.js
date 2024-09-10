import { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'; 
import { db, storage } from '../components/firebase/config'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; 

// Custom hook to handle file uploads to Firebase Storage and storing metadata in Firestore
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  // useEffect hook to run when the file changes (i.e., when a new file is selected for upload)
  useEffect(() => {
    if (!file) return;

    
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(db, 'images');
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Subscribe to the upload progress, handle errors, and complete the upload
    const unsub = uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage); 
      },
      (err) => {
        setError(err);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL); 

          // Create a timestamp and store the file data in Firestore (URL and timestamp)
          const createdAt = serverTimestamp(); 
          await addDoc(collectionRef, { url: downloadURL, createdAt }); 
        } catch (err) {
          setError(err);
        }
      }
    );

    // Cleanup function to unsubscribe from the upload task when the component unmounts or the file changes
    return () => unsub();
  }, [file]); 

  return { progress, url, error };
};

export default useStorage;