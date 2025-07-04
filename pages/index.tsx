import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import EntryList from '@/components/EntryList'
import EntryForm from '@/components/EntryForm'
import SearchBox from '@/components/SearchBox'
import { useState } from 'react'
import EntryTable from '@/components/EntryTable'

interface Tavsiye {
  id: string
  title: string | null
  content: string | null
  author: string | null
  created_at: string | null
  like: number
  dislike: number
}

export default function Home() {
  const [entries, setEntries] = useState<Tavsiye[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleEntryCreated = (entry: Tavsiye) => {
    setEntries((prev) => [entry, ...prev])
  }

  const handleVote = (id: string, type: 'like' | 'dislike') => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              like: type === 'like' ? entry.like + 1 : entry.like,
              dislike: type === 'dislike' ? entry.dislike + 1 : entry.dislike,
            }
          : entry
      )
    )
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Bir Tavsiye</title>
      </Head>
      <main className="flex min-h-screen">
        <aside className="w-64 border-r p-4 overflow-y-auto">
          <Sidebar />
        </aside>
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Bir Tavsiye</div>
            <div className="flex items-center gap-1">
              <SearchBox
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={() => {}}
              />
              <button className="px-2 py-1 border rounded">giriş</button>
              <button className="px-2 py-1 border rounded">kayıt ol</button>
            </div>
          </div>
          <EntryForm onEntryCreated={handleEntryCreated} />
          <EntryTable entries={filteredEntries} onVote={handleVote} />
        </div>
      </main>
    </>
  )
}
