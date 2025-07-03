```typescript
// pages/index.tsx
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
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("id, title, content, author")
        .order("id", { ascending: false });

      if (error) {
        console.error("Entry fetch error:", error.message);
        setFetchError(error.message);
        setEntries([]);
        return;
      }

      console.log("Çekilen veriler:", data);
      setFetchError(null);
      setEntries(data || []);
    };

    fetchEntries();
  }, []); // Bağımlılık dizisini boş bırakarak sadece sayfa yüklendiğinde çalıştır

  const handleSubmit = async (content: string) => {
    if (!title) {
      console.error("Insert error: Başlık seçilmedi");
      setFetchError("Lütfen bir başlık seçin.");
      return;
    }

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

    if (error) {
      console.error("Insert error:", error.message);
      setFetchError(error.message);
      return;
    }

    if (data) {
      setEntries((prev) => [data[0], ...prev]);
      setFetchError(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center px-6 py-8">
      <div className="w-full max-w-[960px] space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">birTavsiye</h1>

        {fetchError && (
          <div className="text-red-600 text-center">{fetchError}</div>
        )}

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <BaslikAutocomplete onSelect={(value) => setTitle(value)} />
        </div>

        <div className="text-xl font-semibold text-gray-700">
          Başlık: <span className="text-blue-600">{title || "Henüz seçilmedi"}</span>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <EntryForm onSubmit={handleSubmit} />
        </div>

        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <RecommendationCard
                key={entry.id}
                title={entry.title}
                content={entry.content}
                author={entry.author}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz tavsiye yok.</p>
          )}
        </div>
      </div>
    </div>
  );
}
```
