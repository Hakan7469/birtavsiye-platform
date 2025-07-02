import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ypyadzojzjjmldtosnhm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

      if (!error && data) {
        setSuggestions(data.map((d) => d.title));
      } else {
        console.error("Autocomplete error:", error?.message);
      }
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
        onKeyDown={(e) => {
          if (e.key === "Enter" && suggestions.length > 0) {
            handleSelect(suggestions[0]);
            e.preventDefault();
          }
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Başlık yaz..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto rounded shadow z-10">
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
    </div>
  );
}