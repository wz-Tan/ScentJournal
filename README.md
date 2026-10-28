# ScentJournal

ScentJournal is a fragrance browsing app. The current version lets you browse and search perfumes, then open a page with details such as the brand, year, accords, and image.

> **Version 1:** This is an early first version. More features are coming.

## Requirements

- Node.js and npm
- Go 1.25.5 or later

## Run locally

The app has a Next.js frontend and a Go API. Start each in a separate terminal from the project root.

### 1. Start the API

```bash
cd backend
go run ./cmd
```

The API listens on [http://localhost:8080](http://localhost:8080). Its health check is [http://localhost:8080/health](http://localhost:8080/health).

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend uses `http://localhost:8080` by default. To use a different API address, set `NEXT_PUBLIC_API_URL` before starting the frontend.

## Useful commands

From `frontend/`:

```bash
npm run dev    # Start the development server
npm run build  # Build the production app
npm run start  # Serve the production build
npm run lint   # Run ESLint
```

From `backend/`:

```bash
go run ./cmd  # Start the API
```

The backend reads its perfume data from `backend/internal/datasets/perfumes.jsonl` when launched from `backend/`. However due to size constraints this is ignored from git at the moment.
