import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./app.css";
import SplashScreen from "./pages/SplashScreen.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SingIn.jsx";
import Transactions from "./pages/Transactions.jsx";
import Expenses from "./pages/Expenses.jsx";
import UpcomingBills from "./pages/UpcomingBills.jsx";
import Incomes from "./pages/Incomes.jsx";
import Categories from "./pages/Categories.jsx";
import SavingGoals from "./pages/SavingGoals.jsx";
import SavingGoalsHistory from "./pages/SavingGoalsHistory.jsx";
import Profile from "./pages/Profile.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const canAccessEmailVerification = !!localStorage.getItem(
  "email_verification_pending"
);
const canAccessResetPassword = !!localStorage.getItem(
  "forgot_password_strated"
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <SplashScreen />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upcoming-bills"
              element={
                <ProtectedRoute>
                  <UpcomingBills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/incomes"
              element={
                <ProtectedRoute>
                  <Incomes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saving-goals"
              element={
                <ProtectedRoute>
                  <SavingGoals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saving-goals-history"
              element={
                <ProtectedRoute>
                  <SavingGoalsHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                canAccessEmailVerification ? (
                  <EmailVerification />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                canAccessResetPassword ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
