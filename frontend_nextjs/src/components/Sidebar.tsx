"use client";

import { useNotes } from "@/hooks/useNotes";
import { useState } from "react";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar with search and tag filters */
  const { tags, search, setSearch, activeTag, setActiveTag } = useNotes();
  const [local, setLocal] = useState(search);

  const applySearch = (v: string) => {
    setLocal(v);
    setSearch(v);
  };

  return (
    <aside className="sidebar hidden md:block">
      <div className="p-4">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <input
            className="input mt-1"
            placeholder="Search notes..."
            value={local}
            onChange={(e) => applySearch(e.target.value)}
          />
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Tags</span>
          {activeTag && (
            <button className="text-xs text-blue-600" onClick={() => setActiveTag("")}>
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <p className="text-sm text-gray-500">No tags yet</p>
          ) : (
            tags.map((t) => (
              <button
                key={t}
                className={`badge transition ${
                  activeTag === t ? "bg-blue-100 text-blue-800 border border-blue-200" : ""
                }`}
                onClick={() => setActiveTag(activeTag === t ? "" : t)}
              >
                #{t}
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
