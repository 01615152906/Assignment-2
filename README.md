




#  Vehicle Rental System (Backend API)

A complete backend system for managing vehicle rentals with authentication, role-based access, bookings, users, and vehicles.

---

## Live Deployment
> **URL:** https://assignment-2-ten-gamma.vercel.app/

 **URL:** https://assignment-2-m9lrgbyja-01615152906s-projects.vercel.app/
(Replace with your deployed  Vercel Backend URL)

---

## GitHub Repository
> **Repo Link:** https://github.com/01615152906/Assignment-2 


(Replace with your actual GitHub repo link)

---

#  Project Features

###  Authentication & Authorization
- User Registration & Login (JWT)
- Password hashing using bcrypt
- Role-based access: `admin`, `customer`
- Protected routes with custom auth middleware

---

### Vehicle Management (Admin Only)
- Create Vehicle
- Update Vehicle
- Delete Vehicle (only if no active bookings)
- Get All Vehicles
- Get Vehicle by ID

---

###  User Management
- Get All Users (Admin)
- Get User By ID
- Update User
- Delete User (if no active bookings)

---

### Booking Management
- Create Booking  
- Auto price calculation = `days × daily_rent_price`
- Vehicle availability update  
- Get All Bookings  
  - Admin → all bookings  
  - Customer → only their bookings
- Update Booking:
  - Customer → cancel  
  - Admin → mark as returned

---

### Automatic Business Logic
- Auto-return vehicle after rental end-date
- Validation & error handling
- Database relationship constraints

---

# Technology Stack

| Category | Tech |
|---------|------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| ORM | pg (native PostgreSQL client) |
| Deployment | Render / Railway / Vercel |

---


# Install Dependencies
npm install




 # Create .env File
* PORT=5000

* DB_HOST=localhost

* CONNECTION_STR=postgresql://neondb_owner:npg_vdjwFrEZlQ15@ep-royal-brook-adpri2k5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

* JWT_SECRET=KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30

* JWT_EXPIRY=7d