import Link from "next/link";
export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/Login">Login</Link>
      <Link href="/Register">Register</Link>
      <Link href="/Profile" legacyBehavior>
        <a>Profile</a>
      </Link>
    </nav>
  );
}
