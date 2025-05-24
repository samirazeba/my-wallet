import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useLogInUser from "../hooks/useLoginUser";

const LogInForm = () => {
  const { logInUser, error, loading } = useLogInUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(""); // "success" or "error"
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const result = await logInUser(email, password);
    if (result) {
      setToastType("success");
      setToastMessage("Login successful!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => navigate("/home"), 1000); // Redirect after short delay
    } else {
      setToastType("error");
      setToastMessage("Invalid email or password");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setFormError(error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50`}>
          <div
            className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
              ${
                toastType === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }
            `}
          >
            {toastType === "success" ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {toastMessage}
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <img
          alt="Your Company"
          src={Logo}
          className="mx-auto h-20 mt-6 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-700">
          LogIn to your account
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#3949AB] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#3949AB] sm:text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <a
                href="#"
                className="font-semibold hover:text-[#3949AB] block text-sm font-medium text-gray-700"
              >
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-[#b3c7e6] text-gray-700 px-4 py-2.5 text-base font-semibold shadow-md hover:bg-[#9bb6db] transition"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="text-center font-medium text-red-700 p-4">
            {formError}
          </p>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-gray-700 transition"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
