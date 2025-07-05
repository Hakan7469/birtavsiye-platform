import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "@/types/supabase";

export default function EntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("recommendations")
      .insert([
        {
          title,
          content,
          uuid: null,
          author: null,
          created_at: null,
          highlighted_text: null,
          is_flagged: null,
          is_reviewed: null,
          review_notes: null,
        } as Database["public"]["Tables"]["recommendations"]["Insert"], // Tür asertasyonu
      ])
      .select()
      .single();
    if (error) console.error("Hata:", error.message);
    else console.log("Başarılı:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="İçerik"
      />
      <button type="submit">Gönder</button>
    </form>
  );
}
