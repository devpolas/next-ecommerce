"use server";

type SigninState = {
  success: boolean;
  message: string;
};

import { signInWithEmailPassword } from "@/lib/actions/user.actions";

export async function signin(
  prevState: SigninState,
  formData: FormData,
): Promise<SigninState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackURL = formData.get("callbackURL");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof callbackURL !== "string"
  ) {
    return { success: false, message: "Invalid form data" };
  }

  const rememberMe = formData.get("rememberMe") === "on";

  return await signInWithEmailPassword({
    email,
    password,
    rememberMe,
    callbackURL,
  });
}
