# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Type-check (tsc -b) then Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

No test runner is configured in this project.

## Architecture

**Stack:** React 19, TypeScript (strict), Vite, TanStack React Query v5, Zustand, Axios.

**Backend proxy:** Vite proxies `/api/*` to `http://localhost:8000` in dev. The backend must be running for any data to load.

### State management (two-layer)

- **Zustand** (`src/store/useAppStore.ts`): UI/selection state — `activeSymbol`, `activeHorizon`, `activeTimeframe`, `darkMode`. Persisted to localStorage under `'cryptolens-app-store'`.
- **React Query** (`src/main.tsx` QueryClient): Server state — all API data with caching and auto-refetch. Key intervals: analysis 2 min, regime 5 min, timeframes 30 min, macro 1 hour. Default: 2 retries, 30 sec staleTime.

### Data flow

`App.tsx` owns orchestration: reads from the Zustand store, passes `symbol`/`timeframe` to hooks, and feeds fetched data down to display components. It also applies `data-theme="dark"|"light"` to `document.documentElement` based on the `darkMode` store value.

Hooks in `src/hooks/` each wrap one API call with React Query. Types in `src/types/` include response schemas and normalizer functions that transform raw API responses before use.

### API layer

`src/api/client.ts` — Axios instance (30s timeout). A response interceptor extracts `.data.detail` from error responses.

Endpoints (all under `/api/v1/`):
- `market/symbols`, `market/timeframes`, `market/regime/{symbol}`, `market/macro/{symbol}`, `market/ohlcv/{symbol}`
- `analysis/{symbol}/{timeframe}`

### Component organization

```
src/components/
  analysis/   # FibonacciLevels, HarmonicPattern, MacroContext
  layout/     # TopBar, ErrorMessage, Skeleton
  regime/     # RegimeBlock, RegimeChangeAlert, RegimeScore, RegimeVotes
  signals/    # SignalGroup, SignalRow, ConfluenceBar, HorizonTabs, SourceChip
```

Each component has its own `.css` file. Global design tokens (brand colors for bull/bear/lateral signals, etc.) are defined in `src/index.css`.

### Styling

CSS modules pattern — one `.css` per component. Design tokens via CSS custom properties in `src/index.css`. No CSS-in-JS or utility framework (no Tailwind).

#### Dark mode

Implemented via `[data-theme="dark"]` on `<html>`, toggled from `TopBar` using `darkMode`/`toggleDarkMode` from the Zustand store. The system `prefers-color-scheme: dark` media query is also supported for users without a manual preference, but the manual toggle takes priority. When adding new CSS tokens, duplicate them in both `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` and `[data-theme="dark"]` blocks in `src/index.css`.

#### ConfluenceBar

Bidirectional bar centered at 0. Score is normalized over ±100 (half-bar per side). Bear fills left of center (red), bull fills right (green). The API `score` field is NOT bounded by ±5 — do not clamp to ±5 like the old code did.

#### FibonacciLevels

Horizontal table layout. Each level is a row with: dot indicator, label (%), mini bar (proportional to price range), and price. The current price is inserted inline as a row at the correct position in the sorted list. Nearest level is highlighted with an accent border.
