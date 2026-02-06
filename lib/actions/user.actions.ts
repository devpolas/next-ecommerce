"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signinFormSchema, signupFormSchema } from "../validator";
import { auth } from "../auth";
import { headers } from "next/headers";

type signinType = {
  email: string;
  password: string;
  rememberMe: boolean;
  callbackURL: string;
};

type signupType = {
  name: string;
  email: string;
  password: string;
  image: string;
  callbackURL: string;
};

export async function signupInWithEmailPassword(signupData: signupType) {
  try {
    // validation with zod
    const user = signupFormSchema.parse(signupData);
    // handel signup better auth
    return await auth.api.signUpEmail({
      body: user,
      headers: await headers(),
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}

export async function signInWithEmailPassword(signinData: signinType) {
  try {
    // validation with zod
    const user = signinFormSchema.parse(signinData);
    // handel signin better auth
    return await auth.api.signInEmail({
      body: user,
      headers: await headers(),
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}

export async function logout() {
  // logout
  return await auth.api.signOut({ headers: await headers() });
}
