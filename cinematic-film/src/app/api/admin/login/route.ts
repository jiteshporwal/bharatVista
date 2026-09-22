import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  signAdminSession,
  validateAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    const identifier = String(email || username || "").trim();
    const secret = String(password || "").trim();

    if (!identifier) {
      return NextResponse.json(
        { error: "Please enter your admin email or username." },
        { status: 400 }
      );
    }

    if (!secret) {
      return NextResponse.json(
        { error: "Please enter your admin password." },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(identifier, secret);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@bharatvista.com";
    const token = await signAdminSession(adminEmail);

    const response = NextResponse.json(
      {
        success: true,
        message: "Authenticated successfully. Redirecting to dashboard...",
        user: {
          email: adminEmail,
          role: "admin",
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("[BharatVista Admin Login Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}

