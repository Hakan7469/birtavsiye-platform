import React from "react";

export type SearchBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex items-center border rounded px-2 py-1">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Başlık ara..."
        className="outline-none flex-1"
      />
      <button
        onClick={onSearch}
        className="ml-2 px-2 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ara
      </button>
    </div>
  );
};

export default SearchBox;
