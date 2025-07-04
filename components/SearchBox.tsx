import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex space-x-2 text-sm mb-4">
      <input
        type="text"
        placeholder="bir tavsiye ara"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 w-64"
      />
      <button
        onClick={onSearch}
        className="border px-3 py-1 bg-gray-100 hover:bg-gray-200"
      >
        search
      </button>
      <button className="border px-2 py-1">giriş</button>
      <button className="border px-2 py-1">kayıt ol</button>
    </div>
  );
};

export default SearchBox;
