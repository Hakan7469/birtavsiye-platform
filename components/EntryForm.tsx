import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database, Json } from "@/types/supabase";

export default function EntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Database["public"]["Tables"]["recommendations"]["Insert"] = {
      title: title || null,
      content: content || null,
      uuid: null,
      author: null,
      created_at: null,
      highlighted_text: null as Json, // Tip uyumu için as Json kullanıldı
      is_flagged: null,
      is_reviewed: null,
      review_notes: null,
    };

    const { data, error } = await supabase
      .from("recommendations")
      .insert([newEntry])
      .select()
      .single();

    if (error) {
      console.error("Veri eklenemedi:", error.message);
    } else {
      console.log("Başarılı eklendi:", data);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        className="border p-2 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="İçerik"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Gönder
      </button>
    </form>
  );
}
