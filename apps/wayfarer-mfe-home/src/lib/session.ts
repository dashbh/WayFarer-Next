import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRATION = "2h"; // Token expires in 1 hour

// Mock user database (Replace with real DB)
const users = [
  { email: "user@example.com", password: bcrypt.hashSync("password123", 10) },
];

// Generate JWT token using `jose`
export async function generateToken(email: string) {
  return await new SignJWT({ email })
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
 
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
    // domain: process.env.WAYFARER_DOMAIN, // Allows sharing across MFEs
  });
}

export async function refreshSession() {
  const session = await getSession();
 
  if (!session) {
    return null;
  }
  const { payload, token } = session;
  setAuthCookie(token);
};

// Validate JWT and retrieve session data with token
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { payload, token };
  } catch {
    console.log('Failed to verify session');
    return null;
  }
}

// Validate JWT and retrieve session data without token
export async function getCurrentUser() {
  const session = await getSession();
 
  if (!session) {
    return null;
  }
  const { payload } = session;
  return payload;
}

// Clear authentication cookie
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
