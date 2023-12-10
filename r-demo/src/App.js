import './App.css';
import Navbar from './components/Navbar';
import TextFrom from './components/TextFrom';
// import About from './components/About';
import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundColor = 'grey';
    }
    else {
        setMode('light');
        document.body.style.backgroundColor = 'white';
    }
};
  return (
    <>

      <Navbar title='TextUtils' AboutName='About us' mode={mode} toggleMode ={toggleMode} />
      <div className="container my-3">
        <TextFrom heading='Enter the text to analyze below' mode={mode}/>
      </div>
      {/* <About/> */}
    </>
  );
}

export default App;
