'use client'

import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import React from 'react'

interface Tavsiye {
  id: string
  title: string | null
  content: string | null
  author: string | null
  created_at: string | null
  like: number
  dislike: number
}

interface Props {
  entries: Tavsiye[]
  onVote: (id: string, type: 'like' | 'dislike') => void
}

const EntryTable: React.FC<Props> = ({ entries, onVote }) => {
  return (
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left font-bold">Tavsiye</th>
          <th className="border px-4 py-2 text-left font-bold">Yazan</th>
          <th className="border px-4 py-2 text-left font-bold">Tarih</th>
          <th className="border px-4 py-2 text-left font-bold">Oy</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id} className="border-t hover:bg-gray-50">
            <td className="border px-4 py-2">
              <div className="font-medium">{entry.title}</div>
              <div className="text-gray-700">{entry.content}</div>
            </td>
            <td className="border px-4 py-2">{entry.author}</td>
            <td className="border px-4 py-2">
              {entry.created_at &&
                formatDistanceToNow(new Date(entry.created_at), {
                  addSuffix: true,
                  locale: tr,
                })}
            </td>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <button
                  onClick={() => onVote(entry.id, 'like')}
                  className="hover:text-green-600 transition"
                >
                  👍 {entry.like}
                </button>
                <button
                  onClick={() => onVote(entry.id, 'dislike')}
                  className="hover:text-red-600 transition"
                >
                  👎 {entry.dislike}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EntryTable
