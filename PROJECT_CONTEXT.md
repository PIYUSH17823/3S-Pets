# 3S Pets — Project Context & Change Log

## Project Overview
**Name**: 3S Pets (Freelance for Delight Pets, Pune)
**Type**: Full-Stack Pet Wellness Portal
**Current Stack**: Node.js / Express / File-based JSON (Initial Stage)
**Architecture Strategy**: Pixel-Locked Refactoring (Code optimization with UI preservation)

## Architecture Summary
**Backend**: Node.js/Express (Modular architecture)
**Database**: JSON File Persistence (`db.json` / `products.json`)
**Frontend Logic**: Modular JS + API Service Layer (`api.js`)
**Hosting Target**: Render / Vercel / Hostinger VPS

## File Registry
| File Path | Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `index.html` | HTML | ✏️ Modified | Main entry point; modular slot architecture. |
| `components/hero.html` | HTML | ✏️ Modified | Hero section with floating animations. Updated for navbar spacing. |
| `js/loader.js` | JS | ✅ Created | Concurrent component loader using Promise.all. |
| `js/render.js` | JS | ✏️ Modified | State-driven UI renderer for the product catalog. |
| `js/api.js` | JS | ✅ Created | Dedicated API Service Layer for backend communication. |
| `backend/app.js` | JS | ✅ Created | Express server with security and rate-limiting. |
| `backend/data/products.json` | JSON | ✅ Created | Centralized product catalog storage. |
| `backend/controllers/productController.js` | JS | ✅ Created | Logic for serving product data from JSON. |
| `assets/logo/logo-gold.png` | PNG | ✅ Created | New premium brand logo (Auto-generated). |
| `assets/litter/litter-front.png` | PNG | ✅ Created | Premium cat litter packaging (Auto-generated). |
| `PROJECT_CONTEXT.md` | MD | ✅ Created | Living project documentation and change log. |

## API & Logic Registry
| Method | Endpoint / Function | Logic Description | Status |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/enquiry` | Secure customer enquiry submission with validation. | ✅ Active |
| GET | `/api/v1/health` | Backend health check endpoint. | ✅ Active |
| GET | `/api/v1/products` | Serves the full product catalog from JSON storage. | ✅ Active |
| JS | `ApiService.sendEnquiry()` | Frontend wrapper for enquiry endpoint. | ✅ Active |
| JS | `ApiService.getProducts()` | Frontend wrapper for product catalog endpoint. | ✅ Active |

## Component Registry
| Component | File Path | Associated CSS/JS | Purpose |
| :--- | :--- | :--- | :--- |
| Navbar | `components/navbar.html` | `navbar.css` | Fixed navigation with glassmorphism. |
| Hero | `components/hero.html` | `hero.css` | Brand introduction and floating 🐕. |
| Catalog | `components/catalog.html` | `catalog.css`, `render.js` | Interactive product switcher. |

## Change Log
| Step | Action | File | Engineering Details |
| :--- | :--- | :--- | :--- |
| Step-8 | MODIFY | `navbar.html`, `products.json`, `render.js` | Visual Completion & Fail-Safe Branding. Integrated real Cat Litter packaging assets and added CSS logo fallback. |
| Step-7 | MODIFY | `js/render.js`, `navbar.html` | Brand Identity & Resilience Upgrade. Integrated Gold Logo and added `OFFLINE_FALLBACK` catalog logic to prevent site crashes. |
| Step-6 | MODIFY | `js/render.js`, `js/api.js` | Integrated frontend with new `/products` API. Catalog data is now dynamic. |
| Step-5 | TRANSFORM | Backend | Engineered Product Catalog API. Moves data from hardcoded JS to managed JSON storage. |
| Step-4 | MODIFY | `js/render.js` | Optimized rendering delay from 300ms to 100ms. Visual integrity: Catalog transitions feel snappier. |
| Step-3 | MODIFY | `components/hero.html` | Added `pt-24 md:pt-32` to resolve navbar overlap. UI Integrity: Verified top padding matches navbar height. |
| Step-2 | TRANSFORM | Backend | Migrated entire legacy Java/Spring Boot logic to Node.js/Express for modern hosting compatibility. |
| Step-1 | CREATE | `PROJECT_CONTEXT.md` | Initialized project context and automated change logging. |

## Integration & Setup Notes
- **Backend URL**: `http://localhost:8080`
- **Environment**: `.env` file required for custom PORT and security keys.
- **Build**: `npm install` in `backend/` then `node app.js`.
