"use server";

import { signupInWithEmailPassword } from "@/lib/actions/user.actions";
import { uploadImage } from "@/lib/actions/imgbb.action";

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
  const imageFile = formData.get("image");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof callbackURL !== "string"
  ) {
    return { success: false, message: "Invalid form data" };
  }

  if (!imageFile || typeof (imageFile as File).arrayBuffer !== "function") {
    return { success: false, message: "Invalid image file" };
  }

  const uploadResult = await uploadImage(name, imageFile as Blob);

  if (!uploadResult.success || !uploadResult.url) {
    return { success: false, message: uploadResult.message };
  }

  const image = uploadResult.url;

  return await signupInWithEmailPassword({
    name,
    email,
    password,
    image,
    callbackURL,
  });
}
