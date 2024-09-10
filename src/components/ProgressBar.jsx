import React, { useEffect } from 'react'; 
import useStorage from '../hooks/useStorage'; 
import { motion } from 'framer-motion'; 

// Functional component for displaying a progress bar
const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  // Effect to clear the file once the upload is complete
  useEffect(() => {
    if (url) {
      setFile(null); 
    }
  }, [url, setFile]); 

  return (
      <motion.div 
      className="progress-bar" 
      initial={{width:0}} 
      animate={{width: progress + '%'}} 
      >
      {Math.round(progress)}% {/* Display rounded progress percentage */}
    </motion.div>
  );
};

export default ProgressBar; 
