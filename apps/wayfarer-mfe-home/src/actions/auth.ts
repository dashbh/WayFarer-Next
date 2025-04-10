"use server";

import bcrypt from "bcryptjs";
import { generateToken, setAuthCookie } from "@/lib/session";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { logger } from "@wayfarer/utils";

// Mock user database (Replace with real DB)
const users = [
  {
    id: "123456",
    email: "user@example.com",
    name: "Bhabani Prasad",
    password: bcrypt.hashSync("password123", 10),
    image: "https://gravatar.com/images/homepage/avatar-01.png",
  },
];

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

  const { email, password } = parsed.data;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.error("Invalid credentials", { email });
    return { error: "Invalid credentials" };
  }

  const token = await generateToken({
    id: user.id,
    email,
    name: user.name,
    image: user.image,
  });
  logger.info("User Logged in", { email });
  await setAuthCookie(token);

  return { success: true };
}
