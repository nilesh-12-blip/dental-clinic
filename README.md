# 🦷 PearlSmile Dental Clinic — Full Stack Website

A complete, production-ready dental clinic website with:
- **Modern animated hero slider** (4 slides with dental-themed illustrations)
- **All sections**: Home, About, Services, Doctors, Reviews, Contact
- **Appointment booking system** with patient data collection
- **Patient review system** (post-treatment)
- **Admin dashboard** with full appointment management
- **REST API backend** (Node.js + Express)

---

## 📁 Project Structure

```
dental-clinic/
├── frontend/
│   ├── index.html       ← Main website
│   ├── style.css        ← All website styles
│   ├── app.js           ← Website JavaScript
│   ├── admin.html       ← Admin dashboard
│   ├── admin.css        ← Admin styles
│   └── admin.js         ← Admin JavaScript
└── backend/
    ├── server.js        ← Express REST API
    ├── package.json     ← Dependencies
    └── data/            ← JSON database (auto-created)
        ├── appointments.json
        ├── reviews.json
        └── newsletter.json
```

---

## 🚀 Setup & Run

### Option A — Frontend Only (No server needed)
Just open `frontend/index.html` in your browser.
Data is stored in browser `localStorage`.

### Option B — Full Stack (Recommended)

**Requirements:** Node.js 16+

```bash
# 1. Navigate to backend
cd dental-clinic/backend

# 2. Install dependencies
npm install

# 3. Start the server
npm start
# OR for development with auto-reload:
npm run dev
```

**Then open:**
- 🌐 Website: http://localhost:3000
- 🛡️ Admin Panel: http://localhost:3000/admin

---

## 🔐 Admin Login

| Field    | Value        |
|----------|--------------|
| Username | `admin`      |
| Password | `dental2025` |

---

## 📡 REST API Endpoints

### Appointments
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/appointments           | Get all appointments     |
| GET    | /api/appointments/:id       | Get single appointment   |
| POST   | /api/appointments           | Book new appointment     |
| PATCH  | /api/appointments/:id       | Update status/notes      |
| DELETE | /api/appointments/:id       | Delete appointment       |

### Reviews
| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| GET    | /api/reviews   | Get all reviews    |
| POST   | /api/reviews   | Submit new review  |

### Other
| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | /api/stats        | Dashboard stats     |
| POST   | /api/newsletter   | Newsletter subscribe|
| POST   | /api/admin/login  | Admin authentication|

### Example: Book Appointment via API
```json
POST /api/appointments
{
  "name": "Riya Joshi",
  "phone": "+91 98765 43210",
  "email": "riya@example.com",
  "age": "28",
  "service": "Teeth Whitening",
  "doctor": "Dr. Priya Sharma",
  "date": "2025-05-15",
  "time": "10:00 AM",
  "message": "Please ensure painless procedure"
}
```

---

## ✨ Features

### Patient Website
- ✅ Hero slider with 4 animated slides (auto-plays every 5s)
- ✅ About section with clinic info and credentials
- ✅ 8 service cards with detailed modals
- ✅ 4 doctor profiles with specializations
- ✅ Patient reviews (live from localStorage/API)
- ✅ Contact info with working hours
- ✅ Appointment booking modal (full form)
- ✅ Review submission modal with star rating
- ✅ Newsletter subscription
- ✅ Floating "Book" button
- ✅ Scroll animations
- ✅ Fully responsive (mobile-first)

### Admin Dashboard
- ✅ Secure login (admin / dental2025)
- ✅ Overview with KPI cards & charts
- ✅ Today's appointments at a glance
- ✅ Services popularity bar chart
- ✅ Appointments table with filters & search
- ✅ Status management (Pending → Confirmed → Completed)
- ✅ Admin notes per appointment
- ✅ Patient register (unique patients from bookings)
- ✅ Reviews management view

---

## 🎨 Design

- **Color scheme**: Deep teal + cream + gold accents
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Style**: Luxury medical — professional yet warm
- **Animations**: CSS keyframes, IntersectionObserver reveals

---

## 🛠️ Customization

### Change clinic details:
Edit `frontend/index.html`:
- Clinic name, address, phone, email
- Doctor names and specializations
- Service pricing (in `app.js` → `serviceData`)

### Change admin password:
Edit `backend/server.js`:
```js
// Line ~130:
if (username === 'admin' && password === 'dental2025') {
```

### Add real images:
Replace dental art illustrations with `<img>` tags pointing to your photos.

---

## 📦 Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS     |
| Backend   | Node.js, Express.js         |
| Database  | JSON files (easily swap to MongoDB/MySQL) |
| Fonts     | Google Fonts (Playfair + DM Sans) |
| Hosting   | Any Node.js host (Render, Railway, VPS) |
