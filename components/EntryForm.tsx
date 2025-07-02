import { useState } from "react";

type EntryFormProps = {
  onSubmit: (content: string) => void;
  maxChars?: number;
};

export default function EntryForm({ onSubmit, maxChars = 1000 }: EntryFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;
    onSubmit(content.trim());
    setContent(""); // formu temizle
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tavsiyeni yaz. Kalın vurgular için **çift yıldız** kullanabilirsin."
        maxLength={maxChars}
        rows={5}
        className="w-full p-3 border rounded resize-y"
      />
      <div className="text-sm text-gray-500 text-right">
        {content.length} / {maxChars} karakter
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Gönder
      </button>
    </form>
  );
}
