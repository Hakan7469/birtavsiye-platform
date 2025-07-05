import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "@/types/supabase";

type Entry = Database["public"]["Tables"]["recommendations"]["Row"];
type InsertEntry = Database["public"]["Tables"]["recommendations"]["Insert"];

type EntryFormProps = {
  onEntryCreated: (newEntry: Entry) => void;
};

const EntryForm: React.FC<EntryFormProps> = ({ onEntryCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: InsertEntry = {
      title: title || null,
      content: content || null,
      uuid: null,
      author: null,
      created_at: null,
      highlighted_text: {} as any, // Json tipini memnun etmek için boş nesne cast ediyoruz
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
      console.error("Veri eklenirken hata oluştu:", error);
    } else if (data) {
      onEntryCreated(data);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />
      <textarea
        placeholder="Tavsiye içeriği"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ekle
      </button>
    </form>
  );
};

export default EntryForm;
