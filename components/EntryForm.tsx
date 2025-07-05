import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "@/types/supabase";

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
      created_at: new Date().toISOString(), // Bu alan string olarak verilmeli
      highlighted_text: {}, // JSON tipi, undefined değil!
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
      console.error("Ekleme hatası:", error.message);
    } else {
      console.log("Başarıyla eklendi:", data);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gönder
      </button>
    </form>
  );
}
