# Technical Plan — גשרים לקהילה

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Compose                            │
├─────────────────┬───────────────────────┬───────────────────────┤
│   Frontend      │       Backend         │       MongoDB         │
│   (Vite Dev)    │   (Express + TS)      │    (Container)        │
│   Port: 5173    │     Port: 3000        │    Port: 27017        │
│                 │                       │                       │
│  React 19       │  Route → Controller   │  gesharim_db          │
│  TypeScript     │  → Service → DAL      │                       │
│  Tailwind 4     │  Mongoose ODM         │                       │
│  Zustand        │  JWT + Nodemailer     │                       │
└─────────────────┴───────────────────────┴───────────────────────┘
```

---

## 2. Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── server.ts                    # App bootstrap, middleware registration, listen
│   ├── app.ts                       # Express app creation (separated for testing)
│   ├── config/
│   │   ├── index.ts                 # Aggregated config export
│   │   ├── db.ts                    # Mongoose connection logic
│   │   └── env.ts                   # Environment variable loading + validation
│   ├── routes/
│   │   ├── index.ts                 # Mounts all route groups
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts
│   │   ├── manhad.routes.ts
│   │   ├── municipality.routes.ts
│   │   └── emailTemplate.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── manhad.controller.ts
│   │   ├── municipality.controller.ts
│   │   └── emailTemplate.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   ├── manhad.service.ts
│   │   ├── municipality.service.ts
│   │   ├── emailTemplate.service.ts
│   │   └── email.service.ts         # Nodemailer send + template rendering
│   ├── dal/
│   │   ├── user.dal.ts
│   │   ├── project.dal.ts
│   │   ├── manhad.dal.ts
│   │   ├── municipality.dal.ts
│   │   └── emailTemplate.dal.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── project.model.ts
│   │   ├── manhad.model.ts
│   │   ├── municipality.model.ts
│   │   └── emailTemplate.model.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts        # JWT verification + role check
│   │   ├── validate.middleware.ts    # Zod schema validation
│   │   └── error.middleware.ts       # Global error handler
│   ├── utils/
│   │   ├── jwt.util.ts              # sign / verify token helpers
│   │   ├── hash.util.ts             # bcrypt hash / compare
│   │   ├── template.util.ts         # Replace {{placeholders}} in email body
│   │   └── apiResponse.util.ts      # Standardized JSON response format
│   ├── types/
│   │   ├── enums.ts                 # ProjectStatus, UserRole, NeedType
│   │   ├── request.types.ts         # AuthRequest (req with user payload)
│   │   └── dto.ts                   # Request/Response DTOs
│   └── seed/
│       └── seed.ts                  # Seed admin user + email templates + sample data
├── package.json
├── tsconfig.json
├── nodemon.json
├── Dockerfile
└── .env.example
```

### Layer Rules

| Layer | Input | Output | Can Call |
|-------|-------|--------|---------|
| Route | HTTP request | — | Controller |
| Controller | req, res, next | JSON response | Service |
| Service | DTOs/params | Business result | DAL, Utils |
| DAL | Query params | Mongoose documents | Model |
| Model | — | Schema definition | — |

---

## 3. Database Schemas

### 3.1 User

```typescript
{
  _id: ObjectId,
  email: string,          // unique, required, lowercase, trimmed
  password: string,       // bcrypt hash, required
  name: string,           // required
  role: 'admin' | 'manhad',  // enum, default: 'admin'
  createdAt: Date,        // auto (timestamps)
  updatedAt: Date         // auto (timestamps)
}
```

**Indexes:** `{ email: 1 }` (unique)

---

### 3.2 Municipality

```typescript
{
  _id: ObjectId,
  name: string,           // unique, required, trimmed
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `{ name: 1 }` (unique)

---

### 3.3 Manhad (מנה"ד)

```typescript
{
  _id: ObjectId,
  name: string,                    // required, trimmed
  email: string,                   // required, lowercase, trimmed
  phone: string,                   // required, trimmed
  municipalities: [ObjectId],      // refs → Municipality
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `{ email: 1 }` (unique)

---

### 3.4 Project

```typescript
{
  _id: ObjectId,
  // Requester info
  fullName: string,                // required, trimmed
  phone: string,                   // required, trimmed
  email: string,                   // required, lowercase, trimmed
  businessName: string,            // required, trimmed
  // Project info
  municipality: ObjectId,          // ref → Municipality, required
  needType: 'landing_page' | 'showcase_site' | 'product_catalog' | 'site_upgrade',  // enum, required
  description: string,             // required, trimmed, maxlength 500
  // Status management
  status: 'pending' | 'approved' | 'in_development' | 'qa' | 'completed' | 'rejected' | 'cancelled',
  assignedManhad: ObjectId | null, // ref → Manhad, default null
  rejectionReason: string | null,  // populated when rejected
  // History & notes
  statusHistory: [{
    status: string,                // the status it changed TO
    changedAt: Date,               // default: Date.now
    changedBy: ObjectId            // ref → User (admin who made the change)
  }],
  adminNotes: [{
    text: string,                  // required
    createdAt: Date,               // default: Date.now
    createdBy: ObjectId            // ref → User
  }],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ status: 1 }`
- `{ municipality: 1 }`
- `{ assignedManhad: 1 }`
- `{ createdAt: -1 }`

---

### 3.5 EmailTemplate

```typescript
{
  _id: ObjectId,
  key: string,            // unique identifier: 'request_received', 'request_approved_requester', etc.
  name: string,           // display name in admin UI (Hebrew)
  subject: string,        // email subject line (with {{placeholders}})
  body: string,           // email body (with {{placeholders}})
  availablePlaceholders: [string],  // reference: ['fullName', 'businessName', ...]
  updatedAt: Date,
  createdAt: Date
}
```

**Indexes:** `{ key: 1 }` (unique)

**Template Keys:**
| Key | Trigger |
|-----|---------|
| `request_received` | Form submission |
| `request_approved_requester` | Admin approves → to requester |
| `request_approved_manhad` | Admin approves → to מנה"ד |
| `request_rejected` | Admin rejects |
| `request_cancelled` | Admin cancels |

---

## 4. API Endpoints

### 4.1 Public Routes

| Method | Path | Description | Body/Query |
|--------|------|-------------|-----------|
| GET | `/api/municipalities` | List all municipalities | — |
| POST | `/api/projects` | Submit new project request | `{ fullName, phone, email, businessName, municipality, needType, description }` |

### 4.2 Auth Routes

| Method | Path | Description | Body |
|--------|------|-------------|------|
| POST | `/api/auth/login` | Admin login | `{ email, password }` |

### 4.3 Admin — Projects

| Method | Path | Description | Body/Query |
|--------|------|-------------|-----------|
| GET | `/api/admin/projects` | List all projects (paginated, filterable) | Query: `status`, `municipality`, `manhad`, `fromDate`, `toDate`, `page`, `limit` |
| GET | `/api/admin/projects/stats` | Get counts by status | — |
| GET | `/api/admin/projects/:id` | Get project detail | — |
| PATCH | `/api/admin/projects/:id/status` | Change project status | `{ status, rejectionReason?, assignedManhad? }` |
| POST | `/api/admin/projects/:id/notes` | Add internal note | `{ text }` |

### 4.4 Admin — Manhadim

| Method | Path | Description | Body |
|--------|------|-------------|------|
| GET | `/api/admin/manhadim` | List all מנה"דים | — |
| GET | `/api/admin/manhadim/:id` | Get single מנה"ד | — |
| POST | `/api/admin/manhadim` | Create מנה"ד | `{ name, email, phone, municipalities }` |
| PUT | `/api/admin/manhadim/:id` | Update מנה"ד | `{ name, email, phone, municipalities }` |
| DELETE | `/api/admin/manhadim/:id` | Delete מנה"ד | — |

### 4.5 Admin — Municipalities

| Method | Path | Description | Body |
|--------|------|-------------|------|
| GET | `/api/admin/municipalities` | List all | — |
| POST | `/api/admin/municipalities` | Create | `{ name }` |
| PUT | `/api/admin/municipalities/:id` | Update | `{ name }` |
| DELETE | `/api/admin/municipalities/:id` | Delete (with validation) | — |

### 4.6 Admin — Email Templates

| Method | Path | Description | Body |
|--------|------|-------------|------|
| GET | `/api/admin/email-templates` | List all templates | — |
| GET | `/api/admin/email-templates/:id` | Get single template | — |
| PUT | `/api/admin/email-templates/:id` | Update template | `{ subject, body }` |

---

## 5. Authentication & Authorization

### JWT Structure
```json
{
  "userId": "ObjectId",
  "email": "admin@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Middleware Chain
1. `auth.middleware` — Verifies JWT from `Authorization: Bearer <token>` header
2. `validate.middleware` — Validates request body against Zod schema
3. `error.middleware` — Catches all errors, returns standardized response

### API Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

```json
{
  "success": false,
  "error": "Error description",
  "details": [ ... ]   // validation errors array (optional)
}
```

---

## 6. Email Service

### Configuration (Environment Variables)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-specific-password
SENDER_EMAIL=noreply@gesharim.org
SENDER_NAME=צוות גשרים לקהילה
```

### Template Rendering Flow
1. Service triggers email (e.g., on status change)
2. Load template from DB by key
3. Replace `{{placeholders}}` with actual values using `template.util.ts`
4. Send via Nodemailer SMTP transport

### Available Placeholders
| Placeholder | Source | Available In |
|-------------|--------|-------------|
| `{{fullName}}` | project.fullName | All templates |
| `{{businessName}}` | project.businessName | All templates |
| `{{municipalityName}}` | project.municipality.name (populated) | All templates |
| `{{needType}}` | project.needType (Hebrew label) | All templates |
| `{{description}}` | project.description | manhad template |
| `{{phone}}` | project.phone | manhad template |
| `{{email}}` | project.email | manhad template |
| `{{manhadName}}` | manhad.name | manhad template |
| `{{rejectionReason}}` | manual input from admin | rejected template |

---

## 7. Frontend Architecture

### Tech Stack
- React 19 + TypeScript 5.9
- Vite 7 (build tool)
- Tailwind CSS 4 (RTL-first styling)
- Zustand 5 (global state: auth)
- React Router 7 (routing)

### Folder Structure
```
frontend/src/
├── main.tsx
├── App.tsx                      # Router setup
├── index.css                    # Tailwind imports + RTL + theme tokens
├── components/
│   ├── public/                  # Public landing page components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── GalleryCard.tsx
│   │   ├── GalleryFilters.tsx
│   │   ├── ContactFormModal.tsx
│   │   └── FormField.tsx
│   ├── admin/                   # Admin dashboard components
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── ProjectTable.tsx
│   │   │   ├── ProjectFilters.tsx
│   │   │   └── ProjectDetailModal.tsx
│   │   ├── manhadim/
│   │   │   ├── ManhadimTable.tsx
│   │   │   └── ManhadForm.tsx
│   │   ├── municipalities/
│   │   │   └── MunicipalityList.tsx
│   │   └── emailTemplates/
│   │       ├── TemplateList.tsx
│   │       └── TemplateEditor.tsx
│   ├── common/                  # Shared reusable components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   └── SearchableSelect.tsx
│   └── layout/
│       ├── PublicLayout.tsx
│       ├── AdminLayout.tsx
│       ├── AdminSidebar.tsx
│       └── Header.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ManhadimPage.tsx
│   ├── MunicipalitiesPage.tsx
│   └── EmailTemplatesPage.tsx
├── hooks/
│   ├── useProjects.ts
│   ├── useManhadim.ts
│   ├── useMunicipalities.ts
│   └── useEmailTemplates.ts
├── store/
│   ├── index.ts
│   └── authStore.ts
├── services/
│   └── api.ts                   # Axios/fetch wrapper with JWT interceptor
├── types/
│   ├── project.ts
│   ├── manhad.ts
│   ├── municipality.ts
│   └── emailTemplate.ts
├── data/
│   └── mockGallery.ts           # Hardcoded gallery data
└── utils/
    └── constants.ts             # Need type labels, status labels, colors
```

### Design System

**Colors (from presentation):**
- Primary: `#2563EB` (blue-600)
- Secondary: `#10B981` (emerald-500)
- Background: `#F8FAFC` (slate-50)
- Surface: `#FFFFFF`
- Text: `#1E293B` (slate-800)
- Muted: `#64748B` (slate-500)
- Error: `#EF4444` (red-500)
- Warning: `#F59E0B` (amber-500)

**Design principles:**
- Clean, modern, card-based
- Generous whitespace (p-6, gap-4 minimum)
- Subtle shadows (`shadow-sm`, `shadow-md`)
- Smooth transitions (`transition-all duration-200`)
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Status badges with colored backgrounds
- Hebrew RTL throughout (`dir="rtl"` on html)

---

## 8. Docker Compose

```yaml
services:
  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo_data:/data/db]

  backend:
    build: ./backend
    ports: ["3000:3000"]
    env_file: ./backend/.env
    depends_on: [mongodb]

  frontend:
    build: ./frontend
    ports: ["5173:5173"]
    depends_on: [backend]

volumes:
  mongo_data:
```

---

## 9. Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/gesharim
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=noreply@gesharim.org
SENDER_NAME=צוות גשרים לקהילה
ADMIN_EMAIL=admin@gesharim.org
ADMIN_PASSWORD=admin123
ADMIN_NAME=מנהל המערכת
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 10. Seed Data

### Admin User
- Email: from `ADMIN_EMAIL` env var
- Password: from `ADMIN_PASSWORD` env var (hashed with bcrypt)
- Role: `admin`

### Email Templates
- All 5 templates seeded with default Hebrew content (as defined in PRD)

### Sample Municipalities (for development)
Based on the presentation image:
- באר שבע
- ירוחם
- ערד
- נתיבות
- אופקים
- רהט
- שגב שלום
- מצפה רמון
- דימונה
- טבריה

---

## 11. Validation Schemas (Zod)

### Project Submission
```typescript
{
  fullName: z.string().min(2).max(100).trim(),
  phone: z.string().regex(/^0[2-9]\d{7,8}$/),  // Israeli phone
  email: z.string().email().toLowerCase().trim(),
  businessName: z.string().min(2).max(100).trim(),
  municipality: z.string().length(24),           // ObjectId
  needType: z.enum(['landing_page', 'showcase_site', 'product_catalog', 'site_upgrade']),
  description: z.string().min(10).max(500).trim()
}
```

### Login
```typescript
{
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6)
}
```

### Manhad
```typescript
{
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().regex(/^0[2-9]\d{7,8}$/),
  municipalities: z.array(z.string().length(24)).min(1)
}
```

### Municipality
```typescript
{
  name: z.string().min(2).max(50).trim()
}
```

### Status Change
```typescript
{
  status: z.enum(['approved', 'in_development', 'qa', 'completed', 'rejected', 'cancelled']),
  rejectionReason: z.string().min(5).max(500).optional(),
  assignedManhad: z.string().length(24).optional()
}
```

---

## 12. Status Transition Rules

| Current Status | Allowed Transitions | Required Fields |
|---------------|--------------------| --------------- |
| `pending` | `approved`, `rejected` | approved: `assignedManhad`; rejected: `rejectionReason` |
| `approved` | `in_development`, `cancelled` | — |
| `in_development` | `qa`, `cancelled` | — |
| `qa` | `completed`, `cancelled` | — |
| `completed` | — (terminal) | — |
| `rejected` | — (terminal) | — |
| `cancelled` | — (terminal) | — |

---

## 13. Implementation Order

| # | Task | Dependencies |
|---|------|-------------|
| 1 | Backend scaffolding (Express + TS + folder structure) | — |
| 2 | Frontend scaffolding (Vite + React + Tailwind RTL) | — |
| 3 | Docker Compose + env files | 1, 2 |
| 4 | Mongoose models (all 5 schemas) | 1 |
| 5 | Seed script | 4 |
| 6 | Auth (login + JWT middleware) | 4 |
| 7 | Public API (municipalities + project submission) | 4, 6 |
| 8 | Admin CRUD APIs (projects, manhadim, municipalities, templates) | 6 |
| 9 | Email service (Nodemailer + template rendering) | 4 |
| 10 | Frontend shell (routing, layout, RTL, theme) | 2 |
| 11 | Public landing page + gallery + form modal | 10, 7 |
| 12 | Admin login + auth store | 10, 6 |
| 13 | Admin dashboard + project management | 12, 8 |
| 14 | Admin מנה"דים + municipalities pages | 12, 8 |
| 15 | Admin email templates page | 12, 8 |
| 16 | Integration testing + Docker validation | All |
