"use client";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { NotesProvider } from "@/hooks/useNotes";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">
            <div className="container-fluid py-6">{children}</div>
          </main>
        </div>
      </div>
    </NotesProvider>
  );
}
