"use client";

import { useEffect, useState } from "react";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import { useNotes } from "@/hooks/useNotes";

export default function Home() {
  const { filteredNotes, isLoading, createEmptyNote } = useNotes();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const openNew = () => {
    const n = createEmptyNote();
    setEditingId(n.id);
    setEditorOpen(true);
  };

  // Allow NavBar to trigger editor open via event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail?.id) {
        setEditingId(detail.id);
        setEditorOpen(true);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("open-editor", handler as EventListener);
      return () => window.removeEventListener("open-editor", handler as EventListener);
    }
    return;
  }, []);

  const onEdit = (id: string) => {
    setEditingId(id);
    setEditorOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Your Notes</h1>
          <p className="text-sm text-gray-500">Create, edit, and organize notes</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={openNew}>
            + New Note
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="empty-state">Loading your notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="card ocean-gradient p-10 rounded-2xl text-center">
          <h2 className="text-xl font-medium mb-2">No notes yet</h2>
          <p className="text-gray-600 mb-4">
            Create your first note and start organizing with tags.
          </p>
          <button className="btn btn-primary" onClick={openNew}>
            Create a note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredNotes.map((n) => (
            <NoteCard key={n.id} note={n} onEdit={() => onEdit(n.id)} />
          ))}
        </div>
      )}

      <NoteEditor open={editorOpen} noteId={editingId} onClose={() => setEditorOpen(false)} />
    </>
  );
}
