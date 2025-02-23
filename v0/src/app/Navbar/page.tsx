"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // ✅ Check authentication status from sessionStorage
    const userType = sessionStorage.getItem("userType");
    setIsAuthenticated(true);
  }, []);
  return (
    <nav className="bg-teal-900 flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link href="/Register">Register</Link>
            <Link href="/Login">Login</Link>
          </>
        ) : (
          <>
            <Link href="/Profile">Profile</Link>
          </>
        )}
      </div>
    </nav>
  );
}
