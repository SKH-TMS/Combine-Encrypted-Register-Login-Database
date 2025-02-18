import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, contact } = await req.json();

    // Connect to MongoDB
    await client.connect();
    const db = client.db("team_manager_db");
    const collection = db.collection("register_user");

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      contact: contact,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Failed to register" });
  } finally {
    await client.close();
  }
}
