"use server";

import { signupInWithEmailPassword } from "@/lib/actions/user.actions";

type SignupState = {
  success: boolean;
  message: string;
};

export async function signup(
  state: unknown,
  formData: FormData,
): Promise<SignupState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackURL = formData.get("callbackURL");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof callbackURL !== "string"
  ) {
    return { success: false, message: "Invalid form data" };
  }

  return await signupInWithEmailPassword({
    name,
    email,
    password,
    callbackURL,
  });
}
