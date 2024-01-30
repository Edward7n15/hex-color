import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [hexCode, setHexCode] = useState('');
  const [colorName, setColorName] = useState('');
  const [errorExist, setErrorExist] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [converted, setConverted] = useState(false);
  const [textColor, setTextColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // refresh
      setErrorExist(false)
      setColorName('')
      // send the input to the backend
      const response = await axios.post('http://localhost:5000/api/convert', { hexCode });
      // English name is returned
      setColorName(response.data.response);
      setConverted(true);
      setTextColor(hexCode);
    } catch (error) {
      setErrorMessage('Failed to convert hex code to color name');
      setErrorExist(true)
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Hex Code here"
          onChange={(e) => setHexCode(e.target.value)}
        />
        <button type="submit">Convert</button>
      </form>
      {converted && (
        <p style={{ color: textColor, fontSize: 14, fontFamily: 'Georgia' }}>{colorName}</p>
      )}
      {errorExist && (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default App;
