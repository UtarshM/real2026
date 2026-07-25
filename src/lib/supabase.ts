import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://srtsliweuqivnsngmzbn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadPropertyImage(file: File, bucket = "property-images"): Promise<string> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return object URL preview if anon key is not set
    return URL.createObjectURL(file);
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `listings/${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);

    if (error) {
      console.warn("Supabase Storage upload warning:", error.message);
      return URL.createObjectURL(file);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading to Supabase Storage:", err);
    return URL.createObjectURL(file);
  }
}
