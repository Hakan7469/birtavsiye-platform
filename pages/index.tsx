import { useEffect, useState } from 'react';
import Head from 'next/head';
import EntryForm from '@/components/EntryForm';
import { Database } from '@/types/supabase';
import { supabase } from '@/utils/supabaseClient';

type Recommendation = Database['public']['Tables']['recommendations']['Row'];

export default function Home() {
  const [entries, setEntries] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Hata:', error.message);
    } else {
      setEntries(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (entry: {
    title: string;
    content: string;
    author: string;
  }) => {
    const { data, error } = await supabase.from('recommendations').insert([
      {
        title: entry.title,
        content: entry.content,
        author: entry.author,
      },
    ]);

    if (error) {
      console.error('Gönderme hatası:', error.message);
    } else {
      fetchEntries();
    }
  };

  return (
    <>
      <Head>
        <title>Bir Tavsiye</title>
      </Head>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Bir Tavsiye</h1>

        <div className="mb-6">
          <EntryForm onSubmit={handleSubmit} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : entries.length === 0 ? (
            <p>Henüz tavsiye eklenmedi.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white p-4 rounded shadow">
                <p><strong>{entry.title}</strong></p>
                <p>{entry.content}</p>
                <p className="text-sm text-gray-500">— {entry.author}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
