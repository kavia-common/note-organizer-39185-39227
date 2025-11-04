# Ocean Notes – Next.js Frontend

Modern notes application with create, edit, delete, tags, and search. Styled with the Ocean Professional theme.

## Features
- Top navigation bar with actions (New Note)
- Sidebar with search and tag filters
- Notes displayed as responsive cards: title, snippet, tags, updated time
- Create, edit, delete via a modal editor
- Client-side persistence using localStorage (namespaced)
- Modular architecture: components, hooks, utils
- Environment-ready for backend integration via `NEXT_PUBLIC_API_BASE`

## Quick start

1. Install dependencies:
   - npm install

2. Run the dev server (port 3000):
   - npm run dev
   - Open http://localhost:3000

## Environment variables

Copy to `.env.local` (do not commit secrets):

```
NEXT_PUBLIC_API_BASE=
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_ENABLE_SOURCE_MAPS=0
NEXT_PUBLIC_PORT=3000
NEXT_PUBLIC_TRUST_PROXY=0
NEXT_PUBLIC_LOG_LEVEL=info
NEXT_PUBLIC_HEALTHCHECK_PATH=/health
NEXT_PUBLIC_FEATURE_FLAGS=
NEXT_PUBLIC_EXPERIMENTS_ENABLED=0
```

- `NEXT_PUBLIC_API_BASE` or `NEXT_PUBLIC_BACKEND_URL` will be used in the future when switching from localStorage to a REST API.
- For now, all data is stored in `localStorage` under a namespaced key using `NEXT_PUBLIC_FRONTEND_URL` if present.

## Code structure

- `src/components`
  - `NavBar.tsx` – top navigation
  - `Sidebar.tsx` – search & tag filters
  - `NoteCard.tsx` – note preview card
  - `NoteEditor.tsx` – modal for create/edit
- `src/hooks`
  - `useNotes.tsx` – notes state, filtering, localStorage persistence
- `src/utils`
  - `storage.ts` – safe localStorage helpers
  - `time.ts` – time ago helper
- `src/services`
  - `dataService.ts` – API base helper for future integration

## Switching to an API later

- Replace the persistence logic in `useNotes.tsx` with fetch calls to your API.
- Use `getApiBase()` from `src/services/dataService.ts` to build your endpoints.
- Keep the same shape for `Note` in the frontend, or adapt responses in a mapper.

## Theming

Ocean Professional:
- Primary: `#2563EB`
- Secondary: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

Tailwind utility classes are used along with CSS variables defined in `globals.css`.

## Accessibility & UX

- Empty states and loading states are included.
- Buttons and inputs use consistent focus and hover styles.
