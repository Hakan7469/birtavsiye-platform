// components/SearchBox.tsx

import React from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex items-center border px-2 py-1 rounded">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 outline-none text-sm"
        placeholder="Başlık ara..."
      />
      <button onClick={onSearch} className="ml-2 text-sm text-blue-600">
        Ara
      </button>
    </div>
  );
};

export default SearchBox;
