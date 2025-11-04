"use client";

const KEY_PREFIX =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_FRONTEND_URL
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}:`
    : "ocean-notes:";

function safeJSON<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export const storage = {
  /** Get a value from localStorage with a namespaced key */
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(KEY_PREFIX + key);
    return safeJSON<T>(raw, fallback);
  },
  /** Set a value in localStorage with a namespaced key */
  set<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
  },
  /** Remove a value from localStorage */
  remove(key: string) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY_PREFIX + key);
  },
};
