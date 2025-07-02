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
    setSugges
