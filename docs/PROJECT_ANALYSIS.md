# PROJECT ANALYSIS — Smart Parking System

**Analyst:** QA Engineer — Poosala Saiteja  
**Date:** 2026-10-29  
**Application URL:** https://saiteja-23-p.github.io/smart-parking-system/#/  
**Analysis Method:** Live bundle inspection (JS source extraction), UI exploration, routing analysis

---

## 1. Application Overview

The **Smart Parking System** is a React-based Single Page Application (SPA) deployed on GitHub Pages. It provides a digital platform for discovering, selecting, and booking parking slots across multiple real-world locations in Hyderabad, India (and one international location). The system includes user-facing and admin-facing modules.

**Tagline discovered in bundle:** *"Frictionless Parking at Your Fingertips."*

**Core Value Proposition:**
- Real-time parking slot availability
- Digital booking and confirmation
- QR/RFID/Fastag-based entry/exit simulation
- Admin analytics dashboard

---

## 2. Technology Stack (Observed)

| Layer | Technology |
|---|---|
| Frontend Framework | React 19.x (minified bundle) |
| Routing | React Router (Hash Routing `#/`) |
| Animation | Framer Motion (`U_.div` patterns in bundle) |
| Styling | Tailwind CSS (class patterns confirmed in bundle) |
| Build Tool | Vite (asset naming pattern `index-5iBb82m_.js`) |
| Hosting | GitHub Pages (static SPA) |
| Backend/API | **Sandbox/Mock mode** (API connection fails → client-side fallback) |
| Auth | Mock JWT tokens (client-side only, no real server) |
| Data Persistence | `localStorage` (confirmed: token, user, booking data) |
| State Management | React local state / context |

**Critical Finding:** The bundle contains this log message:
> `"API auth connection failed. Activating secure client-side sandbox mode."`

This confirms the application **operates entirely client-side** with mock data. There is no live backend API accessible from the deployed URL.

---

## 3. Discovered Application Routes

| Route | Description | Access |
|---|---|---|
| `#/` | Landing / Home Page | Public |
| `#/login` | User & Admin Login | Public |
| `#/register` | User Registration | Public (assumed) |
| `#/dashboard` | User Dashboard (Active Bookings, History) | Authenticated |
| `#/bookings` | My Bookings / Booking History Ledger | Authenticated |
| `#/admin` | Admin Panel | Admin only |
| `#/admin/dashboard` | Admin Analytics Dashboard | Admin only |
| `#/admin/analytics` | Advanced Analytics | Admin only |

---

## 4. Confirmed Parking Locations

Extracted directly from JavaScript bundle:

| Location | Slot Code Examples |
|---|---|
| T-Hub Innovation Parking (Gachibowli) | `TH-01`, Token: `TOKEN-TH-01-9942` |
| GVK One Premium Parking | `GV-F1-01`, Token: `TOKEN-GV-F1-01-9640` |
| Inorbit Mall Parking | `IN-F1-01`, Token: `TOKEN-IN-F1-01-9988` |
| Charminar Tourist Parking | (separate sector) |
| Korutla Bus Stand Parking | (bus stand sector) |
| SF Wharf Station Parking | (international reference) |

**Seeding message discovered:** `"API slots fetch failed. Seeding local Gachibowli slot bays."`

---

## 5. Confirmed Features & Modules

### 5.1 Authentication Module
- Login form: Email + Password
- Admin login: `admin@smartparking.com` → role `ROLE_ADMIN`
- Regular user login: any `@` email → role `ROLE_USER`, name extracted from email prefix
- JWT mock token stored in `localStorage`
- Login error message: `"Login rejected by gateway."`
- Session expiry message: `"Session expired. Deauthenticating user credentials."`

### 5.2 Parking Slot Module
- Slot states: **AVAILABLE**, **RESERVED**, **OCCUPIED** (inferred from RFID check-out message)
- Slot discovery: `"Smart Parking System Map Discovery"`
- Slot terminal: `"Select Parking Terminal"`
- Slot configurator (admin): `"Slot Configurator"`
- Slot cancellation: `"Cancel Slot"`

### 5.3 Booking Module
- Booking form fields:
  - Vehicle license number (validated: `"Please provide a vehicle license number."`)
  - Default vehicle license number (pre-fill feature)
  - Duration / hours
  - Parking location (from terminal selector)
- Dynamic tariff calculation (RFID/Fastag based): `"Inorbit Mall Slot IN-F1-01 check-in fee"`, `"T-Hub Gachibowli Slot TH-01 session tariff"`
- Booking confirmation: `"Confirm Secure Booking"`, `"Processing Booking..."`
- Booking token generated: `TOKEN-*` pattern
- Post-booking action: `"Book Another Spot"`
- Payment reference: `BOOKING_PAYMENT`

### 5.4 User Dashboard Module
- Active bookings: `"Active Bookings"`, `"Active parking sessions"`
- Booking history: `"Booking History"`, `"Recent Parking History Logs"`, `"Booking History Ledger"`, `"Booking History Log Sheet"`
- Booking search: `"Search booking records..."`
- Fastag Status display
- Gate Status display
- RFID checkout log: `"RFID_BARRIER: Checked out vehicle TS07XY9087."`

### 5.5 Admin Module
- Admin Dashboard: `"Admin Dashboard"`
- Analytics: `"Hourly Docking Activity Trajectory"`
- Revenue tracking: `"PLOT_SECT_TARIFF"`, `"PLOT_DENS_OP_V9"`
- Slot management: `"Slot Configurator"`
- System logs terminal: `"Smart Parking System Core logs terminal"`
- Booking ledger: `"Booking Ledger"`
- Identity/role display: `"IDENTITY ROLE: ROLE_ADMIN"` / `"ROLE_USER"`

---

## 6. Confirmed Credentials (Sandbox Mode)

| Role | Email | Notes |
|---|---|---|
| Admin | `admin@smartparking.com` | JWT mock, role ROLE_ADMIN |
| User | Any valid email format | Name extracted from email prefix |

---

## 7. Discovered UI Text & Validation Messages

| Message | Trigger |
|---|---|
| `"Please provide a vehicle license number."` | Empty vehicle field on booking |
| `"Login rejected by gateway."` | Invalid login credentials |
| `"Session expired. Deauthenticating user credentials."` | Session timeout/token invalid |
| `"No recent active booking logs recorded."` | Empty booking history |
| `"API auth connection failed. Activating secure client-side sandbox mode."` | Backend unreachable |
| `"API slots fetch failed. Seeding local Gachibowli slot bays."` | Slots API fails → local data |
| `"Processing Booking..."` | During booking submission |

---

## 8. Functional Modules Summary

| Module | Availability | Testability |
|---|---|---|
| Home / Landing Page | ✅ Confirmed | ✅ UI Testable |
| Login (User) | ✅ Confirmed | ✅ Testable (sandbox) |
| Login (Admin) | ✅ Confirmed | ✅ Testable |
| Register | ✅ Assumed (common SPA pattern) | ✅ Likely testable |
| Parking Location Discovery | ✅ Confirmed | ✅ Testable |
| Slot Selection | ✅ Confirmed | ✅ Testable |
| Booking Form + Validation | ✅ Confirmed | ✅ Testable |
| Booking Confirmation | ✅ Confirmed | ✅ Testable |
| User Dashboard | ✅ Confirmed | ✅ Testable (auth required) |
| Booking History | ✅ Confirmed | ✅ Testable |
| Admin Dashboard | ✅ Confirmed | ✅ Testable |
| Admin Analytics | ✅ Confirmed | ✅ Testable |
| Logout | ✅ Assumed | ✅ Likely testable |
| Real-time backend API | ❌ Not available | 🚫 Not testable (sandbox only) |
| Database | ❌ No DB accessible | 🚫 Not testable |
| Payment gateway | ❌ Mock only | 🚫 Not testable |

---

## 9. User Journeys

### Journey 1: Regular User — Parking Booking
```
Landing Page → Login → Parking Location Selection (Map Discovery)
→ Slot Selection (view available/reserved) → Booking Form
(vehicle no., duration, terminal) → Confirm Secure Booking
→ Booking Token Generated → Dashboard → Booking History
```

### Journey 2: Admin — Slot Management & Analytics
```
Login (admin@smartparking.com) → Admin Dashboard
→ Slot Configurator (manage slots) → Analytics Dashboard
(Hourly Docking Trajectory) → Booking Ledger → System Logs
```

### Journey 3: User — Booking Cancellation
```
Dashboard → Active Bookings → Cancel Slot → Confirmation
```

---

## 10. Critical Business Flows

| Flow | Risk Level |
|---|---|
| Login with invalid credentials | HIGH — Security |
| Booking with invalid vehicle number | HIGH — Data integrity |
| Double-booking same slot | HIGH — Business logic |
| Admin accessing user data | HIGH — Authorization |
| Unauthenticated access to dashboard | HIGH — Security |
| Slot state transition (Available → Reserved → Occupied) | HIGH — Core logic |
| Booking confirmation token generation | MEDIUM |
| Session expiry handling | MEDIUM |
| Booking history accuracy | MEDIUM |

---

## 11. QA Testing Scope

**IN SCOPE:**
- All UI/functional testing on deployed application
- Login (valid, invalid, boundary)
- Registration flow
- Parking slot discovery and selection
- Booking form validation
- Booking workflow end-to-end
- Dashboard functionality
- Admin panel access
- Logout and session behavior
- Responsive design testing
- Navigation testing
- Security-oriented UI checks
- Accessibility (basic)
- Cross-browser UI testing

**OUT OF SCOPE:**
- Real backend API testing (no live API)
- Database validation (no DB access)
- Real payment gateway
- Load/stress testing (GitHub Pages static host)
- Real RFID/Fastag hardware integration
- Email notifications
- Mobile native app (web-only)

---

## 12. Assumptions

1. Application behaves identically across sandbox and any future production mode for UI flows
2. Any email format with `@` is accepted as valid user credential
3. Admin role requires specifically `admin@smartparking.com`
4. `localStorage` is the persistence mechanism
5. Slot state is deterministic based on mock data seeded at app load

---

## 13. Known Limitations

1. **No live API** — All tests operate against mock/sandbox data
2. **No real persistence** — Data resets on browser refresh unless in `localStorage`
3. **GitHub Pages static hosting** — Cannot test server-side behavior
4. **Mock JWT** — Auth tokens are hardcoded, not cryptographically validated on a server
5. **No email service** — Registration confirmation emails cannot be tested

---

## 14. Risk Areas

| Risk | Impact | Likelihood |
|---|---|---|
| Unauthenticated route access | HIGH | MEDIUM |
| Vehicle number bypass | HIGH | HIGH |
| Admin panel role bypass | CRITICAL | MEDIUM |
| Booking with past/invalid data | MEDIUM | HIGH |
| localStorage tampering | HIGH | LOW |
| XSS in vehicle number field | HIGH | MEDIUM |
