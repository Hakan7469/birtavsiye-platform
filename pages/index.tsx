import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bir Tavsiye</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        {/* Üst arama çubuğu */}
        <div className="flex justify-between items-center p-2 border-b text-sm">
          <div className="text-lg font-semibold">Bir Tavsiye</div>
          <div className="flex items-center gap-1">
            <SearchBox />
            <button className="px-2 py-1 border rounded">giriş</button>
            <button className="px-2 py-1 border rounded">kayıt ol</button>
          </div>
        </div>

        {/* Ana içerik */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-60 border-r overflow-y-auto max-h-[calc(100vh-40px)]">
            <Sidebar />
          </div>

          {/* İçerik alanı */}
          <div className="flex-1 p-4 space-y-4 border-r">
            <EntryForm />
            <EntryList />
          </div>

          {/* Reklam alanı */}
          <div className="w-64 p-2 space-y-4 text-sm text-gray-600">
            <div className="border p-2">Reklam 1</div>
            <div className="border p-2">Reklam 2</div>
            <div className="border p-2">Reklam 3</div>
          </div>
        </div>
      </div>
    </>
  );
}
