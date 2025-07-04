import React from "react";

interface SidebarProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, onSelectTopic }) => {
  const visibleTopics = topics.slice(0, 30);

  return (
    <div className="overflow-y-auto h-[calc(3.5rem*15)] w-48 border-r border-gray-300 pr-2 text-sm">
      <div className="p-2 text-xs text-gray-600">Ne vereyim abime ...</div>
      <ul className="space-y-1">
        {visibleTopics.map((topic, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectTopic(topic)}
              className="hover:underline text-left text-blue-700"
            >
              • {topic}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
