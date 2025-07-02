// components/BaslikAutocomplete.tsx

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

type Props = {
  onSelect: (title: string) => void;
};

export default function BaslikAutocomplete({ onSelect }: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from('recommendations')
        .select('title')
        .ilike('title', `%${input}%`)
        .limit(5);

      if (error) {
        console.error('Başlıklar alınamadı:', error.message);
      } else {
        const uniqueTitles = Array.from(new Set(data.map((item) => item.title)));
        setSuggestions(uniqueTitles);
      }
    };

    fetchSuggestions();
  }, [input]);

  const handleSelect = (title: string) => {
    setInput(title);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(title); // üst komponenti bilgilendir
  };

  return (
    <div className="relative max-w-xl mx-auto mb-4">
      <input
        type="text"
        placeholder="Başlık yazın..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        className="w-full p-2 border rounded"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
          {suggestions.map((title, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
