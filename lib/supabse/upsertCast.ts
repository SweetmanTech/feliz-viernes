import supabaseClient from "./client";
import type { Cast } from "@/types";

async function upsertCast(cast: Cast) {
  const { error, statusText } = await supabaseClient
    .from("posts")
    .upsert(cast, {
      onConflict: "post_hash",
    });
  if (error) {
    console.error("Error upserting cast:", error);
    return { success: false, statusText };
  }
  console.log(statusText, "cast(hash):", cast.post_hash);
  return { success: true, statusText };
}

export default upsertCast;
