import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmailVerification from "../hooks/useEmailVerification";
import Logo from "../assets/logo.png";

const EmailVerificationForm = ({ email }) => {
  const [code, setCode] = useState("");
  const [resendStatus, setResendStatus] = useState({ sent: false, message: "" });
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { verifyCode, resendCode, loading, error, success } = useEmailVerification();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (success) {
      //localStorage.removeItem("email_verification_pending");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) return;
    await verifyCode(email, code);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    const result = await resendCode(email);
    if (result.success) {
      setResendStatus({ sent: true});
      setCountdown(60);
      setTimeout(() => setResendStatus({ sent: false, message: "" }), 5000);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-2xl bg-white/90 p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-700">
          Email Verification
        </h2>
        <p className="mb-6 text-center text-gray-600 text-sm">
          Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition text-center tracking-widest font-mono"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full rounded-lg bg-[#b3c7e6] text-gray-700 px-4 py-2.5 text-base font-semibold shadow-md hover:bg-[#9bb6db] transition disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={countdown > 0 || loading}
              className="w-full rounded-lg border border-[#b3c7e6] bg-white text-[#3949AB] px-4 py-2.5 text-base font-semibold shadow-sm hover:bg-[#e3eaf6] transition disabled:opacity-60"
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}
            </button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {resendStatus.sent && <div className="text-green-600 text-center">{resendStatus.message}</div>}
          {success && (
            <div className="text-green-600 text-center">
              Verification successful! Redirecting to login...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationForm;