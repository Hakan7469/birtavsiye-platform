import React from "react";

export interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Başlık ara..."
        value={value}
        onChange={onChange}
        className="border px-2 py-1 rounded w-48"
      />
      <button onClick={onSearch} className="px-2 py-1 border rounded">
        Ara
      </button>
    </div>
  );
};

export default SearchBox;
