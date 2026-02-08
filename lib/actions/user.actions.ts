"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signinFormSchema, signupFormSchema } from "../validator";
import { auth } from "../auth";
import { headers } from "next/headers";

type signinType = {
  email: string;
  password: string;
  rememberMe: boolean;
  callbackURL?: string;
};

type signupType = {
  name: string;
  email: string;
  password: string;
  callbackURL?: string;
};

export async function signupInWithEmailPassword(signupData: signupType) {
  try {
    // validation with zod
    const user = signupFormSchema.parse(signupData);
    // handel signup better auth
    await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      asResponse: true,
      headers: await headers(),
    });

    // signin after signup
    const result = await auth.api.signInEmail({
      body: {
        email: user.email,
        password: user.password,
      },
      asResponse: true,
      headers: await headers(),
    });

    console.log(result);

    return { success: true, message: "successfully signup" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "invalid credentials" };
  }
}

export async function signInWithEmailPassword(signinData: signinType) {
  try {
    // validation with zod
    const user = signinFormSchema.parse(signinData);
    // handel signin better auth
    const result = await auth.api.signInEmail({
      body: {
        email: user.email,
        password: user.password,
      },
      asResponse: true,
      headers: await headers(),
    });

    console.log(result);

    return { success: true, message: "successfully signin" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "invalid credentials" };
  }
}

export async function logout() {
  // logout
  return await auth.api.signOut({ headers: await headers() });
}
