// pages/index.tsx

import React, { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import EntryTable from "../components/EntryTable";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [selectedTitle, setSelectedTitle] = useState("Rize gezisi")
  const [entries, setEntries] = useState<any[]>([])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("title", selectedTitle)
      .order("created_at", { ascending: false })

    if (!error) setEntries(data || [])
  }

  useEffect(() => {
    fetchEntries()
  }, [selectedTitle])

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* ÜST BAR */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-100">
        <div className="text-2xl font-bold">Bir Tavsiye</div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="bir tavsiye ara"
            className="border px-2 py-1 text-sm"
          />
          <button className="text-red-500 text-sm">search</button>
          <button className="text-sm">giriş</button>
          <button className="text-sm">kayıt ol</button>
        </div>
      </div>

      {/* ANA İÇERİK 3 KOLON */}
      <div className="flex flex-1 overflow-hidden">
        {/* SOL DOCK */}
        <div className="w-1/5 border-r overflow-y-auto max-h-[calc(100vh-50px)]">
          <div className="p-2 font-semibold">Ne vereyim abime ...</div>
          <ul className="space-y-1 text-sm px-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const title = `Başlık ${i + 1}`
              return (
                <li
                  key={i}
                  onClick={() => setSelectedTitle(title)}
                  className={`hover:bg-yellow-200 cursor-pointer px-1 py-0.5 ${
                    selectedTitle === title ? "bg-yellow-300 font-bold" : ""
                  }`}
                >
                  {title}
                </li>
              )
            })}
          </ul>
        </div>

        {/* ORTA DOCK */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-50px)]">
          {/* GİRİŞ FORMU */}
          <EntryForm title={selectedTitle} onSubmit={fetchEntries} />

          {/* SEÇİLİ BAŞLIK */}
          <div className="bg-yellow-300 px-2 py-1 font-bold w-fit mb-2">
            {selectedTitle}
          </div>

          {/* ENTRY TABLOSU */}
          <EntryTable entries={entries} />
        </div>

        {/* SAĞ DOCK */}
        <div className="w-1/5 border-l overflow-y-auto max-h-[calc(100vh-50px)] flex flex-col justify-between">
          <div className="p-2 border-b text-sm">Reklam 1</div>
          <div className="p-2 border-b text-sm">Reklam 2</div>
          <div className="p-2 text-sm">Reklam 3</div>
        </div>
      </div>
    </div>
  )
}
