import React, { useState } from "react";
import useRegisterUser from "../hooks/useRegisterUser";
import Logo from "../assets/logo.png";

const SignUpForm = () => {
  const { user, registerUser, error, loading } = useRegisterUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await registerUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );

    if (response) {
      setSuccess(true);
      setTimeout (() => setSuccess(false), 3000);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      console.log("User registered successfully:", response);
      // Redirect or perform any other action after successful registration
    } else {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-blue-100 px-4 py-12">
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Registration successful!
          </div>
        </div>
      )}
      <div className="w-full max-w-lg bg-white/90 border border-gray-200 rounded-2xl shadow-2xl p-8 sm:p-10">
        {/* Logo or Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-16"
          />
        </div>
        <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {error?.first_name && (
                <p className="text-red-500 text-xs mt-1">{error.first_name}</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {error?.last_name && (
                <p className="text-red-500 text-xs mt-1">{error.last_name}</p>
              )}
            </div>
          </div>

          {/* Email and Phone Number */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {error?.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                required
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {error?.phone_number && (
                <p className="text-red-500 text-xs mt-1">{error.phone_number}</p>
              )}
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {error?.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-base font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;