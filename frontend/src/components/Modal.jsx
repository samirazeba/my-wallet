import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {children}
        <button className="mt-4 text-sm text-gray-500" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}