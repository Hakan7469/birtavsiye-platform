import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

interface Props {
  onEntryCreated: (entry: Entry) => void;
}

export default function EntryForm({ onEntryCreated }: Props) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('recommendations')
      .insert([{ content, title }])
      .select()
      .single();

    if (error) {
      console.error('Entry create error:', error);
    } else if (data) {
      onEntryCreated(data);
      setContent('');
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        className="border rounded p-2 w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tavsiyeni yaz..."
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Gönder
      </button>
    </form>
  );
}
