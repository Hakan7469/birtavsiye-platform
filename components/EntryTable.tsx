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
    <div className="space-y-6 text-sm">
      {entries.map((entry, i) => (
        <div key={entry.id} className="border-b border-gray-300 pb-3">
          <div className="mb-1">
            <span className="font-medium">{i + 1}-</span>{" "}
            {entry.content}
          </div>
          <div className="flex items-center text-xs text-gray-600 space-x-4">
            <button
              onClick={() => handleVote(entry.id, "like")}
              className="px-2 py-0.5 border rounded hover:bg-blue-100"
            >
              👍 {entry.like}
            </button>
            <button
              onClick={() => handleVote(entry.id, "dislike")}
              className="px-2 py-0.5 border rounded hover:bg-red-100"
            >
              👎 {entry.dislike}
            </button>
            <div className="ml-auto flex space-x-2 text-gray-500">
              <span>{entry.created_at?.split("T")[0]}</span>
              <span className="italic">{entry.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
