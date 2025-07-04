import React from "react";

interface Entry {
  id: number;
  content: string;
  author: string;
  timestamp: string;
}

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  return (
    <div className="border mt-4">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="border-b px-4 py-2 text-sm flex justify-between"
        >
          <div>
            <div className="font-medium">
              {index + 1}- {entry.content}
            </div>
            <div className="text-blue-600 underline cursor-pointer text-xs">
              like dislike
            </div>
          </div>
          <div className="text-xs text-gray-500">{entry.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
