import './App.css';
import Signin from './components/Signin.js';
import './components/Signin.css';
import React from 'react';
import Newpage from './components/Newpage.js';


function App() {
  const defaultPathname=window.location.pathname==='/'?'/signin':window.location.pathname;
  return (
    <div className="App">
      <header className="App-header">
         
         {defaultPathname==='/signin'?<Signin/>:<Newpage/>}
         
      </header>
    </div>
  );
}

export default App;
