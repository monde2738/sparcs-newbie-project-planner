
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/login.tsx';
import Signup from './pages/signup.tsx';
import Main from './pages/main.tsx';
import TimeTable from './pages/timetable.tsx';

function App() {
  return (
    <div className="App" lang="Kor" >
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/main/:id" element={ <Main />} />
        <Route path="/tth" element={< TimeTable/>} />
      </Routes>
    </div>
  );
}

export default App;
