// pages/index.tsx
import { useEffect, useState } from 'react';
import EntryForm from '@/components/EntryForm';
import { Database } from '@/types/supabase';
import Head from 'next/head';

type Recommendation = Database['public']['Tables']['recommendations']['Row'];

export default function Home() {
  const [entries, setEntries] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const res = await fetch('/api/entries');
    const data = await res.json();
    setEntries(data);
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
    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      fetchEntries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Head>
        <title>Bir Tavsiye</title>
      </Head>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Bir Tavsiye</h1>
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
          <EntryForm onSubmit={handleSubmit} />
        </div>
        {loading ? (
          <p className="text-center">Yükleniyor...</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-4 rounded-lg border shadow-sm"
              >
                <h2 className="text-lg font-bold">{entry.title}</h2>
                <p className="mt-2">{entry.content}</p>
                <p className="text-sm text-gray-500 mt-2">— {entry.author}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
