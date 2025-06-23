import React, { useState } from "react";

const getInitialsAndColor = (name) => {
  let initials = "?";
  if (name) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      initials = parts[0][0].toUpperCase();
    } else if (parts.length > 1) {
      initials = `${parts[0][0].toUpperCase()}${parts[1][0].toUpperCase()}`;
    }
  }
  const colors = [
    "bg-[#dbe2e9] border-gray-700",
  ];
  const color = colors[initials.charCodeAt(0) % colors.length];
  return { initials, color };
};

const ProfileCard = ({
  avatar,
  name = "User",
  email,
  phone,
}) => {
  const [imgError, setImgError] = useState(false);
  const { initials, color } = getInitialsAndColor(name);

  // Show loading if name/email/phone are not yet loaded
  if (!name && !email && !phone) {
    return (
      <div className="w-full bg-white shadow rounded-2xl p-6 flex flex-col items-center mb-6">
        <div className="animate-pulse h-6 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="animate-pulse h-4 w-24 bg-gray-200 rounded mb-1"></div>
        <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow rounded-2xl p-6 flex flex-col items-center mb-6">
      <div className={`w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center mb-4 ${!avatar || imgError ? color : ''}`}>
        {avatar && !imgError ? (
          <img
            className="object-cover w-full h-full"
            src={avatar}
            alt="Avatar"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-gray-700 text-4xl font-bold ">{initials}</span>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      {email && <p className="text-gray-500 text-sm">{email}</p>}
      {phone && <p className="text-gray-500 text-sm">{phone}</p>}
    </div>
  );
};

export default ProfileCard;