// pages/index.tsx

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import EntryList from '@/components/EntryList';
import EntryForm from '@/components/EntryForm';
import SearchBox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

export default function HomePage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEntries(data);

      const uniqueTopics = Array.from(
        new Set(data.map((entry) => entry.title || 'Genel'))
      );
      setTopics(uniqueTopics);
    }
  };

  const handleEntryCreated = (newEntry: Entry) => {
    setEntries([newEntry, ...entries]);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    const matched = topics.find((topic) =>
      topic.toLowerCase().includes(search.toLowerCase())
    );
    if (matched) {
      setSelectedTopic(matched);
    }
  };

  return (
    <main className="flex min-h-screen">
      <aside className="w-64 border-r p-4 overflow-y-auto">
        <Sidebar topics={topics} onSelectTopic={setSelectedTopic} />
      </aside>
      <div className="flex-1 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox
              value={search}
              onChange={setSearch}
              onSearch={handleSearch}
            />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>

        <EntryForm onEntryCreated={handleEntryCreated} />

        <EntryList
          entries={
            selectedTopic
              ? entries.filter((e) => e.title === selectedTopic)
              : entries
          }
        />
      </div>
    </main>
  );
}
