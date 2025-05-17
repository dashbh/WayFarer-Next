"use server";

import { cookies } from "next/headers";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { logger } from "@wayfarer/utils";

// Server Action: Login
export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = LoginFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    logger.error("Invalid credentials");
    return { ...prevState, success: false, error: "Invalid credentials" };
  }

  const { usename, password } = parsed.data;

  const apiUrl = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/auth/login`;
  console.log("API URL:", apiUrl);

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 crucial for cookies
      body: JSON.stringify({ usename, password }),
    });

    const data = await res.json();
    console.log("Response data:", data, res);

    // 🟡 Manually get cookie from response header
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      // 🟢 Parse the cookie name and value from header (simple parser)
      const cookieParts = setCookieHeader?.split(";")[0]?.split("=") || [];
      const value = cookieParts[1] || "";

      if (value) {
        // 🟢 Set the cookie in the browser
        const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const cookieStore = await cookies();
        cookieStore.set("auth_token", value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: expiresAt,
          sameSite: "lax",
          path: "/",
        });
      }
    }

    if (!res.ok) {
      return { error: "Invalid credentials" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "An error occurred during login" };
  }
  // if (!user || !(await bcrypt.compare(password, user.password))) {
  //   logger.error("Invalid credentials", { email });
  //   return { error: "Invalid credentials" };
  // }

  // const token = await generateToken({
  //   id: user.id,
  //   email,
  //   name: user.name,
  //   image: user.image,
  // });
  // logger.info("User Logged in", { email });
  // await setAuthCookie(token);

  // return { success: true };
}
