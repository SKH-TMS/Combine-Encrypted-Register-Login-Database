"use client";

import { useEffect } from "react";
import { setAuthTrue } from "@/auth/authstore"; // Import global auth functions

export default function Profile() {
  useEffect(() => {
    setAuthTrue(); // ✅ Set authentication when visiting Profile
  }, []);

  return (
    <div>
      <h1 className="text-center">Profile</h1>
      <p className="text-center">User is logged in</p>
    </div>
  );
}
