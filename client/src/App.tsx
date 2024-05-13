import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/login.tsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login />} />
      </Routes>
    </div>
  );
}

export default App;
