// components/EntryForm.tsx

import { useState } from 'react';

interface EntryFormProps {
  onSubmit: (entry: { content: string; author: string }) => void;
}

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content, author });
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Yazar
        </label>
        <input
          id="author"
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Adınızı yazın (isteğe bağlı)"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Tavsiye
        </label>
        <textarea
          id="content"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tavsiyenizi buraya yazın..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Gönder
      </button>
    </form>
  );
}
