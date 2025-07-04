import Sidebar from "@/components/Sidebar";
import EntryList from "@/components/EntryList";
import EntryForm from "@/components/EntryForm";
import SearchBox from "@/components/SearchBox";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await fetch("/api/topics");
      const data = await res.json();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  const handleSearch = () => {
    setTitle(search);
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen overflow-y-auto border-r p-4">
        <Sidebar topics={topics} onSelectTopic={setTitle} />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={handleSearch}
            />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>
        <EntryForm title={title} />
        <EntryList title={title} />
      </div>
    </div>
  );
}
