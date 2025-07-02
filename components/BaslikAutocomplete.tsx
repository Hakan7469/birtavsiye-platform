import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ypyadzojzjjmldtosnhm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweWFkem9qempqbWxkdG9zbmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDEwODUsImV4cCI6MjA2NjQxNzA4NX0.tbEwxQ0Osj6gKwrXASh7AjKw-8silIOZ3z3Feymao1Q"
);

type BaslikAutocompleteProps = {
  onSelect: (value: string) => void;
};

export default function BaslikAutocomplete({ onSelect }: BaslikAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("basliklar")
        .select("title")
        .ilike("title", `%${searchTerm}%`)
        .limit(10);

      if (error) {
        console.error("Autocomplete error:", error.message);
        return;
      }

      const titles = data?.map((item) => item.title) || [];
      setSuggestions(titles);
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSelect = (title: string) => {
    setSearchTerm(title);
    setShowSuggestions(false);
    onSelect(title);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border px-3 py-2 rounded w-full"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Başlık yaz..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto rounded shadow">
          {suggestions.map((title, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && searchTerm.length >= 2 && suggestions.length === 0 && (
        <div className="absolute bg-white border w-full mt-1 px-3 py-2 text-gray-500">
          Yeni başlık ekle: <strong>{searchTerm}</strong>
        </div>
      )}
    </div>
  );
}
