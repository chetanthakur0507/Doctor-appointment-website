# 🩺 Doctor Appointment Booking Platform 🩺

A full-stack web application for booking doctor appointments online.

Patients can browse doctors, book appointments and pay online. Doctors manage their schedules, patients and prescriptions from a dedicated dashboard. Admins control the whole platform — users, doctors and all appointments.

**🔗 Live Demo:** https://doctor-appointment-website-three.vercel.app/

---

## ✨ Features

### 👤 Patient Portal
- **Account management** — secure signup / login (JWT + bcrypt password hashing)
- **Find a doctor** — doctor directory with specialties, search and filters; doctor detail pages
- **Book appointments** — pick doctor, date and time slot
- **Appointment history** — upcoming & past appointments; cancel scheduled ones
- **Patient profile** — personal details + medical notes, visible to doctors
- **Prescriptions** — view / download prescriptions uploaded by the doctor
- Personal dashboard with booking summary

### 👨‍⚕️ Doctor Portal
- **Secure doctor login** and full profile management (bio, qualifications, fees, availability)
- **Schedule dashboard** — daily appointment list at a glance
- **Accept / reject** appointment requests
- **Patient records** — patient list with individual patient detail pages
- **Prescription upload** — attach prescriptions to completed appointments
- **Availability control** — manage bookable days and time slots

### 🛠️ Admin Panel
- **Dashboard** with platform statistics
- **Manage users** — view, edit, remove patient accounts
- **Manage doctors** — add, edit, remove doctor profiles
- **Manage appointments** — monitor every appointment across the platform

### 🌐 Public Website
- Marketing homepage: hero, specialties, services, how-it-works, featured doctors, testimonials, health tips, stats, emergency contact, newsletter, CTA sections
- **Departments page** — browse by medical specialty
- **Blogs** — health articles with individual article pages
- **FAQs, Help, Contact, Privacy Policy, Terms** pages
- **Live chat widget** for visitor queries
- Newsletter signup (Nodemailer-powered contact system)

### 📱 Progressive Web App (PWA)
- Installable on mobile and desktop (icons 96 / 192 / 512 px + maskable variants)
- App-like experience with offline-capable service worker (next-pwa + Workbox)
- Fast, fully responsive UI (Tailwind CSS)

---

## 🔄 How It Works

**Booking flow**
1. Patient register / login
2. Browses doctors or departments → opens a doctor's profile
3. Selects date & time slot → books appointment
4. Appointment status: `booked` → `completed` / `cancelled`
   (online payment via Razorpay is planned as a future enhancement)

**After the visit** — the doctor uploads the prescription; the patient sees it on their dashboard and appointment detail page.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router, React 18) |
| Styling | Tailwind CSS, React Icons |
| Backend | Next.js API Routes — 20+ REST endpoints |
| Database | MongoDB + Mongoose ODM |
| Authentication | JWT (30-day tokens, HTTP-only cookies) + bcryptjs |
| Payments | Razorpay — planned (see Future Improvements) |
| Email | Nodemailer (contact form / notifications) |
| PWA | next-pwa, Workbox, generated icon set |
| Deployment | Vercel |

---

## 🔐 Security
- Passwords hashed with **bcrypt** (10 salt rounds)
- **JWT session tokens** (30-day expiry) in secure HTTP-only cookies
- **Role-based access control** — Patient / Doctor / Admin routes protected server-side

---

## 📄 Pages & Routes

| Area | Pages |
|---|---|
| Public | `/` home, `/Doctors`, `/Doctors/[slug]`, `/departments`, `/blogs`, `/blogs/[id]`, `/faqs`, `/help`, `/contact`, `/privacy`, `/terms`, `/auth/login`, `/auth/register` |
| Patient | `/user/dashboard`, `/user/appointments`, `/user/appointments/book`, `/user/profile` |
| Doctor | `/doctor/dashboard`, `/doctor/patients`, `/doctor/patients/[id]`, `/doctor/profile` |
| Admin | `/admin/dashboard`, `/admin/users`, `/admin/doctors`, `/admin/appointments`, `/admin/login` |

## 🔌 API Endpoints

| Group | Endpoints |
|---|---|
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout` |
| Appointments (patient) | `GET/POST /api/appointments`, `GET/PATCH/DELETE /api/appointments/[id]` |
| Doctors | `GET /api/doctors`, `GET /api/doctors/[id]` |
| Doctor portal | `GET/PATCH /api/doctor/profile`, `GET/PATCH /api/doctor/appointments`, `POST /api/doctor/appointments/[id]/prescription`, `GET /api/doctor/patients/[id]` |
| User | `GET/PATCH /api/user/profile` |
| Payments (planned) | `POST /api/payments/razorpay` (create order), `POST /api/payments/verify` (verify signature) |
| Admin | `GET/PATCH/DELETE /api/admin/users`, `/api/admin/appointments` |
| Contact | `POST /api/contact` (Nodemailer) |
| Seed | `/api/seed-doctors` (sample data) |

## 🗄️ Data Models

| Model | Key fields |
|---|---|
| **User** | name, email, phone, password (hashed), role (`patient` / `doctor` / `admin`), profile details |
| **Doctor** | name, email, phone, specialty, qualifications, experience, fee, availability, profile info |
| **Appointment** | userId, doctorId, date, time, status (`booked` / `completed` / `cancelled`), notes, paymentId, paymentStatus (`pending` / `completed` / `failed`), sessionNumber, prescription (url, name, uploadedAt) |

---

## 📂 Project Structure

```
├── app/                    # Next.js App Router pages + API routes
│   ├── user/               # Patient portal (dashboard, appointments, profile)
│   ├── doctor/             # Doctor portal (dashboard, patients, profile)
│   ├── admin/              # Admin panel (dashboard, users, doctors, appointments)
│   ├── auth/               # Login & registration pages
│   ├── api/                # 20+ REST API endpoints
│   ├── Doctors/            # Public doctor directory + detail pages
│   └── departments/ blogs/ faqs/ help/ contact/  # Public content pages
├── components/             # Reusable UI (Navbar, Hero, RazorpayPayment, …)
├── models/                 # Mongoose schemas (User, Doctor, Appointment)
├── lib/                    # Auth helpers (JWT, bcrypt) + DB connection
├── public/                 # PWA manifest, icons, service worker, assets
└── scripts/                # PWA icon generation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- Razorpay test keys (for payments)

### Installation

```bash
git clone https://github.com/chetanthakur0507/Doctor-appointment-website.git
cd Doctor-appointment-website
npm install
```

Create a `.env` file (see `.env.example`):

```env
# MongoDB connection
MONGO_URI=your_mongodb_connection_string

# JWT secret for auth tokens
JWT_SECRET=<redacted>

# Razorpay keys (payments) — needed once payment integration goes live
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Email (contact form) — Gmail App Password, not regular password
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Site URL (used in email links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then run:

```bash
npm run dev      # development → http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

> 💡 Use `/api/seed-doctors` once after setup to populate sample doctor data.

---

## 🔮 Future Improvements
- **Online payment via Razorpay** — order creation + payment signature verification before confirming appointments
- **AI chatbot integration** — conversational assistant for visitor queries and appointment help
- Video consultation (telemedicine)
- SMS / WhatsApp appointment reminders
- Doctor ratings & reviews
- Multi-language support (Hindi)

---

## 👨‍💻 Author

**Chetan Thakur** — [@chetanthakur0507](https://github.com/chetanthakur0507)

Built as a full-stack project demonstrating real-world web development: authentication, role-based dashboards, online payments, email, PWA and cloud deployment.
