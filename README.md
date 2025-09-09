_This project was bootstrapped using a personal PERN + TypeScript auth boilerplate, then extended into a Freelance/Client Dashboard with project management and invoicing features._

# 🖥️ Freelance / Client Dashboard

A fullstack **business dashboard and client portal** for freelancers or small agencies.  
This project allows agencies to manage clients, projects, and invoices, while providing clients a secure portal to view projects and invoices. Built with **React, TypeScript, TailwindCSS, Express, PostgreSQL, and Zod**, the app demonstrates polished UI/UX and solid backend logic.

---

## 🚀 Features

### For Freelancers / Agencies
- **Authentication & Profile**: Register, login, logout, update profile.  
- **Clients Management**: Add, view, edit, delete clients.  
- **Projects Management**: Create and manage projects, track status, attach deliverables.  
- **Invoices**: Generate invoices, mark as paid, track pending/overdue payments.  
- **Dashboard & Analytics**: View metrics like total clients, active projects, revenue charts.  
- **Optional Enhancements**: Messaging, file uploads, notifications.  

### For Clients
- **Secure Login**: Only via credentials provided by freelancer/agency.  
- **Projects Overview**: Read-only view of assigned projects, deadlines, and milestones.  
- **Invoices**: View invoice amounts, status, and download PDFs.  
- **Optional Enhancements**: Mark invoices as paid, messages from agency.  

---

## 🎨 Screenshots / UI Preview

*Screenshots and GIFs will be added as the dashboard is developed.*

![Dashboard Overview](path-to-screenshot.png)  
![Client Projects](path-to-screenshot.png)  
![Invoices](path-to-screenshot.png)  

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS  
- **Backend**: Express + Node.js + TypeScript + Zod (validation)  
- **Database**: PostgreSQL  
- **Authentication**: JWT + bcrypt  
- **State Management**: React Context / Hooks  
- **Optional**: Chart.js / Recharts for analytics  

---

## 🔧 Setup & Run Locally

1. **Clone the repo**  
```bash
git clone https://github.com/martinvega2003/client-portal-dashboard
```

2.	**Backend setup**

```bash
cd server
npm install
# create .env file with DB connection, JWT secret, etc.
npm run build
npm run start
```

3.	**Frontend setup**

```bash
cd client
npm install
npm run dev
```

4.	Open http://localhost:5173 to view the dashboard.

⸻

## 🗂️ Endpoints Overview

	•	Auth: /api/auth/register, /api/auth/login, /api/auth/logout
	•	Clients: /api/clients (CRUD, protected by agency auth)
	•	Projects: /api/projects (CRUD, protected by agency auth)
	•	Invoices: /api/invoices (CRUD, protected by agency auth)
	•	Dashboard / Analytics: /api/dashboard/stats (protected)
	•	Client Portal: /api/client/projects, /api/client/invoices (read-only, protected)

⸻

## 📝 Commit Guidelines

  ```
  • feat(Clients): add client list page
  • fix(Auth): correct password validation
  • chore(Config): update tailwind config
  • docs(README): add setup instructions
  • style(Navbar): fix button alignment
  • refactor(Projects): simplify reducer
  • test(Auth): add login endpoint unit tests
  ```

⸻

## ✅ Roadmap / Future Enhancements

	•	Add notifications for clients and agency.
	•	File uploads for deliverables or contracts.
	•	Online payment integration (Stripe / PayPal).
	•	Kanban view for projects.
	•	Multi-agency support (team members, roles).

⸻

## 📄 License

MIT License — feel free to reuse and adapt for portfolio purposes.


