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
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-gray-700 whitespace-pre-line">{content}</div>
      <div className="text-sm text-gray-500 mt-2">— {author}</div>
    </div>
  );
}
