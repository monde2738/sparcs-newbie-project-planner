import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/login.tsx';
import Signup from './pages/signup.tsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={ <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
