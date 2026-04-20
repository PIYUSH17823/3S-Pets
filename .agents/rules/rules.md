---
trigger: always_on
---

MANDATORY RULE — ACTIVE THROUGHOUT THE ENTIRE SESSION:

You are maintaining a living project documentation file called PROJECT_CONTEXT.md located at the root of the 3S-Pets project.YOUR MISSION: 

1.  Backend Transformation: Fully migrate the backend logic from Java/Spring Boot to a more "hosting-friendly" stack (e.g., Node.js/Express or Firebase).
2.  Frontend Refactoring (Free Hand): You have full authority to optimize the frontend code structure, modularize JavaScript logic into a dedicated API Service Layer, and improve folder organization.
3.  UI Preservation (Strict Constraint): You must NOT change the visual design, colors, layout, or typography. The final rendered UI must remain "Pixel-Locked" to the user's current design.

Every single time you create, transform, modify, or delete ANY file, you MUST immediately update PROJECT_CONTEXT.md BEFORE moving to the next task.

=======================================================
PROJECT_CONTEXT.md STRUCTURE (Initialize this first)

3S Pets — Project Context & Change Log

Project Overview
Name: 3S Pets (Freelance for Delight Pets, Pune)
Type: Full-Stack Pet Wellness Portal
Current Stack: [Define New Stack, e.g., Node.js/Express/Supabase]
Architecture Strategy: Pixel-Locked Refactoring (Code optimization with UI preservation)

Architecture Summary
Backend: [Define Stack]Database: [Define Database]
Frontend Logic: [e.g., Modular JS + API Service Layer]
Hosting Target: [e.g., Vercel / Render / Netlify]

File Registry(Updated for every file creation, migration, or deletion)
#File PathTypeStatusDescription...

API & Logic Registry(Tracks backend endpoints and key frontend logic functions)
MethodEndpoint / FunctionLogic DescriptionStatus...

Component Registry(Tracks the modular HTML fragments and their associated CSS/JS)
ComponentFile PathAssociated CSS/JSPurpose...

Change Log(Logged in Step-N format, reverse-chronological order)
StepActionFileEngineering Details (The "Why" and "How")...

Integration & Setup Notes
[Database connection strings]
[Environment variables]
[Build/Deploy instructions]

=======================================================

UPDATE RULES (Follow strictly on every operation)

RULE 1 — On TRANSFORMING / CREATING any file:
-Add a row to File Registry with status ✅ Created.
-If replacing a Java file, mark the old file as ❌ Deleted.
-Add a row to Change Log with action "TRANSFORM" or "CREATE".
-Documentation First: You must explain the architectural benefit of the change in the "Engineering Details" column.

RULE 2 — On MODIFYING any file (Refactoring):
-Update the row in File Registry to status ✏️ Modified.
-Add a new row to Change Log with action "MODIFY".
-UI Check: Confirm in the "Details" that the visual output remains unchanged.

RULE 3 — Formatting:
-Use Step-{N} for the Change Log.
-Maintain a clean, scannable table format for all registries.

RULE 4 — Final Summary:
At the end of the session, provide a count of total files transformed, new endpoints created, and a verified "UI Integrity" confirmation.

