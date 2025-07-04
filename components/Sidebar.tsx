import React from "react";

interface SidebarProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="space-y-2 h-[600px] overflow-y-auto">
      {topics.slice(0, 30).map((topic, index) => (
        <div
          key={index}
          onClick={() => onSelectTopic(topic)}
          className="cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
        >
          {topic}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
