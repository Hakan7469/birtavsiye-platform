// components/EntryTable.tsx

import { supabase } from "../lib/supabase"

interface Tavsiye {
  id: number
  created_at: string
  title: string
  content: string
  author: string
  like: number
  dislike: number
}

export default function EntryTable({ entries }: { entries: Tavsiye[] }) {
  const handleVote = async (id: number, type: "like" | "dislike") => {
    const field = type === "like" ? "like" : "dislike"
    const entry = entries.find((e) => e.id === id)
    if (!entry) return

    const { error } = await supabase
      .from("entries")
      .update({ [field]: entry[field] + 1 })
      .eq("id", id)

    if (error) console.error("Oy güncellenemedi:", error.message)
    else window.location.reload()
  }

  return (
    <div className="space-y-4 text-sm">
      {entries.map((entry, i) => (
        <div key={entry.id} className="border-b pb-2">
          <div>
            {i + 1}- {entry.content}
          </div>
          <div className="flex items-center space-x-4 text-xs mt-1">
            <button
              onClick={() => handleVote(entry.id, "like")}
              className="text-blue-600 cursor-pointer"
            >
              like ({entry.like})
            </button>
            <button
              onClick={() => handleVote(entry.id, "dislike")}
              className="text-red-600 cursor-pointer"
            >
              dislike ({entry.dislike})
            </button>
            <span className="ml-auto">{entry.created_at?.split("T")[0]}</span>
            <span>{entry.author}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

