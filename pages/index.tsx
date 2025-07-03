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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/entries')
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (entry: { title: string; content: string; author: string }) => {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bir Tavsiye Platformu</h1>
      <EntryForm onSubmit={handleSubmit} />

      {loading ? (
        <p className="mt-4 text-gray-600">Yükleniyor...</p>
      ) : (
        <div className="mt-8">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-bold">Başlık</th>
                <th className="text-left py-3 px-4 font-bold">Tavsiye</th>
                <th className="text-left py-3 px-4 font-bold">Yazar</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="py-3 px-4 font-semibold">{entry.title}</td>
                  <td className="py-3 px-4">{entry.content}</td>
                  <td className="py-3 px-4 text-gray-600">{entry.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
