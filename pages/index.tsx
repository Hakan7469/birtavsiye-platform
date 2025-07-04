import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import EntryList from "@/components/EntryList";
import EntryForm from "@/components/EntryForm";
import SearchBox from "@/components/SearchBox";
import { supabase } from "@/lib/supabase";
import { Tavsiye } from "@/lib/types";

export default function Home() {
  const [entries, setEntries] = useState<Tavsiye[]>([]);
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState<string[]>([
    "Tayland gezisi",
    "Elektrikli süpürge önerisi",
    "Kitap tavsiyesi",
    "En iyi mouse",
    "Çocuk gelişimi",
    "Borsa uygulamaları",
    "Futbol ayakkabısı",
    "Diş fırçası",
    "Kamp malzemeleri",
    "Mobil oyunlar",
    "Araba kiralama",
    "İstanbul'da kahvaltı",
    "Kahve makineleri",
    "Kulaklık tavsiyesi",
    "Bisiklet rotaları",
    "Film önerileri",
    "Evcil hayvan bakımı",
    "Yemek kitapları",
    "Yoga ekipmanları",
    "Gitar seçimi",
  ]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Veri alınamadı:", error);
    else setEntries(data as Tavsiye[]);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleEntryCreated = (entry: Tavsiye) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesTopic =
      !selectedTopic || entry.title?.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch =
      !search ||
      entry.title?.toLowerCase().includes(search.toLowerCase()) ||
      entry.content?.toLowerCase().includes(search.toLowerCase());

    return matchesTopic && matchesSearch;
  });

  return (
    <>
      <header className="flex justify-between items-center p-4 border-b">
        <div className="text-lg font-semibold">Bir Tavsiye</div>
        <div className="flex items-center gap-1">
          <SearchBox value={search} onChange={setSearch} onSearch={handleSearch} />
          <button className="px-2 py-1 border rounded">giriş</button>
          <button className="px-2 py-1 border rounded">kayıt ol</button>
        </div>
      </header>
      <main className="flex min-h-screen">
        <aside className="w-64 border-r p-4 overflow-y-auto">
          <Sidebar topics={topics} onSelectTopic={setSelectedTopic} />
        </aside>
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Tavsiyeler</h1>
          </div>
          <EntryForm onEntryCreated={handleEntryCreated} />
          <EntryList entries={filteredEntries} />
        </div>
      </main>
    </>
  );
}
