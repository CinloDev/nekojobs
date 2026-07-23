# NekoJobs

<p align="center">
  <img src="./public/neko_logo.svg" alt="NekoJobs logo" width="120"/>
</p>

<h3 align="center">
  Turn your job search into a data-driven process.
</h3>

<p align="center">
  A modern open-source platform to track job applications, interviews and professional growth.
</p>

<p align="center">
  <a href="https://nekojobs.cinlodev.com">
    🌐 Live Demo
  </a>
  •
  <a href="docs/FEATURES.md">
    ✨ Features
  </a>
  •
  <a href="docs/ROADMAP.md">
    🚀 Roadmap
  </a>
</p>

---

## 📌 About NekoJobs

Searching for a job as a developer can quickly become chaotic.

Applications get lost, interviews are forgotten, technical tests are scattered across different platforms, and it becomes difficult to understand what is actually working.

**NekoJobs was created to solve this problem.**

It transforms a traditional job search into a structured process where developers can:

- Track applications.
- Manage interview stages.
- Analyze progress.
- Identify improvement opportunities.
- Make decisions based on real data.

> Your job search is a process. NekoJobs helps you measure and improve it.

---

# 🏗️ Architecture

NekoJobs follows a modular architecture designed for scalability.

```
src/
│
├── app/
│   ├── dashboard/
│   ├── applications/
│   ├── analytics/
│   └── settings/
│
├── components/
│
├── features/
│   ├── applications/
│   ├── dashboard/
│   ├── analytics/
│   ├── goals/
│   └── learnings/
│
├── lib/
│
├── store/
│
└── types/
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|-|-|
| Next.js | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Zustand | State management |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## Data Layer

Current:

```
UI
 ↓
Zustand Store
 ↓
Repository Pattern
 ↓
LocalStorage
```

Future:

```
UI
 ↓
Zustand Store
 ↓
Repository Pattern
 ↓
Supabase
 ↓
PostgreSQL
```

The repository abstraction allows migrating storage without rewriting the application.

---

# 🚀 Getting Started

## Requirements

- Node.js 20+
- npm / pnpm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/CinloDev/nekojobs.git
```

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

# 🧪 Development

Run checks:

```bash
pnpm lint
```

Build production version:

```bash
pnpm build
```

---

# 🤝 Contributing

Contributions are welcome.

If you want to improve NekoJobs:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Created by CinloDev

Built with ❤️ by a developer who needed this tool herself.

NekoJobs is part of the CinloDev ecosystem:

- 🐱 NekoTools
- 🦷 CinloLabs
- 💰 AlDía
- 🔐 Vault

---

⭐ If NekoJobs helps your job search, consider giving the project a star.