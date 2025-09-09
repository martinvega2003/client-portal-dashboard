# pern-auth-with-zod-and-typescript
PERN (Postgres + Express + React + Node) Authentication App in TypeScript with input validation via Zod — minimal, secure starter template for demos and interviews.

# PERN Auth — Authentication Starter (TypeScript + Zod)

PERN Auth is a minimal authentication starter demonstrating a complete auth flow using PostgreSQL, Express, React and TypeScript. It uses **Zod** for request validation and **JWT** for authentication. This repository is intended as a concise template for demos, interviews and small prototypes.

---

## 🚀 One-line
Full-stack authentication demo: registration, login (JWT), protected routes, input validation (Zod), password hashing and seed scripts — built with the PERN stack (Postgres, Express, React, Node) and TypeScript.

---

## ✅ Key features
- User registration with secure password hashing (bcrypt)
- Login endpoint issuing a signed JWT and returning a user object
- Authentication middleware for protected endpoints
- Strong request validation using Zod
- Database seed script to create demo data
- Example frontend login + protected request flow
- Suggested tests (Jest + Supertest for backend, React Testing Library for frontend)
- Docker-compose example for local Postgres (optional)
- Clear .env.example and quickstart instructions

---

## 🧰 Technologies & libraries (used / recommended)

### Backend (Node / Express / TypeScript)
- **Node.js**
- **Express**
- **TypeScript**
- **ts-node** / **ts-node/esm** (development runner)
- **dotenv** (environment variables)
- **cors**
- **pg** (Postgres client)
- **jsonwebtoken** (JWT creation / verification)
- **bcryptjs** (password hashing)
- **zod** (schema validation)
- **nodemon** or **ts-node-dev** (optional, dev auto-reload)

### Frontend (React / TypeScript)
- **React**
- **React DOM**
- **TypeScript** (for React TSX)
- **Tailwind CSS** (optional, for styling)
- **react-router-dom** (routing)
- **fetch** or **axios** (HTTP client; fetch is native)

### Testing
- **Jest** (unit / integration)
- **ts-jest** (TypeScript + Jest bridge)
- **Supertest** (HTTP assertions for Express)
- **@testing-library/react** (frontend testing)
- **@testing-library/jest-dom**

### Dev / Tooling / Ops
- **ESLint** / **Prettier** (linting & formatting — recommended)
- **Docker** & **docker-compose** (optional: Postgres local bootstrap)
- **Git** (version control)
- **VS Code** (recommended editor)
- **Optional**: migration tools (e.g. **knex**, **TypeORM**, **Prisma**) — not included by default but recommended for production

---

## ⚙️ Quickstart (local)

1. Create DB:
```bash
createdb pern_auth_dev
````

2. Backend:

```bash
cd server
cp .env.example .env     # edit values
npm install
npm run dev               # start server (ts-node / ts-node-dev)
```

3. Frontend:

```bash
cd client
npm install
npm start
```

---

## 📦 Main endpoints (example)

* `POST /api/auth/register` — register a new user
* `POST /api/auth/login` — authenticate and receive `{ token, user }`
* `GET /api/profile` — protected route (requires `Authorization: Bearer <token>`)

---

## 🔒 Security notes (short)

* Do **not** commit `.env` or secrets. Use `.env.example`.
* Prefer `HttpOnly` + `Secure` cookies for refresh tokens in production.
* Use short-lived access tokens + refresh token rotation / revocation.
* Rate-limit authentication endpoints (e.g. `express-rate-limit`).

---

## Contributing

Contributions, bug reports and feature requests are welcome — thank you!  
Please follow these simple guidelines:

- Open an issue first for larger changes or feature proposals to discuss the approach.  
- For small fixes or docs improvements, submit a pull request with a clear and focused change.  
- Use concise commits following the commit types: `feat`, `fix`, `docs`, `test`, `chore`.  
- Run or add tests when appropriate and update documentation for user-facing changes.  
- If you discover a security issue, do **not** open a public issue; contact the repo owner directly for a private disclosure.

Contact for private security reports: `josemartinvt2003@gmail.com`

---

## 📄 License

MIT

---

```
```
