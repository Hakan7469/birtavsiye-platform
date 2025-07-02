import { useEffect, useState } from "react";
import BaslikAutocomplete from "../components/BaslikAutocomplete";
import EntryForm from "../components/EntryForm";
import RecommendationCard from "../components/RecommendationCard";
import { supabase } from "../lib/supabaseClient";

type Recommendation = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [entries, setEntries] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!title) return;

      const { data, error } = await supabase
        .from("recommendations")
        .select("id, title, content, author")
        .eq("title", title)
        .order("id", { ascending: false });

      if (error) {
        console.error("Entry fetch error:", error.message);
        return;
      }

      setEntries(data || []);
    };

    fetchEntries();
  }, [title]);

  const handleSubmit = async (content: string) => {
    const { error, data } = await supabase
      .from("recommendations")
      .insert([
        {
          title,
          content,
          author: "hakan",
        },
      ])
      .select();

    if (!error && data) {
      setEntries((prev) => [data[0], ...prev]);
    } else {
      console.error("Insert error:", error?.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center px-6 py-8">
      <div className="w-full max-w-[960px] space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">birTavsiye</h1>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <BaslikAutocomplete onSelect={(value) => setTitle(value)} />
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
