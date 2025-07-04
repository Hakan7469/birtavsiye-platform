// components/SearchBox.tsx

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBox({ value, onChange, onSearch }: SearchBoxProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Başlık ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
      <button onClick={onSearch} className="px-2 py-1 border rounded">
        Ara
      </button>
    </div>
  );
}
