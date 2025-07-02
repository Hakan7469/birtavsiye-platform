import BaslikAutocomplete from './BaslikAutocomplete';
// components/EntryForm.tsx

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function EntryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');

  const extractBoldTerms = (text) => {
    const matches = text.match(/\*\*(.*?)\*\*/g);
    return matches ? matches.map((m) => m.replace(/\*\*/g, '')) : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const highlighted_terms = extractBoldTerms(content);
    const { error } = await supabase.from('recommendations').insert([
      {
        title,
        content,
        author,
        highlighted_terms,
        is_reviewed: false,
        is_flagged: false,
        review_notes: ''
      },
    ]);

    if (error) {
      console.error('Hata:', error.message);
      setStatus('Hata oluştu.');
    } else {
      setStatus('Tavsiye başarıyla kaydedildi.');
      setTitle('');
      setContent('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">Yeni Tavsiye Ekle</h2>

      <BaslikAutocomplete onSelect={(value) => setTitle(value)} />
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Tavsiyenizi yazın (**kalın yazmak** için yıldız kullanın)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-40"
        required
      />

      <input
        type="text"
        placeholder="Yazar Adı"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gönder
      </button>

      {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
    </form>
  );
}
