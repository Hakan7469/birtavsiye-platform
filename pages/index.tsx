// pages/index.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';
import EntryForm from '../components/EntryForm';

interface Entry {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/entries')
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (entry: { content: string; author: string }) => {
    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      const newEntry: Entry = await res.json();
      setEntries((prev) => [newEntry, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Head>
        <title>Bir Tavsiye Platformu</title>
      </Head>

      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Bir Tavsiye Platformu</h1>

        <div className="mb-6">
          <EntryForm onSubmit={handleSubmit} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white p-4 rounded-lg border shadow-sm">
                <p className="text-gray-800 whitespace-pre-line">{entry.content}</p>
                {entry.author && (
                  <p className="text-sm text-gray-500 mt-2">— {entry.author}</p>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
