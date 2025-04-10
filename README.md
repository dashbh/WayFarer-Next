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

---

## 📌 Key Decisions

✅ **No Module Federation** → Using **Next.js multi-zone architecture**  
✅ **TurboRepo for Monorepo Management**  
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
yarn dev
```

To run a specific app (e.g., `wayfarer-mfe-home`):

```bash
yarn turbo run dev --filter=wayfarer-mfe-home
```

### 3️⃣ Build the Apps

```bash
yarn build
```

### 4️⃣ Linting & Formatting

```bash
yarn lint
```

## 🛠️ Adding a New Micro Frontend

To add a new Next.js app (e.g., `wayfarer-profile`):

```bash
yarn create next-app apps/wayfarer-profile --typescript
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!**



### DB Creation
-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- catalog
CREATE TABLE IF NOT EXISTS catalog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL
);

-- cart
CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES catalog(id),
  quantity INTEGER NOT NULL
);

-- blog
CREATE TABLE IF NOT EXISTS blog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## DB INsert
-- Insert users
INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com');

-- Insert catalog items
INSERT INTO catalog (title, description, price) VALUES
  ('Wayfarer Backpack', 'Durable and spacious backpack.', 59.99),
  ('Explorer Jacket', 'Waterproof and windproof jacket.', 89.99);

-- Insert cart items
INSERT INTO cart (user_id, product_id, quantity) VALUES
  (1, 1, 2),
  (2, 2, 1);

-- Insert blogs
INSERT INTO blog (title, content, author_id) VALUES
  ('Welcome to Wayfarer', 'Wayfarer is your new favorite travel companion.', 1),
  ('Packing Tips', 'Here are 5 things every traveler should carry.', 2);

