"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signinFormSchema } from "../validator";
import { auth } from "../auth";

type signinType = {
  email: string;
  password: string;
  rememberMe: boolean;
  callbackURL: string;
};

export async function signInWithEmailPassword({
  email,
  password,
  rememberMe,
  callbackURL,
}: signinType) {
  try {
    if (!email && !password)
      throw new Error("Please Provide email and password");

    const user = signinFormSchema.parse({ email, password });

    await auth.api.signInEmail({
      body: {
        email: user.email,
        password: user.password,
        rememberMe,
        callbackURL,
      },
    });

    return { success: true, message: "successfully signin" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "fail to login" };
  }
}
