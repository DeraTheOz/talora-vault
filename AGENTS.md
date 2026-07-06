<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Talora Vault

Talora Vault is a modern, portfolio-grade movie and TV streaming platform inspired by today's leading entertainment services.

The application enables users to:

- Discover movies and TV series
- Search and filter content
- Stream supported content directly within the application
- View detailed information about movies and series
- Save and build personal watchlists
- Leave ratings and reviews
- Receive personalized recommendations
- Track activity and engagement through a personal analytics dashboard
- Manage their profile and account preferences
- Discover trending, popular, and recommended content

The platform uses TMDB as its primary source for movie and TV metadata, while user-specific data such as authentication, bookmarks, watchlists, reviews, ratings, preferences, and analytics are stored in a PostgreSQL database powered by Neon.

Talora Vault is being built as a production-ready application with a strong focus on scalability, accessibility, performance, maintainability, and modern engineering best practices. The project emphasizes clean architecture, reusable components, type safety, responsive design, and an exceptional user experience, making it a showcase-quality portfolio project.

---

# Tech Stack

## Core Framework

- Next.js 16 (App Router)
- TypeScript

## Data Source

- TMDB API

Used for:

- Movies
- TV Series
- Posters
- Backdrops
- Cast information
- Genres
- Ratings
- Trailers
- Recommendations

## Database

- Neon (PostgreSQL)

## ORM

- Drizzle ORM

## Authentication

- Auth.js
- Google OAuth

## Server State

- TanStack Query

Used for:

- API fetching
- Caching
- Background revalidation
- Optimistic updates

## Client State

- Zustand

Used for:

- UI state
- Theme preferences
- Modal management
- Client-only state

## Forms

- React Hook Form
- Zod

Used for:

- Sign Up
- Sign In
- Profile forms
- Review forms
- Search filters

## Virtualization

- TanStack Virtual

Used for:

- Large movie collections
- Infinite scrolling
- Performance optimization

## Styling

- Tailwind CSS

## Animations

- Framer Motion

Used for:

- Page transitions
- Modal animations
- Dropdown animations
- Micro interactions
- Loading transitions

## Charts & Analytics

- Recharts

Used for:

- Dashboard analytics
- User activity charts
- Viewing statistics
- Genre breakdowns

## Icons

- Hugeicons

## Deployment

- Vercel

---

# Core Features

## 1. Authentication & User Accounts

Features:

- Sign up
- Sign in
- Google OAuth
- Forgot password
- Password reset
- Email verification
- Session persistence
- Protected routes

---

## 2. Real Database Integration

Store:

- Users
- Bookmarks
- Watchlists
- Ratings
- Reviews
- Search history
- User preferences

---

## 3. Advanced Search

Features:

- Debounced search
- Fuzzy search
- Search suggestions
- Search history
- Highlight matched text
- Search by category
- Search by year
- Search by rating

---

## 4. Personalized Recommendations

Recommendations based on:

- Genres
- Bookmarks
- Watchlists
- Activity history
- Popular content

Example:

"If you liked Batman, you might also like..."

---

## 5. User Ratings & Reviews

Features:

- Create review
- Edit review
- Delete review
- Rate content
- Average ratings
- Top-rated content
- Review sorting

---

## 6. Responsive Command Palette

Keyboard shortcuts:

- Ctrl + K
- Cmd + K

Features:

- Global search
- Quick navigation
- Command execution

---

## 7. Infinite Scrolling & Virtualization

Features:

- Infinite scrolling
- Virtualized lists
- Lazy rendering

Purpose:

- Improve performance for large content collections

---

## 8. Accessibility

Requirements:

- Full keyboard navigation
- Skip links
- Proper heading hierarchy
- ARIA labels
- Focus management
- Screen-reader support

Target Lighthouse Accessibility Score:

- 90+

---

## 9. Performance Optimizations

Implement:

- Route-based code splitting
- Image optimization
- Lazy loading
- Prefetching
- Skeleton loaders
- Suspense boundaries

Target Lighthouse Performance Score:

- 90+

---

## 10. Analytics Dashboard

Every authenticated user has access to a personal dashboard.

Possible metrics:

- Movies bookmarked
- Series bookmarked
- Reviews written
- Ratings submitted
- Favorite genres
- Most viewed genres
- Search activity
- Monthly activity
- Platform engagement insights

Dashboard visualizations:

- Line charts
- Bar charts
- Pie charts

---

## 11. Real API Integration

Use TMDB as the primary content provider.

Fetch:

- Movies
- Series
- Cast
- Genres
- Ratings
- Trailers
- Similar content

---

## 12. Content Detail Pages

Dynamic routes:

/movie/[id]

/series/[id]

Features:

- Description
- Cast
- Trailer
- Similar titles
- Ratings
- Reviews
- Bookmark actions
- Streaming provider information

---

# Development Philosophy

Focus on shipping a complete, functional application before adding advanced enhancements.

### Phase 1

Frontend UI

- Layout
- Navigation
- Responsive design
- Static mock data

### Phase 2

TMDB Integration

- Movie data
- Series data
- Search functionality

### Phase 3

Authentication

- Auth.js
- Google OAuth
- Protected routes

### Phase 4

Database Integration

- Neon
- Drizzle
- Bookmarks
- Watchlists

### Phase 5

Advanced Features

- Reviews
- Ratings
- Recommendations
- Dashboard

### Phase 6

Optimization

- TanStack Query
- TanStack Virtual
- Accessibility
- Performance

---

# Architecture Principles

- Functional programming preferred
- Type-safe codebase
- Accessibility-first development
- Mobile-first responsive design
- Performance-conscious implementation
- Production-ready architecture
- Clean component composition
- Scalable folder structure
- Single repository architecture
- Avoid premature optimization
