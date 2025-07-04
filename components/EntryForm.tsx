import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

type Props = {
  onEntryCreated?: (newEntry: Entry) => void;
};

const EntryForm: React.FC<Props> = ({ onEntryCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('recommendations')
      .insert([{ title, content }])
      .select()
      .single();

    if (error) {
      console.error('Entry creation failed:', error.message);
      return;
    }

    if (data) {
      onEntryCreated?.(data);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Başlık"
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Tavsiyenizi yazın..."
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Gönder
      </button>
    </form>
  );
};

export default EntryForm;
