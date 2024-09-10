import React, { useState } from 'react'; 
import ProgressBar from './ProgressBar'; 

// Functional component for the file upload form
const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  // Function to handle file selection
  const handleChange = (e) => {
    let selected = e.target.files[0]; 

    // Check if the selected file is of an accepted type
    if (selected && types.includes(selected.type)) {
      setFile(selected); 
      setError(''); 
    } else {
      setFile(null); 
      setError('Please select an image file (png or jpeg)'); 
    }
  };

  return (
    <form>
      <label>
        {/* Input field for file selection */}
        <input type="file" onChange={handleChange} />
        {/* Button-like span for styling */}
        <span>+</span>
      </label>
      
      <div className="output">
        {/* Display error message if there is one */}
        {error && <div className="error">{error}</div>}
        {/* Display the name of the selected file if one is selected */}
        {file && <div>{file.name}</div>}
        {/* Show the ProgressBar component if a file is selected */}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm; 
