import React, { useState } from "react";

interface EntryFormProps {
  onSubmit: (entry: { content: string; author: string }) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content, author });
      setContent("");
      setAuthor("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2 text-sm">
      <input
        type="text"
        placeholder="başlık"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border w-full px-2 py-1 text-sm"
      />
      <textarea
        placeholder="tavsiyenizi yazın"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border w-full px-2 py-1 text-sm"
      />
      <button
        type="submit"
        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 text-sm border"
      >
        Gönder
      </button>
    </form>
  );
};

export default EntryForm;
