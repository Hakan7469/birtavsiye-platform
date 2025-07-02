import { useEffect, useState } from "react";
import BaslikAutocomplete from "@/components/BaslikAutocomplete";
import EntryForm from "@/components/EntryForm";
import RecommendationCard from "@/components/RecommendationCard";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ypyadzojzjjmldtosnhm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

type Entry = {
  id: number;
  content: string;
  title: string;
  author: string;
};

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!title) return;

      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .eq("title", title)
        .order("id", { ascending: false });

      if (error) {
        console.error("Entry fetch error:", error.message);
        return;
      }

      setEntries(data as Entry[]);
    };

    fetchEntries();
  }, [title]);

  const handleSubmit = async (content: string) => {
    const { error } = await supabase.from("entries").insert([
      {
        content,
        title,
        author: "hakan", // Burayı dinamik yapacağız
      },
    ]);

    if (!error) {
      setEntries((prev) => [
        { id: Date.now(), content, title, author: "hakan" },
        ...prev,
      ]);
    } else {
      console.error("Insert error:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Bir Tavsiye</h1>
      <BaslikAutocomplete onSelect={(value) => setTitle(value)} />

      {title && (
        <>
          <div className="text-gray-700 mt-4 font-medium">
            Başlık: <span className="text-blue-700">{title}</span>
          </div>
          <EntryForm onSubmit={handleSubmit} />
          <div className="space-y-4 mt-6">
            {entries.map((entry) => (
              <RecommendationCard
                key={entry.id}
                title={entry.title}
                content={entry.content}
                author={entry.author}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
