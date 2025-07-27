import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { supabase } from "./supabase";

export const uploadImageToBucket = async (
  userId: string,
  imageUri: string | null
): Promise<string | null> => {
  try {
    const fileExt = imageUri?.split(".").pop()?.split("?")[0] || "jpg";
    const fileName = `avatar.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const base64 = await FileSystem.readAsStringAsync(imageUri ?? "", {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileBuffer = decode(base64);

    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);

    return urlData?.publicUrl ?? null;
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};
