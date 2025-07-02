import { useState } from "react";

type EntryFormProps = {
  onSubmit: (content: string) => void;
};

export default function EntryForm({ onSubmit }: EntryFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tavsiyeni yaz..."
        className="w-full border rounded p-3 h-32 resize-none"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Gönder
      </button>
    </form>
  );
}
