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

      if (error) console.error('Fetch error:', error);
      else if (data) setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded p-4">
          <h3 className="font-bold">{entry.title}</h3>
          <p>{entry.content}</p>
          <div className="text-sm text-gray-500">{entry.created_at}</div>
        </div>
      ))}
    </div>
  );
}
