"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import { storage } from "@/utils/storage";

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
};

type NotesContextType = {
  isLoading: boolean;
  notes: Note[];
  filteredNotes: Note[];
  tags: string[];
  search: string;
  activeTag: string;
  setSearch: (s: string) => void;
  setActiveTag: (t: string) => void;
  getNote: (id: string) => Note | null;
  upsertNote: (n: Note) => void;
  removeNote: (id: string) => void;
  createEmptyNote: () => Note;
};

const NotesContext = createContext<NotesContextType | null>(null);

// PUBLIC_INTERFACE
export function NotesProvider({ children }: { children: React.ReactNode }) {
  /** Provides notes state with localStorage persistence and filtering */
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  // Load on mount
  useEffect(() => {
    const cached = storage.get<Note[]>("notes", []);
    setNotes(cached);
    setIsLoading(false);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!isLoading) {
      storage.set("notes", notes);
    }
  }, [notes, isLoading]);

  const upsertNote = useCallback((n: Note) => {
    setNotes((prev) => {
      const idx = prev.findIndex((x) => x.id === n.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = n;
        return next;
      }
      return [n, ...prev];
    });
  }, []);

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNote = useCallback(
    (id: string) => {
      return notes.find((n) => n.id === id) ?? null;
    },
    [notes]
  );

  const createEmptyNote = useCallback((): Note => {
    const n: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((prev) => [n, ...prev]);
    return n;
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const n of notes) {
      (n.tags || []).forEach((t) => set.add(t));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes.filter((n) => {
      const byTag = activeTag ? n.tags?.includes(activeTag) : true;
      const bySearch =
        q.length === 0
          ? true
          : (n.title || "").toLowerCase().includes(q) ||
            (n.content || "").toLowerCase().includes(q) ||
            (n.tags || []).some((t) => t.toLowerCase().includes(q));
      return byTag && bySearch;
    });
  }, [notes, search, activeTag]);

  const value: NotesContextType = {
    isLoading,
    notes,
    filteredNotes,
    tags,
    search,
    activeTag,
    setSearch,
    setActiveTag,
    getNote,
    upsertNote,
    removeNote,
    createEmptyNote,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook to access notes context */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
