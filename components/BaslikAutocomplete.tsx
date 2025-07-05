import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Düzeltildi

type BaslikAutocompleteProps = {
  onSelect: (value: string) => void;
};

export default function BaslikAutocomplete({ onSelect }: BaslikAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await supabase.from("recommendations").select("content");
      if (data) setSuggestions(data.map((item) => item.content));
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      {/* Autocomplete UI */}
    </div>
  );
}
