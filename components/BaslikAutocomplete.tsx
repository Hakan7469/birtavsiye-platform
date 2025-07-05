import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "@/types/supabase";

type BaslikAutocompleteProps = {
  onSelect: (value: string) => void;
};

export default function BaslikAutocomplete({ onSelect }: BaslikAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("content");
      if (error) {
        console.error("Hata:", error.message);
        return;
      }
      if (data && Array.isArray(data)) {
        setSuggestions(data.map((item) => item.content as string));
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      {/* Autocomplete UI */}
    </div>
  );
}
