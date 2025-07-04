import React from "react";

interface SidebarProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="space-y-2 max-h-[450px] overflow-y-auto">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => onSelectTopic(topic)}
        >
          {topic}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
