// components/RecommendationCard.tsx

'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function RecommendationCard() {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Veri çekme hatası:', error.message);
      } else {
        setRecommendations(data);
      }
    }

    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-4">
      {recommendations.length === 0 ? (
        <p>Henüz tavsiye yok.</p>
      ) : (
        recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 bg-gray-100 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">{rec.title}</h2>
            <p className="text-gray-700">{rec.content}</p>
            <p className="text-sm text-gray-500 italic mt-2">Yazan: {rec.author}</p>
          </div>
        ))
      )}
    </div>
  );
}
