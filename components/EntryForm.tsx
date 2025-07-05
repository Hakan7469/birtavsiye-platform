'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types/supabase';

type RecommendationInsert = Database['public']['Tables']['recommendations']['Insert'];

export default function EntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: RecommendationInsert = {
      title: title || null,
      content: content || null,
      uuid: null,
      author: null,
      created_at: new Date().toISOString(),
      highlighted_text: {}, // ✅ undefined yerine boş obje
      is_flagged: null,
      is_reviewed: null,
      review_notes: null,
    };

    const { data, error } = await supabase
      .from('recommendations')
      .insert([newEntry])
      .select()
      .single();

    if (error) {
      console.error('Error inserting recommendation:', error);
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } else {
      setMessage('Tavsiyen başarıyla eklendi!');
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-sm space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Başlık</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">İçerik</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tavsiyeyi Gönder
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
