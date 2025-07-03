// pages/index.tsx

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import EntryForm from '@/components/EntryForm';

const supabaseUrl = 'https://ypyadzojzjjmldtosnhm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // (kısaltıldı)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Entry {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Veriler alınamadı:', error.message);
    } else {
      setEntries(data as Entry[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async ({
    title,
    author,
    content,
  }: {
    title: string;
    author: string;
    content: string;
  }) => {
    const { error } = await supabase.from('entries').insert([
      {
        title,
        author,
        content,
      },
    ]);

    if (error) {
      console.error('Ekleme hatası:', error.message);
    } else {
      fetchEntries();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Bir Tavsiye</h1>

      <div className="mb-10 bg-white p-4 rounded-lg border shadow-sm">
        <EntryForm onSubmit={handleSubmit} />
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : entries.length === 0 ? (
          <p>Henüz tavsiye eklenmedi.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-lg border">
              <h2 className="text-xl font-semibold">{entry.title}</h2>
              <p className="text-gray-700 whitespace-pre-line mt-2">{entry.content}</p>
              <p className="text-sm text-gray-500 mt-2">— {entry.author || 'Anonim'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
