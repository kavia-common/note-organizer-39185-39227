"use client";

import Link from "next/link";
import { useNotes } from "@/hooks/useNotes";

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar with app title and quick actions */
  const { createEmptyNote } = useNotes();

  const onNew = () => {
    const n = createEmptyNote();
    // Broadcast that a new note should be edited
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-editor", { detail: { id: n.id } }));
    }
  };

  return (
    <header className="topnav">
      <div className="container-fluid h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600/90 text-white grid place-items-center shadow-sm">
            <span className="font-bold">N</span>
          </div>
          <Link href="/" className="text-lg font-semibold">
            Ocean Notes
          </Link>
          <span className="hidden sm:inline text-sm text-gray-500">
            Modern notes with tags & search
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={onNew}>
            New Note
          </button>
        </div>
      </div>
    </header>
  );
}
