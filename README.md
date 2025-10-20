# Book Hub - React Discovery App

A comprehensive book discovery web application built with **React**, **TypeScript**, and **Vite**, seamlessly integrated with a **FastAPI backend** and an **SQLite database**.
Book Hub allows users to browse, search, and filter books, manage their shopping cart, and utilize various book-related services within a responsive and modern interface.

---

## Features

### Core Functionality

* **Book Discovery**: Browse a vast collection of books with advanced filtering
* **Search & Filter**: Search by title/author, filter by genre, price range, and rating
* **Shopping Cart**: Add books to the cart and manage quantities
* **User Authentication**: Secure login and registration with JWT authentication via FastAPI
* **Responsive Design**: Fully responsive layout across all screen sizes

### Pages & Sections

* **Landing Page** – Hero section, featured books, and statistics
* **Store** – Complete book browsing with dynamic filters
* **Services** – Book placement, marketing, and publishing services
* **About Us** – Company and team information
* **Contact** – Contact form and information
* **FAQ** – Frequently asked questions
* **Cart** – Shopping cart management with WhatsApp integration

---

## Technical Features

* **Frontend**: React + TypeScript + Vite
* **Backend**: FastAPI (Python)
* **Database**: SQLite (via SQLAlchemy ORM)
* **State Management**: Redux Toolkit (for filtering) and Context API (for authentication)
* **Type Safety**: Full TypeScript support
* **Local Storage**: Persistent data for users, books, and cart
* **Modern UI**: Tailwind CSS with Lucide React icons
* **Integration**: RESTful communication between FastAPI and the React frontend
* **Payment/Checkout**: WhatsApp-based checkout system

---

## Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Frontend         | React 18, TypeScript, Vite   |
| Styling          | Tailwind CSS                 |
| Icons            | Lucide React                 |
| State Management | Redux Toolkit, React Context |
| Routing          | React Router DOM             |
| Backend          | FastAPI                      |
| Database         | SQLite (SQLAlchemy ORM)      |
| Build Tool       | Vite                         |

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ALU-BSE/summative-a-react-discovery-app-Daniel-IRYIVUZE.git
cd book-hub
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Your FastAPI server will start on [http://localhost:8000](http://localhost:8000).
The React frontend will typically run on [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
book-hub/
├── backend/
│   ├── app/
│   │   ├── api/           # FastAPI routers (auth, books, etc.)
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── db/            # Database setup (SQLite)
│   │   ├── core/          # Security and token handling
│   │   └── main.py        # FastAPI entry point
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # Context providers
│   │   ├── data/          # Sample/static data
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Helper functions
│   └── package.json
```

---

## Key Implementation Details

### Backend (FastAPI + SQLite)

* FastAPI provides a RESTful API consumed by the React frontend.
* SQLite used as the primary database for persistence.
* SQLAlchemy ORM handles model definitions and database interactions.
* JWT Authentication for secure login and registration.

### Frontend (React + TypeScript)

* Redux Toolkit manages all filtering and search logic.
* Context API handles authentication and user state.
* Local Storage persists user sessions, cart items, and preferences.

---

## Filtering System

* Multi-criteria filtering (genre, price, rating, search)
* Real-time filtering with Redux slices
* Sorting by title, author, price, rating, or date

---

## Responsive Design

* Mobile-first approach using Tailwind CSS
* Adaptive grid layouts and components
* Optimized for all device sizes

---

## Rubric Compliance Highlights

| Category                      | Achievements                                           |
| ----------------------------- | ------------------------------------------------------ |
| React Components & Lifecycle  | Functional components with hooks and reusability       |
| State Management              | Redux + Context separation of concerns                 |
| TypeScript Utilization        | Full type coverage for safety and maintainability      |
| Responsive UI                 | Consistent design and adaptability                     |
| RESTful API Design            | FastAPI with proper endpoints, schemas, and CRUD logic |
| Documentation & Functionality | Complete feature set, detailed documentation           |

---

## Additional Features

1. WhatsApp Integration – Direct checkout via WhatsApp messaging
2. Book Placement Service – Authors can submit books for placement
3. Advanced Filtering – Real-time, multi-criteria filtering
4. Cart Management – Full cart logic with quantity control
5. Service Pages – Extended offerings for authors and readers

---

## Deployment

### Frontend

```bash
npm run build
```

Deploy the `dist` folder to any static hosting provider:

* Vercel
* Netlify
* GitHub Pages
* AWS S3

### Backend

Deploy the FastAPI app to:

* Render
* Railway
* Fly.io
* AWS EC2

---

## User Roles

| Role            | Permissions                                                           |
| --------------- | --------------------------------------------------------------------- |
| Guest           | Browse books, view services                                           |
| Registered User | Full access including cart, book placement, and personalized features |

---

## Security Features

* JWT-based authentication
* Protected routes
* Input validation with Pydantic
* XSS protection via React and FastAPI defaults

---

## Links

> Demo Link https://youtu.be/JZRa796ojy0

## Contributing

Contributions are welcome.
Feel free to open issues or submit pull requests for improvements, features, or bug fixes.
