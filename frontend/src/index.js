import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import SignupPage from './landing_page/signup/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './landing_page/login/LoginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <HomePage/>

  <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      {/* <Route path="/students" element={<Student/>}/>
      <Route path="/login" element={<LoginPage/>}/> */}

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
