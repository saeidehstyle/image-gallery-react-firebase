import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../components/firebase/config"; 

// Custom hook to fetch and listen for real-time updates from a Firestore collection
export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  // useEffect hook to manage the Firestore subscription
  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));

    // Listen for real-time updates on the Firestore collection
    const unsub = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDocs(documents);
    });

    // Clean up the subscription when the component unmounts or the collectionName changes
    return () => unsub();
  }, [collectionName]); 

  
  return { docs };
};
