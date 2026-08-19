# Integrated Employee Skill Discovery Frontend

This frontend is wired to the backend routes currently present in the uploaded project.

## Backend API coverage

- `/api/auth` — register, login, current user
- `/api/profile` — create/read/update profile
- `/api/skills` — add/list/update/delete skills
- `/api/skill-catalog` — skill catalog suggestions
- `/api/resume` — parse and save parsed resume
- `/api/certifications` — certification CRUD
- `/api/search/advanced` — manager/HR/L&D talent search
- `/api/analytics/*` — organisation analytics
- `/api/roles` — role requirement CRUD
- `/api/skill-gap/:employeeId/:roleId` — skill-gap report
- `/api/recommendations/:employeeId/:roleId` — cached learning recommendation

## Run

1. Start the backend on port 5000.
2. Copy `.env.example` to `.env` if needed.
3. From this frontend directory:

```bash
npm install
npm run dev
```

The default API URL is `http://localhost:5000/api`.

## Important backend note

Your `User` model uses the role `ld`, while the recommendation and skill-gap authorization middleware currently lists `learning`. The generated frontend therefore exposes skill-gap analysis to Manager/HR, which are accepted by the current backend. If L&D should also use these endpoints, update those backend authorization lists from `learning` to include `ld`.
