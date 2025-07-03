// components/BaslikAutocomplete.tsx

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type BaslikAutocompleteProps = {
  onSelect: (value: string) => void
}

export default function BaslikAutocomplete({ onSelect }: BaslikAutocompleteProps) {
  const [basliklar, setBasliklar] = useState<string[]>([])
  const [filtered, setFiltered] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const fetchTitles = async () => {
      const { data, error } = await supabase
        .from("entries")
        .select("title")

      if (!error && data) {
        const unique = Array.from(new Set(data.map((d) => d.title)))
        setBasliklar(unique)
      }
    }

    fetchTitles()
  }, [])

  useEffect(() => {
    if (!input) {
      setFiltered([])
      return
    }
    const f = basliklar.filter((b) => b.toLowerCase().includes(input.toLowerCase()))
    setFiltered(f.slice(0, 10))
  }, [input, basliklar])

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="başlık"
        className="border px-2 py-1 w-full text-sm"
      />
      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 text-sm max-h-48 overflow-y-auto">
          {filtered.map((b, i) => (
            <li
              key={i}
              onClick={() => {
                onSelect(b)
                setInput("")
                setFiltered([])
              }}
              className="px-2 py-1 hover:bg-yellow-100 cursor-pointer"
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
