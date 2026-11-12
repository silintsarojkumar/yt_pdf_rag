# RAG Studio — Next.js frontend

Frontend for the FastAPI YouTube + PDF RAG backend.

## Pages
- `/` — home, choose YouTube RAG or PDF RAG
- `/youtube` — video player + chat side by side
- `/pdf` — PDF viewer + chat side by side

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

Start the backend first:
```bash
python api.py      # runs on http://127.0.0.1:8000
```

## Config
- Footer credit: edit `CREATOR_NAME` (and optional `CREATOR_LINK`) in `lib/config.js`.
- Backend URL: copy `.env.local.example` to `.env.local` and change `NEXT_PUBLIC_API_URL` if needed.
- Your FastAPI CORS only allows `http://localhost:3000`, so run the frontend on that port.
