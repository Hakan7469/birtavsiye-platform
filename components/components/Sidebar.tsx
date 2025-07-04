// components/Sidebar.tsx

import React from 'react';

interface SidebarProps {
  topics: string[];
  onSelectTopic: (topic: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectTopic(null)}
        className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
      >
        Tümü
      </button>
      {topics.map((topic, index) => (
        <button
          key={index}
          onClick={() => onSelectTopic(topic)}
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700"
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
