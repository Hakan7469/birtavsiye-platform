import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "@/types/supabase";

type BaslikAutocompleteProps = {
  onSelect: (value: string) => void;
};

// Tür tanımı için select("content")'in döndürdüğü nesne
type ContentResult = { content: string | null };

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
        setSuggestions(
          data
            .map((item: ContentResult) => item.content) // Yalnızca content alanını al
            .filter((content): content is string => content !== null) // Null değerleri filtrele
        );
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
