// app/page.tsx

import Sidebar from "@/components/Sidebar";
import EntryList from "@/components/EntryList";
import EntryForm from "@/components/EntryForm";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <div className="grid grid-cols-[250px_1fr_200px] h-screen">
      <aside className="overflow-y-auto border-r p-2">
        <Sidebar />
      </aside>
      <main className="p-4 overflow-y-auto space-y-6">
        <SearchBox />
        <EntryForm />
        <EntryList />
      </main>
      <aside className="border-l p-2 flex flex-col justify-between">
        <div className="border-b pb-2">Reklam 1</div>
        <div className="border-b py-2">Reklam 2</div>
        <div className="pt-2">Reklam 3</div>
      </aside>
    </div>
  );
}
