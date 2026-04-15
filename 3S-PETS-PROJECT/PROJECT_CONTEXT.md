# PROJECT CONTEXT

## Project Overview
3S PETS is a premium pet care brand website offering organic products like shampoos, biscuits, and cat litter. The project focuses on a "Premium Stage" aesthetic with interactive catalog features and a modular frontend architecture.

## Current Status
- Frontend: Refactored with a dedicated `ApiService` layer (`api.js`).
- Backend: Successfully transformed from Java/Spring Boot to a modular Node.js/Express architecture.
- Catalog: Integrated 5 actual client-provided shampoo products with high-quality assets.

## Tech Stack
- Frontend: HTML5, Vanilla JavaScript, Tailwind CSS, ApiService layer.
- Backend: Node.js, Express, CORS, Body-parser.
- Assets: Client-provided photographic assets for the Shampoo range.

## Architecture
- **Frontend**: Component-based loading (`loader.js`) + Service-based API interaction (`api.js`).
- **Backend**: Express modular structure (`app.js`, `routes/`, `controllers/`).

## Core Files
- `index.html`: Main layout shell.
- `js/api.js`: Service layer for backend communication.
- `js/render.js`: State-driven UI renderer (updated with 5 shampoo products).
- `backend/app.js`: Express server entry point.
- `assets/shampoo/`: Directory for client shampoo images.

## Recent Changes
- Initialized PROJECT_CONTEXT.md.
- Built Node.js/Express backend with file-based persistence (`db.json`) and `morgan` logging.
- Refactored frontend JS to use central `ApiService` and removed Membership module.
- Integrated 5 high-quality client assets for the shampoo category.
- Optimized catalog imagery for mobile responsiveness.
- Hardened Contact Form with Email/Whatsapp validation and UX feedback states.
- Added OpenGraph Meta tags for premium social sharing (WhatsApp/Instagram).
- Implemented Production Readiness: `Promise.all` for fast frontend loading, strictly configured CORS, Express Rate Limiter for spam protection, and Helmet for HTTP security.
- Upgraded `enquiryController` to use fully asynchronous concurrency and secure server-side Joi validation.

## Next Steps
- Implement persistent database storage (MySQL/PostgreSQL) for enquiries and members.
- Review entire website functionality with the client.
- Deploy to Render or Vercel.

**For a detailed launch roadmap, see: [IMPLEMENTATION_PLAN.md](file:///d:/Projects/MY/3S%20website/3S-PETS-PROJECT/IMPLEMENTATION_PLAN.md)**


