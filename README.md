# WayFarer Frontend Monorepo

This repository contains the **WayFarer** frontend project, structured as a **Next.js multi-zone monorepo** using **TurboRepo** and **Yarn Workspaces**.

## 🚀 Tech Stack

- **Next.js** (Multi-zone architecture)
- **TurboRepo** (For monorepo management)
- **Yarn Workspaces** (For dependency management)
- **TypeScript**

---

## 📁 Project Structure

```
wayfarer-frontend/  # Root Monorepo
│── apps/
│   ├── wayfarer-mfe-home/      # Home Page (Base Path `/`)
│   ├── wayfarer-mfe-catalog/   # Catalog & PDP (`/catalog`, `/product/:id`)
│   ├── wayfarer-mfe-checkout/  # Checkout (`/checkout`)
│   ├── wayfarer-mfe-blog/      # Blog (`/blog`)
│   ├── wayfarer-mfe-search/    # Global Search (Available in all MFEs)
│   ├── wayfarer-mfe-nav/       # Global Navigation (Used in all MFEs)
│── packages/                   # Shared Code & Components
│   ├── ui/                     # Shared UI Components
│   ├── config/                 # Shared Configurations
│── .turbo/                     # TurboRepo Cache
│── package.json                 # Monorepo Package Manager (Yarn)
│── turbo.json                   # TurboRepo Config
│── README.md                    # Project Documentation
```

---

## 📌 Micro Frontend (MFE) Details

| MFE                       | Routes                     | Description                       | Rendering                                     |
| ------------------------- | -------------------------- | --------------------------------- | --------------------------------------------- |
| **wayfarer-mfe-home**     | `/`                        | Home Page                         | **SSG + ISR + CSR**                           |
| **wayfarer-mfe-catalog**  | `/catalog`, `/product/:id` | Catalog Listing & Product Details | **SSR (for freshness)**                       |
| **wayfarer-mfe-checkout** | `/checkout`                | Checkout Page                     | **SSR (real-time cart, secure transactions)** |
| **wayfarer-mfe-blog**     | `/blog`, `/blog/:slug`     | Blog Listing & Articles           | **SSG + ISR**                                 |
| **wayfarer-mfe-search**   | `/search`                  | Global Search                     | **CSR (dynamic updates)**                     |
| **wayfarer-mfe-nav**      | N/A                        | Global Navigation                 | **Server Components + CSR**                   |

---

## 📌 Key Decisions

✅ **No Module Federation** → Using **Next.js multi-zone architecture**  
✅ **TurboRepo for Monorepo Management**  
✅ **Global Navigation (`wayfarer-mfe-nav`) will be used across all MFEs**  
✅ **Global Search (`wayfarer-mfe-search`) will be available on all pages**  
✅ **Base Path (`/`) is handled by `wayfarer-mfe-home`**  
✅ **PDP & Catalog will be inside `wayfarer-mfe-catalog`**

---

## 📌 Notes

- This monorepo follows a **multi-zone Next.js architecture**.
- Each Next.js app is a separate deployable unit.
- Shared packages (UI components, ESLint config) are inside `packages/`.
- Turbo-Repo speeds up builds and development processes.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
yarn install
```

### 2️⃣ Start Development Server

To run all apps in parallel:

```bash
yarn turbo run dev
```

To run a specific app (e.g., `wayfarer-shell`):

```bash
yarn turbo run dev --filter=wayfarer-shell
```

### 3️⃣ Build the Apps

```bash
yarn turbo run build
```

### 4️⃣ Linting & Formatting

```bash
yarn turbo run lint
```

## 🛠️ Adding a New Micro Frontend

To add a new Next.js app (e.g., `wayfarer-profile`):

```bash
yarn create next-app apps/wayfarer-profile --typescript
```

Then, add it to the `workspaces` in `package.json`:

```json
{
  "workspaces": {
    "packages": ["packages/*"],
    "apps": ["apps/*"]
  }
}
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!**
