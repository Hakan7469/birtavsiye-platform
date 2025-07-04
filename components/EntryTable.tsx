'use client'

import { Tavsiye } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import React from 'react'

interface EntryTableProps {
  entries: Tavsiye[]
  onVote: (id: number, type: 'like' | 'dislike') => void
}

export default function EntryTable({ entries, onVote }: EntryTableProps) {
  return (
    <div className="space-y-4 text-sm">
      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 font-semibold">
              {i + 1}.
            </span>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(entry.created_at), {
                addSuffix: true,
                locale: tr,
              })}
            </span>
          </div>

          <div className="mb-3 text-gray-800">{entry.content}</div>

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
        </div>
      ))}
    </div>
  )
}
