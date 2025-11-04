"use client";

import { Note, useNotes } from "@/hooks/useNotes";
import { timeAgo } from "@/utils/time";

// PUBLIC_INTERFACE
export default function NoteCard({
  note,
  onEdit,
}: {
  note: Note;
  onEdit: () => void;
}) {
  /** Note card component showing title, snippet, tags, and updated time */
  const { removeNote } = useNotes();

  return (
    <article className="card card-hover p-4 flex flex-col gap-3">
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold line-clamp-1">{note.title || "Untitled"}</h3>
        <div className="flex items-center gap-1">
          <button className="btn btn-outline px-2 py-1 text-xs" onClick={onEdit}>
            Edit
          </button>
          <button
            className="btn px-2 py-1 text-xs"
            style={{ background: "#fee2e2", color: "#991b1b" }}
            onClick={() => removeNote(note.id)}
            aria-label="Delete note"
          >
            Delete
          </button>
        </div>
      </header>
      <p className="text-sm text-gray-600 line-clamp-3">{note.content || "No content yet..."}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {note.tags?.slice(0, 4).map((t) => (
            <span key={t} className="tag">#{t}</span>
          ))}
        </div>
        <span className="text-xs text-gray-500">Updated {timeAgo(note.updatedAt)}</span>
      </div>
    </article>
  );
}
