"use server";

import axios from "axios";
import FormData from "form-data";
import { IMGBB_API_KEY } from "@/lib/constants";

type ImageActionType = {
  success: boolean;
  message: string;
  url?: string;
};

// img is a File / Blob-like object from formData
export async function uploadImage(
  name: string,
  img: Blob, // use Blob for server-side File/Blob
): Promise<ImageActionType> {
  if (!name || !img) {
    return { success: false, message: "Invalid form data" };
  }

  try {
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = (img as File).name || "image.jpg";

    const formData = new FormData();
    formData.append("image", buffer, { filename });
    formData.append("name", name);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() },
    );

    if (!res.data?.data?.url) {
      return { success: false, message: "Failed to upload image" };
    }

    return {
      success: true,
      message: "Image uploaded successfully",
      url: res.data.data.url,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
}
