"use server";

import bcrypt from "bcryptjs";
import { generateToken, setAuthCookie } from "@/lib/session";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";

// Mock user database (Replace with real DB)
const users = [
  {
    id: '123456',
    email: "user@example.com",
    name: "Bhabani Prasad",
    password: bcrypt.hashSync("password123", 10),
    image: 'https://gravatar.com/images/homepage/avatar-01.png',
  },
];

// Server Action: Login
export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = LoginFormSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ...prevState, success: false, error: "Invalid credentials" };
  }

  const { email, password } = parsed.data;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid credentials" };
  }

  const token = await generateToken({ id: user.id, email, name: user.name, image: user.image });
  await setAuthCookie(token);

  return { success: true };
}
