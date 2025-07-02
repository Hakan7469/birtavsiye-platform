type RecommendationCardProps = {
  title: string;
  content: string;
  author: string;
};

export default function RecommendationCard({
  title,
  content,
  author,
}: RecommendationCardProps) {
  return (
    <div className="bg-white border rounded p-4 shadow-sm">
      <div className="text-sm text-gray-500 mb-1">Başlık: {title}</div>
      <p className="text-gray-800 whitespace-pre-line">{content}</p>
      <div className="text-xs text-gray-400 mt-2 text-right">Yazan: {author}</div>
    </div>
  );
}
