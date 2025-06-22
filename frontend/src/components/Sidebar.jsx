import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FiX, FiAlertCircle } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <>
      <aside
        className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto border-r border-white/30 backdrop-blur-lg bg-white/60 shadow-lg"
        style={{ backgroundColor: "#dbe2e9" }}
      >
        <a href="#" className="flex items-center space-x-3 mb-4">
          <img className="w-12 h-12" src={Logo} alt="Logo" />
          <span className="text-xl font-bold text-gray-800">My Wallet</span>
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6">
            <div className="space-y-3">
              {/* Overview */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/home"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l9-9 9 9M4.5 10.5v9.75A1.5 1.5 0 006 21h12a1.5 1.5 0 001.5-1.5V10.5"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Overview</span>
              </a>

              {/* Transactions */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/transactions"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 3v13.5m0 0l-4.5-4.5m4.5 4.5l4.5-4.5M16.5 21V7.5m0 0l4.5 4.5m-4.5-4.5l-4.5 4.5"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Transactions</span>
              </a>

              {/* Expenses */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/expenses"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l-6-6m6 6l6-6"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Expenses</span>
              </a>

              {/* Upcoming Bills */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/upcoming-bills"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Upcoming Bills</span>
              </a>

              {/* Incomes */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/incomes"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M6 6h12M6 14h12M3 18h18"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Incomes</span>
              </a>

              {/* Categories */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/categories"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h7v7H3V4zm11 0h7v7h-7V4zM3 13h7v7H3v-7zm11 0h7v7h-7v-7z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Categories</span>
              </a>

              {/* Saving Goals */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/saving-goals"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Saving Goals</span>
              </a>

              {/* Profile */}
              <a
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-[#d1d0ce] rounded-lg transition duration-300"
                href="/profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.75 22.5h-11.5A2.25 2.25 0 014.5 20.25v-.75z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Profile</span>
              </a>

              {/* Log Out */}
              <a
                onClick={() => setShowModal(true)}
                className="cursor-pointer flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m2.25-3h-9m9 0l-3-3m3 3l-3 3"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Log Out</span>
              </a>
            </div>
          </nav>
        </div>
      </aside>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white bg-opacity-80 rounded-lg shadow-sm backdrop-filter backdrop-blur-md">
              {/* Close button */}
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setShowModal(false)}
              >
                <FiX className="w-4 h-4" />
                <span className="sr-only">Close modal</span>
              </button>

              <div className="p-4 md:p-5 text-center">
                <FiAlertCircle className="mx-auto mb-4 text-gray-400 w-12 h-12" />
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to log out?
                </h3>

                <button
                  onClick={handleLogout}
                  className="w-50 justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-base font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
                >
                  Yes, log me out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
