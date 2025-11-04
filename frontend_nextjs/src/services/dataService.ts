"use client";

/**
 * Data service scaffold.
 * Currently a placeholder that will later call REST APIs.
 * Reads base URL from env for future use.
 */

// PUBLIC_INTERFACE
export function getApiBase(): string | null {
  /** Returns the API base URL from env when available */
  if (typeof process === "undefined") return null;
  return process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_BACKEND_URL || null;
}
