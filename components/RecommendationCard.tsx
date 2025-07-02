import { useState } from "react";

type RecommendationCardProps = {
  title: string;
  content: string;
  author: string;
};

export default function RecommendationCard({ title, content, author }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const toggleExpand = () => setExpanded(!expanded);

  const displayedContent = expanded
    ? content
    : content.split("\n").slice(0, 4).join("\n");

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>

      <pre className="whitespace-pre-wrap text-gray-800">{displayedContent}</pre>

      {content.split("\n").length > 4 && (
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={toggleExpand}
        >
          {expanded ? "Gizle" : "Devamını Göster"}
        </button>
      )}

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-gray-600">
          Yazan: <span className="font-medium">{author}</span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setLikes(likes + 1)}
            className="px-2 py-1 text-green-700 hover:text-green-900"
          >
            👍 {likes}
          </button>
          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="px-2 py-1 text-red-700 hover:text-red-900"
          >
            👎 {dislikes}
          </button>
        </div>
      </div>
    </div>
  );
}
