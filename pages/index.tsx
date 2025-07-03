// pages/index.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import EntryForm from "@/components/EntryForm";

interface Entry {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching entries:", error);
    } else {
      setEntries(data || []);
    }

    setLoading(false);
  }

  async function handleSubmit(entry: { content: string; author: string }) {
    const { data, error } = await supabase
      .from("entries")
      .insert([entry])
      .select();

    if (error) {
      console.error("Error inserting entry:", error);
    } else if (data) {
      setEntries((prev) => [data[0], ...prev]);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Bir Tavsiye
      </h1>

      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <EntryForm onSubmit={handleSubmit} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Yükleniyor...</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border p-4 rounded-md shadow-sm bg-gray-50"
            >
              <p className="text-gray-800 mb-2">{entry.content}</p>
              <p className="text-sm text-gray-500 text-right">
                — {entry.author}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
