import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { sendResetPassword, loading, error, success } =
    useResetPassword(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      localStorage.removeItem("forgot_password_strated");
      // Redirect to login after 2 seconds
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const validate = () => {
    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError("");
    sendResetPassword(newPassword);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-2 py-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <h2 className="mt-4 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Enter your new password below.
        </p>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#b3c7e6] sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#b3c7e6] sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border border-[#b3c7e6] bg-white text-[#3949AB] px-4 py-2.5 text-base font-semibold shadow-sm hover:bg-[#e3eaf6] transition disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
          {(localError || error) && (
            <p className="text-center font-medium text-red-700 p-4">
              {localError || error}
            </p>
          )}
          {success && (
            <p className="text-center font-medium text-green-700 p-4">
              {success} <br /> Redirecting to login...
            </p>
          )}
          <p className="text-center text-sm text-gray-500 mt-2">
            <a
              href="/login"
              className="font-semibold hover:text-[#3949AB] block text-sm font-medium text-gray-700"
            >
              Back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
