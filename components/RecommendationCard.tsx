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
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="text-sm text-gray-600">Başlık: {title}</div>
      <div className="text-gray-800 my-2">{content}</div>
      <div className="text-right text-sm text-gray-500">— {author}</div>
    </div>
  );
}
