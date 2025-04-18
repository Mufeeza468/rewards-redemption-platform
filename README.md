# Rewards Redemption Web App

This is a full-stack web application that allows a user to:

- View their current reward points balance
- Browse available rewards
- Redeem rewards using their points
- View a history of their redemptions

---

## Tech Stack

| Layer     | Tech                       |
|-----------|----------------------------|
| Frontend  | React + Vite + MUI         |
| Backend   | Ruby on Rails (API Only)   |
| Database  | PostgreSQL                 |

---

## Setup Instructions

### Backend (Rails API)

#### 1. Clone & Setup

```bash
cd rewards-api
bundle install
rails db:create db:migrate db:seed
```

#### 2. Run Server

```bash
rails s
```

The API will run on:  
`http://localhost:3000`

#### 3. API Endpoints

| Endpoint                               | Method | Description                        |
|----------------------------------------|--------|------------------------------------|
| `/api/users/:id/points`               | GET    | Get user points                    |
| `/api/rewards`                        | GET    | List all rewards                   |
| `/api/users/:id/redeem?reward_id=ID` | POST   | Redeem a reward                    |
| `/api/users/:id/redemptions`         | GET    | Get user's redemption history      |

> CORS is enabled for all origins in `config/initializers/cors.rb`

---

### Frontend (React + Vite + MUI)

#### 1. Setup Frontend

```bash
cd rewards-fe
npm install
```

#### 2. Start Dev Server

```bash
npm run dev
```

The frontend will run on:  
`http://localhost:5173`

#### 3. Pages Overview

| Page      | Path        | Description                                   |
|-----------|-------------|-----------------------------------------------|
| Dashboard | `/`         | Shows user points and navigation              |
| Rewards   | `/rewards`  | Lists rewards with redeem buttons & pagination|
| History   | `/history`  | Shows redemption history with pagination      |

---