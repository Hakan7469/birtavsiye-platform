// pages/index.tsx
import { useEffect, useState } from 'react';
import EntryForm from '../components/EntryForm';

type Entry = {
  id: number;
  title: string;
  content: string;
  author: string;
};

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

  const handleSubmit = async (entry: { title: string; content: string; author: string }) => {
    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    if (res.ok) {
      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bir Tavsiye Platformu</h1>

      <EntryForm onSubmit={handleSubmit} />

      {loading ? (
        <p className="mt-4 text-gray-600">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Başlık</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Tavsiye</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Yazar</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-bold">{entry.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.content}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">{entry.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
