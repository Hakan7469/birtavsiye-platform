import React from 'react';
import { Database } from '@/types/supabase';
type Entry = Database['public']['Tables']['entries']['Row'];

interface Props {
  entries: Entry[];
}

export default function EntryList({ entries }: Props) {
  return (
    <div className="space-y-4 mt-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-4 rounded shadow">
          <div className="text-gray-500 text-sm">{entry.title}</div>
          <div className="text-base">{entry.content}</div>
        </div>
      ))}
    </div>
  );
}
