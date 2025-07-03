// pages/index.tsx

import React from "react";

export default function Home() {
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
            {Array.from({ length: 30 }).map((_, i) => (
              <li
                key={i}
                className={`hover:bg-yellow-200 cursor-pointer px-1 py-0.5 ${
                  i === 5 ? "bg-yellow-300 font-bold" : ""
                }`}
              >
                Başlık {i + 1}
              </li>
            ))}
          </ul>
        </div>

        {/* ORTA DOCK */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-50px)]">
          {/* GİRİŞ FORMU */}
          <div className="flex flex-col space-y-2 mb-4 max-w-md">
            <input
              type="text"
              placeholder="başlık"
              className="border px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="yazar"
              className="border px-2 py-1 text-sm"
            />
            <textarea
              placeholder="tavsiyenizi yazın"
              className="border px-2 py-1 text-sm"
            ></textarea>
            <button className="bg-black text-white px-4 py-1 w-fit text-sm">
              Gönder
            </button>
          </div>

          {/* SEÇİLİ BAŞLIK & ENTRY LİSTESİ */}
          <div className="bg-yellow-300 px-2 py-1 font-bold w-fit mb-2">
            Rize gezisi
          </div>

          <div className="space-y-4 text-sm">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-b pb-2">
                <div>
                  {i + 1}- Tavsiye içeriği örneği burada yazılı. Güzel bir şeyler yazın.
                </div>
                <div className="flex items-center space-x-4 text-xs mt-1">
                  <span className="text-blue-600 cursor-pointer">like</span>
                  <span className="text-red-600 cursor-pointer">dislike</span>
                  <span className="ml-auto">tarih</span>
                  <span>yazar</span>
                  <span>saat</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ DOCK */}
        <div className="w-1/5 border-l overflow-y-auto max-h-[calc(100vh-50px)] flex flex-col justify-between">
          <div className="p-2 border-b text-sm">Reklam 1</div>
          <div className="p-2 border-b text-sm">Reklam 2</div>
          <div className="p-2 text-sm">Reklam 3</div>
        </div>
      </div>
    </div>
  );
}
