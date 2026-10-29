# API TESTING — Assessment & Strategy
## Smart Parking System — QA Project

| Field | Value |
|---|---|
| Author | Poosala Saiteja |
| Date | 2026-10-29 |

---

## API Testing Assessment

**Finding:** API testing was assessed during QA analysis. The deployed application (`https://saiteja-23-p.github.io/smart-parking-system/#/`) **does not expose an accessible backend API** within the current test environment.

**Evidence:**
- JavaScript bundle contains this log: `"API auth connection failed. Activating secure client-side sandbox mode."`
- Application falls back to client-side mock data for both authentication and slot data
- All data persisted in `localStorage`; no network requests to a live API observable
- Hosting platform: GitHub Pages (static only — cannot serve API endpoints)

**Scope:** API tests are **PREPARED but NOT EXECUTED** against the current deployment.

---

## Expected API Architecture (Based on Application Behavior)

| Endpoint | Method | Description | Auth Required |
|---|---|---|---|
| `/auth/login` | POST | Authenticate user/admin; returns JWT | No |
| `/auth/register` | POST | Register new user | No |
| `/auth/logout` | POST | Invalidate session | Yes |
| `/slots` | GET | Get all parking slots with status | Yes |
| `/slots?location=gachibowli` | GET | Filter slots by location | Yes |
| `/slots/{slotId}` | GET | Get specific slot details | Yes |
| `/bookings` | POST | Create new parking booking | Yes |
| `/bookings/my` | GET | Get logged-in user's booking history | Yes |
| `/bookings/{bookingId}` | GET | Get specific booking details | Yes |
| `/bookings/{bookingId}/cancel` | POST | Cancel a booking | Yes |
| `/admin/slots` | GET | Admin: get all slots | Admin only |
| `/admin/slots/{slotId}` | PATCH | Admin: update slot status | Admin only |
| `/admin/analytics` | GET | Admin: get analytics data | Admin only |
| `/admin/bookings` | GET | Admin: get all bookings | Admin only |

---

## Postman Collection

A Postman collection with the expected API contracts, request/response shapes, and assertions is available at:

`api-tests/postman-collection.json`

Import into Postman, update the `baseUrl` environment variable to the actual backend URL, and execute.

---

## API Testing Strategy (For Live Backend)

### Authentication API Tests
1. **Positive:** Login with valid user → expect `200`, JWT token, role
2. **Positive:** Login with valid admin → expect `200`, JWT, `ROLE_ADMIN`
3. **Negative:** Invalid credentials → expect `401`
4. **Negative:** Empty fields → expect `400`
5. **Security:** SQL injection in email → expect `400` or sanitized error

### Slots API Tests
1. **Positive:** GET /slots → expect `200`, array of slot objects
2. **Positive:** Filter by location → expect filtered results
3. **Negative:** No auth token → expect `401`
4. **Validation:** Slot status field should be one of `AVAILABLE|RESERVED|OCCUPIED`
5. **Response time:** Should be < 2000ms

### Booking API Tests
1. **Positive:** Create booking with valid data → expect `201`, `TOKEN-*` format
2. **Negative:** Empty vehicle number → expect `400` with vehicle error message
3. **Negative:** Duration = 0 → expect `400`
4. **Negative:** Reserved slot booking → expect `409 Conflict`
5. **Security:** No auth → expect `401`

### Admin API Tests
1. **Positive:** Admin GET /admin/analytics → expect `200`
2. **Security:** Regular user token on admin endpoint → expect `403 Forbidden`
3. **Security:** No token on admin endpoint → expect `401`

---

## How to Execute When Backend is Available

```bash
# Install Newman (Postman CLI runner)
npm install -g newman

# Run the collection
newman run api-tests/postman-collection.json \
  --environment api-tests/environment.json \
  --reporters cli,html \
  --reporter-html-export api-tests/api-test-report.html
```
