import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


import "./app.css";
import SplashScreen from './pages/SplashScreen.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SingIn.jsx';
import Transactions from './pages/Transactions.jsx';
import Expenses from './pages/Expenses.jsx';
import UpcomingBills from './pages/UpcomingBills.jsx';
import Incomes from './pages/Incomes.jsx';
import Categories from './pages/Categories.jsx';
import SavingGoals from './pages/SavingGoals.jsx';

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
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/upcoming-bills" element={<UpcomingBills />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/saving-goals" element={<SavingGoals />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;