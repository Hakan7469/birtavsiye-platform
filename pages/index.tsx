// pages/index.tsx

import { useEffect, useState } from 'react';
import EntryForm from '../components/EntryForm';

interface Entry {
  id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    const response = await fetch('/api/entries');
    const data = await response.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (entry: { title: string; content: string; author: string }) => {
    setLoading(true);
    await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    setLoading(false);
    fetchEntries();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <EntryForm onSubmit={handleSubmit} />
        {loading && <p className="text-sm text-gray-500 mt-2">Yükleniyor...</p>}
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-lg font-bold">{entry.title}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            <p className="text-sm text-gray-500 mt-2">Yazan: {entry.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
