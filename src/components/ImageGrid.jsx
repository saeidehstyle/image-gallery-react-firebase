import { deleteDoc, doc } from "firebase/firestore"; 
import { ref, deleteObject } from "firebase/storage"; 
import { useFirestore } from "../hooks/useFirestore"; 
import { useState } from "react"; 
import { db, storage } from "../components/firebase/config"; 
import { motion } from "framer-motion"; 

// Functional component for displaying a grid of images
export const ImageGrid = ({ selectedImg }) => {
  const { docs } = useFirestore('images');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  // Function to handle deletion of an image and its Firestore document
  const handleDelete = async (e, docId, imageUrl) => {
    e.stopPropagation(); 
    try {
      const docRef = doc(db, 'images', docId);
      await deleteDoc(docRef);

      // Create a reference to the image in Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      console.log('Document and image deleted successfully');
    } catch (err) {
      console.error("Error deleting document or file:", err);
    }
  };

  // Function to show the delete button after a delay
  const showButtonAfterDelay = () => {
    const timer = setTimeout(() => {
      setShowDeleteButton(true);
    }, 500); 
    setDeleteTimer(timer); 
  };

  // Function to hide the delete button and clear the timer
  const hideButton = () => {
    clearTimeout(deleteTimer); 
    setShowDeleteButton(false); 
  };

  return (
    <div className="img-grid">
      {docs && docs.map((doc) => (
        <motion.div
          className="img-wrap"
          key={doc.id}
          onClick={() => selectedImg(doc.url)} 
          layout
          whileHover={{opacity:1}} 
          onMouseEnter={showButtonAfterDelay} 
          onMouseLeave={hideButton} 
        >
          <motion.img 
          src={doc.url} 
          alt="uploaded" 
          initial={{opacity:0}} 
          animate={{opacity:1}} 
          transition={{delay:1}} 
           />
          {showDeleteButton && (
            <button
              className="delete-button"
              onClick={(e) => handleDelete(e, doc.id, doc.url)} 
            >
              Delete
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};
