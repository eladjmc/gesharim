# PRD — גשרים לקהילה (Bridges to Community)

## 1. Overview

**Product Name:** גשרים לקהילה  
**Type:** Community Project Request Management System  
**Purpose:** A web platform that connects community/municipality needs with the "Bridges to Community" program. The public submits project requests, and an admin manages the full lifecycle — approving, assigning training managers (מנה"דים), and tracking progress through completion.

---

## 2. Users & Roles

| Role | Description | Access |
|------|-------------|--------|
| **Public Visitor** | Anyone browsing the site. Can view info, gallery, and submit a project request. | Public landing page + contact form |
| **Admin** | System administrator. Manages all requests, מנה"דים, municipalities, and email templates. | Full admin dashboard (JWT-protected) |
| **מנה"ד (Training Manager)** | Receives email notifications when assigned to a project. No system login for MVP. | Email only |

### Future Role (not in MVP)
- **מנה"ד with login** — User schema already supports `manhad` role for future dashboard access.

---

## 3. User Stories

### Public Visitor
- **US-1:** As a visitor, I can view the landing page with information about "גשרים לקהילה" so I understand the program.
- **US-2:** As a visitor, I can browse a gallery of past projects (mock data) to see examples of what was done.
- **US-3:** As a visitor, I can filter the gallery by municipality and project type.
- **US-4:** As a visitor, I can click "להשארת פנייה" to open a contact form modal.
- **US-5:** As a visitor, I can fill out the form (name, phone, email, business name, municipality, need type, description) and submit it.
- **US-6:** As a visitor, I receive a confirmation email after submitting my request.

### Admin
- **US-7:** As an admin, I can log in with email and password.
- **US-8:** As an admin, I can view a dashboard with project counts by status.
- **US-9:** As an admin, I can view all project requests in a filterable table (by status, municipality, מנה"ד, date).
- **US-10:** As an admin, I can open a project detail modal to see full info, status history, and internal notes.
- **US-11:** As an admin, I can approve a request and assign a מנה"ד — triggering emails to both requester and מנה"ד.
- **US-12:** As an admin, I can reject a request with a free-text reason — triggering a formal rejection email to the requester.
- **US-13:** As an admin, I can advance a project status (Approved → In Development → QA → Completed).
- **US-14:** As an admin, I can cancel a project from any active status — triggering a cancellation email.
- **US-15:** As an admin, I can add internal notes to a project (visible only to admin).
- **US-16:** As an admin, I can manage מנה"דים (CRUD) with name, email, phone, and assigned municipalities.
- **US-17:** As an admin, I can manage municipalities (CRUD) — add/remove municipality names.
- **US-18:** As an admin, I can edit email templates (subject + body with placeholders).

---

## 4. Feature Specifications

### 4.1 Public Landing Page

**URL:** `/`

**Sections (top to bottom):**
1. **Header** — Logo/title "גשרים לקהילה" + admin login button (top corner)
2. **Hero** — Program title, subtitle explaining the mission, CTA button "להשארת פנייה"
3. **About** — Short description of the program, what it does, who it serves
4. **Project Gallery** — Grid of project cards (mock data):
   - Each card: project name, type badge, municipality name
   - Filters: municipality dropdown, type dropdown, free-text search
5. **Footer** — Contact info, credits

**Design:** Clean, modern, Hebrew RTL. Blue/green/white palette. Card-based layout with generous whitespace.

---

### 4.2 Contact Form Modal

**Triggered by:** CTA button on landing page

**Fields:**

| Field | Type | Validation |
|-------|------|-----------|
| שם מלא (Full Name) | Text input | Required, min 2 chars |
| טלפון (Phone) | Text input | Required, Israeli phone format |
| אימייל (Email) | Email input | Required, valid email |
| שם העסק (Business Name) | Text input | Required, min 2 chars |
| רשות (Municipality) | Searchable dropdown | Required, from managed list (API) |
| סוג הצורך (Need Type) | Radio buttons | Required, single selection |
| תיאור קצר (Description) | Textarea | Required, min 10 chars, max 500 |

**Need Type Options:**
- דף נחיתה (Landing Page)
- אתר תדמית (Showcase Site)
- קטלוג מוצרים (Product Catalog)
- שדרוג אתר קיים (Site Upgrade)

**On Submit:**
1. Validate all fields client-side
2. POST to `/api/projects`
3. Show success toast: "הפנייה שלך התקבלה בהצלחה! נחזור אליך בהקדם."
4. Close modal
5. Backend sends confirmation email to requester

---

### 4.3 Admin Login

**URL:** `/admin/login`

**Fields:** Email + Password  
**On Success:** Store JWT in localStorage, redirect to `/admin/dashboard`  
**On Failure:** Show error message

---

### 4.4 Admin Dashboard

**URL:** `/admin/dashboard`

**Components:**

#### Stats Cards (top row)
- ממתין לאישור (Pending): count
- מאושר (Approved): count
- בפיתוח (In Development): count
- בקרת איכות (QA): count
- הושלם (Completed): count

#### Project Table
- Columns: #, Business Name, Municipality, Need Type, Status, מנה"ד, Date
- Filters: Status dropdown, Municipality dropdown, מנה"ד dropdown, Date range
- Sortable by date
- Click row → opens Project Detail Modal

#### Project Detail Modal
- **Info section:** All submitted fields (name, phone, email, business, municipality, type, description)
- **Status section:** Current status badge + status history timeline
- **Actions section:**
  - If Pending: "Approve" (opens מנה"ד assignment dropdown) / "Reject" (opens reason textarea)
  - If Approved/In Development/QA: "Advance Status" / "Cancel"
  - If Completed/Rejected/Cancelled: No actions (read-only)
- **Notes section:** List of internal notes + "Add Note" input

---

### 4.5 מנה"דים Management

**URL:** `/admin/manhadim`

**Table columns:** Name, Email, Phone, Assigned Municipalities, Actions (Edit/Delete)

**Add/Edit Form:**
- שם (Name): text, required
- אימייל (Email): email, required
- טלפון (Phone): text, required
- רשויות (Municipalities): multi-select from managed list

**Validation:** Cannot delete a מנה"ד assigned to active projects (status not completed/rejected/cancelled).

---

### 4.6 Municipalities Management

**URL:** `/admin/municipalities`

**Simple CRUD list:**
- Add: municipality name input
- Edit: inline rename
- Delete: with confirmation. Cannot delete if used by active projects or assigned to מנה"דים.

---

### 4.7 Email Templates Management

**URL:** `/admin/email-templates`

**Templates:**

| Key | Trigger | Recipients |
|-----|---------|-----------|
| `request_received` | New form submission | Requester |
| `request_approved_requester` | Admin approves | Requester |
| `request_approved_manhad` | Admin approves | Assigned מנה"ד |
| `request_rejected` | Admin rejects | Requester |
| `request_cancelled` | Admin cancels | Requester |

**Edit Form:**
- Subject line (text input)
- Body (textarea/rich text)
- Available placeholders reference panel (e.g., `{{fullName}}`, `{{businessName}}`, `{{municipalityName}}`, `{{needType}}`, `{{rejectionReason}}`, `{{manhadName}}`)

---

## 5. Status Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Form Submit] → PENDING ──┬── Approve ──→ APPROVED        │
│                            │                  │             │
│                            │            Advance ↓           │
│                            │           IN_DEVELOPMENT       │
│                            │                  │             │
│                            │            Advance ↓           │
│                            │               QA              │
│                            │                  │             │
│                            │            Advance ↓           │
│                            │            COMPLETED           │
│                            │                                │
│                            └── Reject ──→ REJECTED          │
│                                                             │
│  From APPROVED/IN_DEVELOPMENT/QA:                           │
│       Cancel ──→ CANCELLED                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Terminal statuses (no further action):** COMPLETED, REJECTED, CANCELLED

---

## 6. Email Specifications

### 6.1 Request Received (request_received)

**To:** Requester email  
**Subject:** פנייתך התקבלה — גשרים לקהילה  
**Body template:**
```
שלום {{fullName}},

פנייתך בנושא "{{businessName}}" התקבלה בהצלחה במערכת גשרים לקהילה.
צוות התיאום שלנו יבחן את הבקשה ויחזור אליך בהקדם.

פרטי הפנייה:
- סוג הצורך: {{needType}}
- רשות: {{municipalityName}}

תודה רבה,
צוות גשרים לקהילה
```

### 6.2 Request Approved — Requester (request_approved_requester)

**To:** Requester email  
**Subject:** פנייתך אושרה — גשרים לקהילה  
**Body template:**
```
שלום {{fullName}},

שמחים לעדכן שפנייתך בנושא "{{businessName}}" אושרה!
צוות מנה"ד מקצועי ילווה את הפרויקט שלך.

נהיה איתך בקשר בהמשך התהליך.

בברכה,
צוות גשרים לקהילה
```

### 6.3 Request Approved — מנה"ד (request_approved_manhad)

**To:** Assigned מנה"ד email  
**Subject:** משימה חדשה — {{businessName}} | {{municipalityName}}  
**Body template:**
```
שלום {{manhadName}},

שובצת לפרויקט חדש:

פרטי הפרויקט:
- שם העסק: {{businessName}}
- רשות: {{municipalityName}}
- סוג הצורך: {{needType}}
- תיאור: {{description}}

פרטי הפונה:
- שם: {{fullName}}
- טלפון: {{phone}}
- אימייל: {{email}}

אנא צור/צרי קשר עם הפונה להתחלת התהליך.

בהצלחה,
צוות גשרים לקהילה
```

### 6.4 Request Rejected (request_rejected)

**To:** Requester email  
**Subject:** עדכון לגבי פנייתך — גשרים לקהילה  
**Body template:**
```
שלום {{fullName}},

הפרויקט שלך בנושא "{{businessName}}" נבחן על ידי צוות התיאום שלנו ונמצא שכרגע לא נוכל להתקדם איתו.

הסיבה שניתנה היא:
{{rejectionReason}}

אנו מזמינים אותך לפנות אלינו שוב בעתיד.

תודה רבה,
בברכה, צוות גשרים לקהילה
```

### 6.5 Request Cancelled (request_cancelled)

**To:** Requester email  
**Subject:** הפרויקט בוטל — גשרים לקהילה  
**Body template:**
```
שלום {{fullName}},

לצערנו, הפרויקט "{{businessName}}" בוטל.

במידה ויש לך שאלות, אל תהסס/י לפנות אלינו.

בברכה,
צוות גשרים לקהילה
```

---

## 7. Non-Functional Requirements

| Requirement | Details |
|-------------|---------|
| **Language** | Hebrew (RTL), 100% |
| **Responsive** | Desktop-first, mobile-friendly |
| **Browser** | Modern browsers (Chrome, Firefox, Safari, Edge) |
| **Performance** | < 2s page load, < 500ms API responses |
| **Security** | JWT auth, password hashing (bcrypt), input validation, CORS |
| **Email** | SMTP via Nodemailer (Gmail/Outlook configurable) |
| **Deployment** | Docker Compose for local dev. Production deployment out of scope. |

---

## 8. Out of Scope (MVP)

- מנה"ד login and dashboard
- File uploads (logos, images, attachments)
- Real project data in gallery (using mocks)
- Production deployment
- Multi-language / i18n
- Password reset flow
- Rate limiting / advanced security
- Analytics / reporting dashboards
- SMS notifications
- Role-based access for multiple admins
