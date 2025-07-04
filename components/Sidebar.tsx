import React from "react";

interface SidebarProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

export default function Sidebar({ topics, onSelectTopic }: SidebarProps) {
  return (
    <div>
      <div className="mb-2 font-semibold">Son Başlıklar</div>
      <div className="max-h-[360px] overflow-y-auto">
        {topics.slice(0, 30).map((topic, index) => (
          <div
            key={index}
            className="cursor-pointer hover:underline text-sm py-1"
            onClick={() => onSelectTopic(topic)}
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}
