import React from "react";
import { getTokenDetails } from "../Utils/authUtils";

const UserProfile = () => {
  const userDetails = getTokenDetails();

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">User Profile</h2>
      {userDetails ? (
        <div className="mt-3">
          <p><strong>Email:</strong> {userDetails.sub}</p>
          <p><strong>Roles:</strong> {userDetails.roles.join(", ")}</p>
          <p><strong>Authorities:</strong> {userDetails.authorities.join(", ")}</p>
          <p><strong>Account Enabled:</strong> {userDetails.isEnable ? "Yes" : "No"}</p>
          <p><strong>Token Expiry:</strong> {new Date(userDetails.exp * 1000).toLocaleString()}</p>
        </div>
      ) : (
        <p className="text-red-500">No user logged in.</p>
      )}
    </div>
  );
};

export default UserProfile;





