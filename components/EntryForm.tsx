// components/EntryForm.tsx

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
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    await onSubmit({ title, author, content });
    setLoading(false);

    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Tavsiyenizi yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded px-3 py-2"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Yükleniyor...' : 'Gönder'}
      </button>
    </form>
  );
}
