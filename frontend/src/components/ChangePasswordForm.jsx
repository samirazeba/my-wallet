import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../hooks/useChangePassword";

const ChangePasswordForm = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");
  const { changePassword, loading, error, success } = useChangePassword();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass.length < 8) {
      setLocalError("New password must be at least 8 characters.");
      return;
    }
    if (newPass !== confirm) {
      setLocalError("New passwords do not match.");
      return;
    }
    setLocalError("");
    await changePassword(current, newPass);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[#b3c7e6] py-2 font-semibold text-gray-700 hover:bg-[#9bb6db]"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
        {(localError || error) && (
          <div className="text-red-500 text-sm">{localError || error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm">
            {success} Redirecting to login...
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePasswordForm;