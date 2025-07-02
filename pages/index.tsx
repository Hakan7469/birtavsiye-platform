import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BaslikAutocomplete from "../components/BaslikAutocomplete";
import EntryForm from "../components/EntryForm";
import RecommendationCard from "../components/RecommendationCard";

type Entry = {
  id: string;
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
        .from("recommendations")
        .select("*")
        .eq("title", title)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setEntries(data as Entry[]);
      } else {
        console.error("Entry fetch error:", error?.message);
      }
    };

    fetchEntries();
  }, [title]);

  const handleSubmit = async (content: string) => {
    const { error, data } = await supabase.from("recommendations").insert([
      {
        content,
        title,
        author: "hakan",
      },
    ]);

    if (!error && data) {
      setEntries((prev) => [
        { id: data[0].id, content, title, author: "hakan" },
        ...prev,
      ]);
    } else {
      console.error("Insert error:", error?.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center px-6 py-8">
      <div className="w-full max-w-[960px] space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">birTavsiye</h1>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <BaslikAutocomplete onSelect={setTitle} />
        </div>

        {title && (
          <>
            <div className="text-xl font-semibold text-gray-700">
              Başlık: <span className="text-blue-600">{title}</span>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <EntryForm onSubmit={handleSubmit} />
            </div>

            <div className="space-y-4">
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
    </div>
  );
}
