import React, { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { sendForgotPassword, loading, error, success } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendForgotPassword(email);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-2 py-32">
      <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-lg p-10 bg-white">
        <h2 className="mt-4 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Enter your email and we'll send you a reset link.
        </p>

        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          {error && (
            <p className="text-center font-medium text-red-700 p-4">{error}</p>
          )}
          {success && (
            <p className="text-center font-medium text-green-700 p-4">{success}</p>
          )}

          <p className="text-center text-sm text-gray-500 mt-2">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-semibold hover:text-[#3949AB] block text-sm font-medium text-gray-700"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;