import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
type Entry = Database['public']['Tables']['entries']['Row'];

interface Props {
  onEntryCreated: (entry: Entry) => void;
  title: string;
}

export default function EntryForm({ onEntryCreated, title }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('entries')
      .insert([{ title, content }])
      .select()
      .single();

    if (error) {
      console.error('Hata:', error.message);
    } else if (data) {
      onEntryCreated(data);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
        rows={3}
        placeholder="Tavsiyeni yaz..."
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Gönder
      </button>
    </form>
  );
}
