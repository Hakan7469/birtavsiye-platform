// pages/index.tsx

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import EntryList from '@/components/EntryList';
import EntryForm from '@/components/EntryForm';
import SearchBox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase';
import { Tavsiye } from '@/lib/types';

export default function Home() {
  const [entries, setEntries] = useState<Tavsiye[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEntries();
  }, [selectedTopic]);

  async function fetchEntries() {
    const query = supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedTopic) {
      query.eq('title', selectedTopic);
    }

    const { data, error } = await query;
    if (!error && data) {
      setEntries(data);
    }
  }

  async function handleVote(id: string, type: 'like' | 'dislike') {
    const field = type === 'like' ? 'like' : 'dislike';
    const { data, error } = await supabase.rpc(`increment_${field}`, { entry_id: id });

    if (!error && data) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, [field]: (entry[field] || 0) + 1 } : entry
        )
      );
    }
  }

  async function handleEntryCreated(entry: Tavsiye) {
    setEntries((prev) => [entry, ...prev]);
  }

  const filteredEntries = entries.filter((entry) =>
    entry.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueTopics = Array.from(new Set(entries.map((e) => e.title).filter(Boolean))) as string[];

  return (
    <main className="flex min-h-screen">
      <aside className="w-64 border-r p-4 overflow-y-auto">
        <Sidebar topics={uniqueTopics} onSelectTopic={setSelectedTopic} />
      </aside>
      <div className="flex-1 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={() => {}}
            />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>
        <EntryForm onEntryCreated={handleEntryCreated} />
        <EntryList entries={filteredEntries} onVote={handleVote} />
      </div>
    </main>
  );
}
