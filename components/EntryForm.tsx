import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Düzeltülmüş import yolu
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

export default function EntryForm() {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('recommendations')
      .insert({ content })
      .select();
    if (error) setError(error.message);
    else setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border"
        placeholder="Tavsiyenizi yazın..."
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Gönder
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
