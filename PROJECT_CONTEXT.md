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
| `backend/data/subscribers.json` | JSON | ✅ Created | Unified storage for all community and enquiry emails. |
| `privacy-policy.html` | HTML | ✏️ Modified | Updated with Indian legal content (IT Act/SPDI). |
| `terms.html` | HTML | ✏️ Modified | Updated with Indian governing law and Pune jurisdiction. |
| `accessibility.html` | HTML | ✏️ Modified | Updated with RPWD Act 2016 compliance details. |
| `PROJECT_CONTEXT.md` | MD | ✏️ Modified | Living project documentation and change log. |

## API & Logic Registry
| Method | Endpoint / Function | Logic Description | Status |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/enquiry` | Secure customer enquiry submission with validation. | ✅ Active |
| GET | `/api/v1/health` | Backend health check endpoint. | ✅ Active |
| GET | `/api/v1/products` | Serves the full product catalog from JSON storage. | ✅ Active |
| POST | `/api/v1/admin/broadcast` | Protected endpoint for sending bulk email updates. | ✅ Active |
| POST | `/api/v1/newsletter` | Adds email to community subscription list. | ✅ Active |
| JS | `window.sendBroadcast()` | Controller logic for the Admin Broadcast UI. | ✅ Active |
| JS | `ApiService.broadcast()` | Frontend wrapper for admin broadcast endpoint. | ✅ Active |
| JS | `ApiService.subscribeNewsletter()` | Frontend wrapper for newsletter endpoint. | ✅ Active |
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
| Step-27 | MODIFY | `navbar.html`, `footer.html`, Legal Pages | Final Polishing: Unified "Logo + Text" lockup across header/footer. Implemented full-site reload on logo click. Authored localized Indian legal content for Privacy, Terms, and Accessibility. |
| Step-26 | CREATE/MODIFY | `admin.html`, `adminController.js`, `subscribers.json`, `emailService.js` | Broadcast Launch: Engineered a unified `subscribers.json` DB and a corresponding Admin Broadcast Panel. Admin can now send branded bulk updates to every lead in the system. |
| Step-25 | CREATE/MODIFY | `footer.html`, `app.js`, `api.js`, `newsletterController.js` | Community Integration: Refined footer branding with Logo+Text lockup. Engineered a backend subscription service to allow users to "Join the Community" via the newsletter form. |
| Step-24 | MODIFY | `index.html`, `loader.js`, `global.css` | UI Polish: Engineered a Premium Preloader with a pulse effect and progress bar to mask component loading. |
| Step-23 | MODIFY | `hero.html`, `hero.css`, `render.js`, `footer.html` | Bug Fix & Branding: Resolved hero slider overlapping via z-index management. Replaced footer text with Gold logo and official social icons (FB/IG). |
| Step-22 | CREATE/MODIFY | `privacy-policy.html`, `terms.html`, `accessibility.html`, `footer.html` | Legal Infrastructure: Launched 3 dedicated legal pages with premium consistent styling. Updated global footer to bridge legal compliance via direct links. |
| Step-21 | MODIFY/CREATE | `hero.html`, `hero.css`, `render.js`, `loader.js`, `assets/hero/` | Hero Enhancement: Engineered an auto-scrolling image slider with 3 new high-res pet assets. Maintained pixel-locked UI while adding dynamic engagement. |
| Step-20 | MODIFY | `hero.html`, `index.html`, `render.js`, `global.css`, `loader.js` | Platform Finalization: Upgraded Hero section with high-res photography. Launched interactive Zoom-Interactivity for brochures and deployed a cinematic Scroll-Reveal system. |
| Step-19 | MODIFY | `index.html`, `PROJECT_CONTEXT.md` | Layout Rectification: Fixed the brochure viewer 'Zoom' bug by shifting from forced-width scaling to responsive 'Fit-to-Screen' logic (`max-h-85vh`). |
| Step-14 | CREATE/MODIFY | `adminController.js`, `admin.html`, `js/api.js`, `robots.txt`, `sitemap.xml` | Full Infrastructure Wrap: Implemented SEO (Sitemap/Robots), hardened CORS security, and launched the 3S Admin Portal. Enabled public review submission and administrative moderation (Approve/Delete) via environment-secured access. |
| Step-13 | MODIFY | `catalog.html`, `render.js`, `.env` | Feature Reversion & Fix: Removed Search/Filter feature per user preference to maintain UI simplicity. Fixed lead destination email (CLIENT_EMAIL) in .env to ensure enquiries reach `piyushmahale286@gmail.com`. |
| Step-12 | MODIFY | `render.js`, `api.js`, `reviews.json`, `catalog.html` | Phase 1 Completion: Integrated Dynamic Review System, Search & Filtering logic, and Nodemailer integration. Standardized catalog metadata and implemented image lazy loading for performance. |
| Step-11 | MODIFY | `IMPLEMENTATION_PLAN.md` | Strategic Pivot: Finalized Hostinger as the primary hosting provider and targeted `Threesspets.com` as the production domain. Refined deployment logic for managed Node.js environment. |
| Step-9 | MODIFY | `products.json`, `render.js`, `assets/biscuits/` | Catalog Expansion: Integrated 4 new premium biscuit variants (Cheese, Chicken, Meat, Mixed) with high-res assets and technical specifications. Renamed assets for web optimization while maintaining UI integrity. |
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
