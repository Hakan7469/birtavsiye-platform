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
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border rounded p-2 min-h-[100px]"
        placeholder="Tavsiyeni yaz..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
