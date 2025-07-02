import { useState } from "react";

type EntryFormProps = {
  onSubmit: (content: string) => void;
};

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;

    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Önerinizi yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gönder
      </button>
    </form>
  );
}
