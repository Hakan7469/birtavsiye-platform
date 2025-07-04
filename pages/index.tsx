import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import EntryList from "@/components/EntryList";
import EntryForm from "@/components/EntryForm";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const [entries, setEntries] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error("Girişler alınamadı:", err));
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const newEntry = await res.json();
    setEntries([newEntry, ...entries]);
    setContent("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 overflow-y-auto border-r border-gray-200 p-4">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={() => {
                // Arama fonksiyonu buraya gelebilir
                console.log("Aranıyor:", searchQuery);
              }}
            />
            <button className="px-2 py-1 border rounded hover:bg-gray-100">giriş</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">kayıt ol</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <EntryForm
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            onSubmit={handleSubmit}
          />
          <EntryList entries={entries} />
        </div>
      </div>
    </div>
  );
}
