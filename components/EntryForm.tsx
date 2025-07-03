import { useState } from "react";

type Props = {
  onSubmit: (entry: { content: string; author: string }) => void;
};

export default function EntryForm({ onSubmit }: Props) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    onSubmit({ content, author });
    setContent("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Tavsiyeni yaz..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 resize-none"
        rows={4}
        required
      />
      <input
        type="text"
        placeholder="Yazar adı (anon olabilir)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border rounded p-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tavsiyeyi Gönder
      </button>
    </form>
  );
}
