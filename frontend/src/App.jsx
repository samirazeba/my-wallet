import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import "./app.css";
import SplashScreen from './pages/SplashScreen.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SingIn.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;