import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { UserType } from "@wayfarer/types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRATION = "2h"; // Token expires in 1 hour

// Generate JWT token using `jose`
export async function generateToken(payload: UserType) {
  return await new SignJWT({ ...payload})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

// Store JWT in a secure cookie (shared across MFEs)
export async function setAuthCookie(token: string) {
  // Set expire for 2hrs from now
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function refreshSession() {
  const session = await getSession();

  if (!session) {
    return null;
  }
  const { payload, token } = session;
  setAuthCookie(token);
}

// Validate JWT and retrieve session data with token
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { payload, token };
  } catch {
    console.log("Failed to verify session");
    return null;
  }
}

function isValidPayload(payload: any): payload is JWTPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.id === "string" &&
    typeof payload.email === "string" &&
    typeof payload.name === "string"
  );
}

// Validate JWT and retrieve session data without token
export async function getCurrentUser() {
  const session = await getSession();

  if (!session || !isValidPayload(session.payload)) {
    console.warn("Invalid or missing payload:", session?.payload);
    return null;
  }

  const { payload } = session;
  return mapJwtToUser(payload);
}

export function mapJwtToUser(payload: JWTPayload | null): UserType | null {
  if (!payload) return null; // Handle null case

  const userObj: UserType = {
    id: String(payload.sub || "no-id"),
    email: String(payload.email || "no-email@example.com"),
    name: String(payload.name || "WayFarer User"),
    image: String(payload.image || "https://gravatar.com/images/homepage/avatar-01.png"),
    avatar: String(payload.avatar || "https://gravatar.com/images/homepage/avatar-01.png"),
  };
  return userObj;
}

// Clear authentication cookie
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
