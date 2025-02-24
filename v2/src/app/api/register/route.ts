import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, contact } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }
    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email is already registered" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error while finding user:", error);
      return NextResponse.json(
        { error: "Failed to find user" },
        { status: 500 }
      );
    }
    // Default profile picture
    const profilepic = "/default-profile.png";
    // Insert new user into database
    const n_users = await User.countDocuments();
    const assignid = `User-${n_users + 1}`;
    console.log(assignid);
    await User.create({
      userRole: "User",
      firstname: firstName,
      lastname: lastName,
      email,
      password, // Store the hashed password
      contact: contact || "", // Optional field
      profilepic: profilepic,
      userType: "User",
      UserId: assignid,
    });
    const res = NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      {
        status: 201,
      }
    );
    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Failed to register" });
  }
}
