"use client";

import { useEffect, useMemo, useState } from "react";
import { Note, useNotes } from "@/hooks/useNotes";

// PUBLIC_INTERFACE
export default function NoteEditor({
  open,
  noteId,
  onClose,
}: {
  open: boolean;
  noteId: string | null;
  onClose: () => void;
}) {
  /** Modal editor for creating and editing notes */
  const { getNote, upsertNote } = useNotes();

  const target = useMemo(() => (noteId ? getNote(noteId) : null), [noteId, getNote]);
  const [title, setTitle] = useState(target?.title ?? "");
  const [content, setContent] = useState(target?.content ?? "");
  const [tagsInput, setTagsInput] = useState((target?.tags ?? []).join(", "));

  useEffect(() => {
    if (target) {
      setTitle(target.title ?? "");
      setContent(target.content ?? "");
      setTagsInput((target.tags ?? []).join(", "));
    }
  }, [target?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const onSave = () => {
    const tags =
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [];
    const n: Note = {
      id: target?.id ?? crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      tags,
      createdAt: target?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };
    upsertNote(n);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Note editor">
      <div className="modal">
        <div className="modal-header">
          <h3 className="text-base font-semibold">{target ? "Edit Note" : "New Note"}</h3>
          <button className="btn btn-outline" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
        <div className="modal-body space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              className="input mt-1"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="input mt-1 min-h-40"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <input
              className="input mt-1"
              placeholder="Comma separated, e.g. work, ideas"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
