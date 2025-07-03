import { useState } from 'react';

interface EntryFormProps {
  onSubmit: (entry: { title: string; author: string; content: string }) => void;
}

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ title, author, content });
    setTitle('');
    setAuthor('');
    setContent('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-2 py-1"
      />
      <input
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border px-2 py-1"
      />
      <textarea
        placeholder="Tavsiyenizi yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-2 py-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Yükleniyor...' : 'Gönder'}
      </button>
    </form>
  );
}
