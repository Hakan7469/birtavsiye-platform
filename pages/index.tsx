import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import EntryList from '@/components/EntryList';
import EntryForm from '@/components/EntryForm';
import SearchBox from '@/components/SearchBox';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
type Entry = Database['public']['Tables']['entries']['Row'];

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('title', title)
        .order('created_at', { ascending: false });

      if (error) console.error('Hata:', error.message);
      else setEntries(data);
    };

    if (title) fetchEntries();
  }, [title]);

  const handleNewEntry = (entry: Entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 border-r overflow-y-auto h-screen">
        <Sidebar onSelectTitle={setTitle} />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox value={search} onChange={setSearch} onSearch={setTitle} />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>
        <EntryForm onEntryCreated={handleNewEntry} title={title} />
        <EntryList entries={entries} />
      </div>
    </div>
  );
}
