// components/EntryList.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Entry = Database['public']['Tables']['recommendations']['Row'];

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Veri çekme hatası:', error);
        return;
      }

      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-2 rounded shadow-sm">
          <div className="text-sm text-gray-500">{entry.created_at?.slice(0, 10)}</div>
          <div className="font-semibold text-lg">{entry.title}</div>
          <div className="text-gray-700">{entry.content}</div>
          {entry.author && (
            <div className="text-xs text-gray-500 text-right">— {entry.author}</div>
          )}
        </div>
      ))}
    </div>
  );
}
