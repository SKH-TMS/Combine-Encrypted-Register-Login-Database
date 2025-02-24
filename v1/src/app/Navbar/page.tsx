"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // ✅ Detect route changes
import { getAuthStatus, setAuthFalse } from "@/auth/authstore";
export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());
  const pathname = usePathname(); // ✅ Get the current route
  const router = useRouter();
  useEffect(() => {
    setIsAuthenticated(getAuthStatus()); // ✅ Update authentication status when route changes
  }, [pathname]); // ✅ Runs when pathname changes

  const handleLogout = () => {
    setAuthFalse();
    setIsAuthenticated(false);
    router.push("/Login");
  };

  return (
    <nav className="bg-teal-900 flex justify-between text-white">
      <div>
        <Link href="/" className="mr-4">
          Home
        </Link>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link href="/Register" className="mr-4">
              Register
            </Link>
            <Link href="/Login">Login</Link>
          </>
        ) : (
          <>
            <Link href="/Profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-2 rounded ml-4"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
