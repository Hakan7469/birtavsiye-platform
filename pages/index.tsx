// pages/index.tsx

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import EntryList from "@/components/EntryList";
import EntryForm from "@/components/EntryForm";
import SearchBox from "@/components/SearchBox";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Entry = Database["public"]["Tables"]["recommendations"]["Row"];

export default function HomePage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching entries:", error);
    else setEntries(data || []);
  };

  const handleEntryCreated = (entry: Entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .ilike("title", `%${title}%`)
      .order("created_at", { ascending: false });

    if (error) console.error("Search error:", error);
    else setEntries(data || []);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-2">
            <SearchBox value={title} onChange={setTitle} onSearch={handleSearch} />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>
        <EntryForm onEntryCreated={handleEntryCreated} />
        <EntryList entries={entries} />
      </div>
    </div>
  );
}
