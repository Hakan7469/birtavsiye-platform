// components/EntryForm.tsx

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

interface Props {
  onEntryCreated: (entry: Entry) => void;
}

export default function EntryForm({ onEntryCreated }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('recommendations')
      .insert([{ title, content, author }])
      .select()
      .single();

    if (error) {
      console.error('Entry insert error:', error);
      return;
    }

    onEntryCreated(data);
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-2 py-1 rounded"
        required
      />
      <textarea
        placeholder="Tavsiye içeriği"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-2 py-1 rounded"
        required
      />
      <input
        type="text"
        placeholder="Yazar (isteğe bağlı)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Ekle
      </button>
    </form>
  );
}
