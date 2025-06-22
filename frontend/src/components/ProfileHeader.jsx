import React from "react";
import useUserFirstName from "../hooks/useUserFirstName";

export default function ProfileHeader() {
    const firstName = useUserFirstName();
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Welcome to your profile, {firstName}</h1>
        </div>
      </div>
    </>
  );
}