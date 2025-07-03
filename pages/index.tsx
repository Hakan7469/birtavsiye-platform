import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import EntryForm from '@/components/EntryForm';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Recommendation {
  id: string;
  title: string;
  author: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [entries, setEntries] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Veri çekme hatası:', error);
    } else {
      setEntries(data || []);
    }

    setLoading(false);
  };

  const handleSubmit = async (entry: {
    title: string;
    author: string;
    content: string;
  }) => {
    const { title, author, content } = entry;

    const { data, error } = await supabase.from('recommendations').insert([
      {
        title,
        author,
        content,
      },
    ]);

    if (error) {
      console.error('Kayıt hatası:', error);
    } else {
      fetchEntries(); // listeyi güncelle
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Bir Tavsiye</h1>

      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <EntryForm onSubmit={handleSubmit} />
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : entries.length === 0 ? (
          <p>Henüz tavsiye eklenmedi.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="font-semibold text-lg">{entry.title}</h2>
              <p className="text-gray-800 mt-1 whitespace-pre-line">{entry.content}</p>
              <p className="text-sm text-gray-500 mt-2">— {entry.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
