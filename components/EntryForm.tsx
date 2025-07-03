// components/EntryForm.tsx

import { useState } from "react"
import { supabase } from "../lib/supabase"

interface EntryFormProps {
  title: string
  onSubmit: () => void
}

export default function EntryForm({ title, onSubmit }: EntryFormProps) {
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async () => {
    if (!author || !content || !title) return

    await supabase.from("entries").insert({
      title,
      author,
      content,
      like: 0,
      dislike: 0,
    })

    setAuthor("")
    setContent("")
    onSubmit()
  }

  return (
    <div className="flex flex-col space-y-2 mb-4 max-w-md">
      <input
        type="text"
        placeholder="yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border px-2 py-1 text-sm"
      />
      <textarea
        placeholder="tavsiyenizi yazın"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border px-2 py-1 text-sm"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-1 w-fit text-sm"
      >
        Gönder
      </button>
    </div>
  )
}
