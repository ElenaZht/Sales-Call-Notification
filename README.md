# 📣 SalesNotify — Sales Call Notification

A full-stack sales call notification flow built with **React + TypeScript** (client) and **Express + TypeScript** (server).

When a sales call is logged, a formatted notification can be dispatched to **Google Chat** with a single click.

---

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Express 5, TypeScript, ts-node |
| Shared types | `shared/types.ts` |

---

## Project Structure

```
client/   React frontend (Vite)
server/   Express backend
shared/   Shared TypeScript types
```

---

## Getting Started

### 1. Install dependencies

```bash
# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 2. Start the server

```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

### 3. Start the client

```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

---

## How to Use the Notification Flow

1. Open **http://localhost:5173** in your browser.
2. You will land on the **Dashboard** page.
3. Click the **"+ New Call"** button in the top-right corner of the header.
4. A dialog opens showing mock call data:
   - **Contact** — the person who was called
   - **Company** — the company they represent
   - **Call Outcome** — color-coded result (Interested / Not Interested / Follow-up / No Answer)
   - **Summary** — brief notes from the call
5. Click **"Send Notification to Google Chat"**.
6. A loading spinner appears while the request is processed.
7. On success, a confirmation screen displays the formatted notification message:
   > _New call completed with [Company]. Outcome: [X]. Summary: [Y]_
8. The dialog closes automatically after a few seconds.

> The notification is sent via `POST /send-notification` to the Express server, which simulates delivery with a short delay.

---

## API

### `POST /send-notification`

**Request body:**
```json
{
  "contactName": "Jordan Mitchell",
  "companyName": "Acme Corp",
  "callOutcome": "Interested",
  "shortSummary": "Prospect ready to move forward..."
}
```

**Response:**
```json
{ "success": true, "message": "Notification sent successfully" }
```
