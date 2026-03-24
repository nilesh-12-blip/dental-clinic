// ============================================
//   PEARLSMILE DENTAL CLINIC — app.js
//   ✅ Silent Email Notification via EmailJS
//   Patient books → Email goes to admin automatically
//   No manual step. No backend needed.
// ============================================

// ============================================================
//   🔧 CONFIGURATION — FILL THESE 4 VALUES, NOTHING ELSE
// ============================================================

const EMAILJS_PUBLIC_KEY  = 'vbCf5EF7YCcrf10pZ';
// 👆 From EmailJS → Account → API Keys

const EMAILJS_SERVICE_ID  = 'service_wspz6yw';
// 👆 From EmailJS → Email Services → your service

const EMAILJS_TEMPLATE_ID = 'template_dxwjj5u';
// 👆 From EmailJS → Email Templates → your template

const ADMIN_EMAIL         = 'nileshnamdev965@gmail.com';
// 👆 The Gmail where booking notifications will arrive

const CLINIC_NAME         = 'PearlSmile Dental Clinic';
// 👆 Change to actual clinic name when selling

// ============================================================
//   EMAILJS INITIALISE
//   (runs once when page loads)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS ready');
  } else {
    console.warn('⚠️ EmailJS not loaded — check script tag in index.html');
  }
});

// ============================================================
//   🔥 SILENT EMAIL TO ADMIN FUNCTION
//   Called after every successful booking
//   Patient sees nothing — email goes directly to admin Gmail
// ============================================================
function sendEmailNotification(appt) {

  // Format date nicely: "Monday, 15 April 2025"
  let niceDate = appt.date;
  try {
    niceDate = new Date(appt.date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) {}

  // These names must match your EmailJS template variables exactly
  const templateParams = {
    to_email:      ADMIN_EMAIL,
    patient_name:  appt.name,
    patient_phone: appt.phone,
    patient_email: appt.email  || 'Not provided',
    patient_age:   appt.age    || 'Not provided',
    service:       appt.service,
    doctor:        appt.doctor,
    date:          niceDate,
    time:          appt.time,
    message:       appt.message || 'No additional message',
    booking_id:    appt.id,
    booked_at:     new Date().toLocaleString('en-IN'),
  };

  // Send email silently — patient sees nothing
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      console.log('✅ Email notification sent to admin');
    })
    .catch((error) => {
      // Silent fail — patient experience not affected
      console.error('❌ Email failed:', error);
    });
}

// ============================================================
//   DATABASE (localStorage)
// ============================================================
const DB = {
  getAppointments() {
    return JSON.parse(localStorage.getItem('ps_appointments') || '[]');
  },
  saveAppointment(appt) {
    const list = this.getAppointments();
    appt.id = 'APT-' + Date.now();
    appt.status = 'Pending';
    appt.createdAt = new Date().toISOString();
    list.push(appt);
    localStorage.setItem('ps_appointments', JSON.stringify(list));
    return appt.id;
  },
  getReviews() {
    return JSON.parse(
      localStorage.getItem('ps_reviews') || JSON.stringify(defaultReviews)
    );
  },
  saveReview(rev) {
    const list = this.getReviews();
    rev.id = 'REV-' + Date.now();
    rev.date = new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    list.unshift(rev);
    localStorage.setItem('ps_reviews', JSON.stringify(list));
  },
  updateAppointmentStatus(id, status, notes = '') {
    const list = this.getAppointments();
    const appt = list.find(a => a.id === id);
    if (appt) {
      appt.status = status;
      appt.adminNotes = notes;
      appt.updatedAt = new Date().toISOString();
    }
    localStorage.setItem('ps_appointments', JSON.stringify(list));
  }
};

// ============================================================
//   DEFAULT REVIEWS
// ============================================================
const defaultReviews = [
  {
    id: 'r1', name: 'Riya Joshi', treatment: 'Teeth Whitening', rating: 5,
    text: 'Amazing experience! Dr. Priya is so skilled and gentle. My teeth are now 4 shades whiter. The clinic is spotless and the staff is incredibly friendly.',
    date: '12 Jan 2025', initials: 'RJ'
  },
  {
    id: 'r2', name: 'Sanjay Patel', treatment: 'Dental Implants', rating: 5,
    text: 'Had implants done by Dr. Mehta. The procedure was completely painless and the results look absolutely natural. Highly recommend this clinic!',
    date: '8 Feb 2025', initials: 'SP'
  },
  {
    id: 'r3', name: 'Ananya Deshmukh', treatment: 'Orthodontics', rating: 5,
    text: 'Dr. Rahul aligned my teeth perfectly with clear aligners. 14 months and my smile is transformed. Best dental investment I\'ve ever made!',
    date: '3 Mar 2025', initials: 'AD'
  },
  {
    id: 'r4', name: 'Vikram Nair', treatment: 'Root Canal', rating: 5,
    text: 'I was terrified of root canals but the team here was so reassuring. Zero pain during and after. Wish I had come sooner!',
    date: '20 Feb 2025', initials: 'VN'
  },
  {
    id: 'r5', name: 'Priya Sharma', treatment: 'General Checkup', rating: 5,
    text: 'Excellent clinic! Dr. Sneha is wonderful with my kids. They actually look forward to dental visits now. Clean environment, modern equipment.',
    date: '15 Mar 2025', initials: 'PS'
  },
  {
    id: 'r6', name: 'Rahul Gupta', treatment: 'Cosmetic Dentistry', rating: 5,
    text: 'Got veneers done and I can\'t stop smiling. The attention to detail is outstanding. Staff is professional and caring throughout.',
    date: '1 Apr 2025', initials: 'RG'
  },
];

// ============================================================
//   SERVICE DATA
// ============================================================
const serviceData = {
  general: {
    icon: '🦷', title: 'General Dentistry', price: 'Starting from ₹500',
    desc: 'Comprehensive preventive and restorative care to maintain optimal oral health.',
    points: ['Full oral examination & X-rays','Professional teeth cleaning','Tooth-colored fillings','Tooth extractions','Fluoride treatment & sealants','Night guards for bruxism','Oral cancer screening']
  },
  cosmetic: {
    icon: '✨', title: 'Cosmetic Dentistry', price: 'Starting from ₹3,000',
    desc: 'Transform your smile with cutting-edge aesthetic dental treatments.',
    points: ['Teeth whitening (Zoom/laser)','Porcelain veneers & laminates','Composite bonding','Smile makeover design','Tooth reshaping','Gum contouring','Digital smile preview']
  },
  ortho: {
    icon: '😁', title: 'Orthodontics', price: 'Starting from ₹18,000',
    desc: 'Straighten teeth and correct bite issues with modern orthodontic treatments.',
    points: ['Metal & ceramic braces','Invisible/clear aligners','Lingual braces','Space maintainers','Myofunctional appliances','Fixed & removable retainers','Free 3D treatment preview']
  },
  implants: {
    icon: '🔩', title: 'Dental Implants', price: 'Starting from ₹25,000',
    desc: 'Permanent natural-looking tooth replacement using titanium implants.',
    points: ['Single tooth implants','Multiple implants (bridge)','Full arch implants (All-on-4/6)','Immediate loading implants','Mini implants','Implant-supported dentures','Computer-guided surgery']
  },
  root: {
    icon: '💊', title: 'Root Canal Therapy', price: 'Starting from ₹3,500',
    desc: 'Pain-free root canal using advanced rotary endodontics to save infected teeth.',
    points: ['Single & multi-canal treatment','Rotary endodontic systems','Apex locator technology','Biocompatible filling materials','Single-sitting root canals','Root canal retreatment','Post & core restorations']
  },
  pedo: {
    icon: '👶', title: 'Pediatric Dentistry', price: 'Starting from ₹400',
    desc: 'Gentle child-friendly dental care in a comfortable anxiety-free environment.',
    points: ['First dental visit (6–12 months)','Baby tooth extractions','Pit & fissure sealants','Fluoride applications','Space maintainers','Habit-breaking appliances','Dental emergencies for kids']
  },
  perio: {
    icon: '🩺', title: 'Periodontics', price: 'Starting from ₹1,500',
    desc: 'Comprehensive gum disease treatment to preserve your natural teeth.',
    points: ['Periodontal screening','Scaling & root planing','Gum surgery (flap surgery)','Bone grafting','Crown lengthening','Gingival grafting','Laser gum treatment']
  },
  emergency: {
    icon: '🚨', title: 'Emergency Dentistry', price: 'Consultation: ₹300',
    desc: 'Same-day emergency appointments because dental emergencies don\'t wait.',
    points: ['Severe toothache relief','Broken or chipped teeth','Knocked-out teeth','Lost fillings or crowns','Dental abscess drainage','Soft tissue injuries','Emergency extractions']
  }
};

// ============================================================
//   HERO SLIDER
// ============================================================
let currentSlide = 0;
const totalSlides = 4;
let sliderInterval;

function initSlider() {
  const dots = document.getElementById('sliderDots');
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dots.appendChild(dot);
  }
  startAutoplay();
}

function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  document.getElementById('slidesWrapper').style.transform =
    `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentSlide)
  );
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
  resetAutoplay();
}

function startAutoplay() {
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoplay() {
  clearInterval(sliderInterval);
  startAutoplay();
}

// ============================================================
//   NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    const sections = ['home','about','services','doctors','reviews','contact'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    links.forEach(l =>
      l.classList.toggle('active', l.getAttribute('href') === '#' + current)
    );
  });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () =>
    document.getElementById('navLinks').classList.remove('open')
  );
});

// ============================================================
//   BOOKING MODAL OPEN / CLOSE
// ============================================================
function openBooking() {
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('patDate').min = today;
}

function closeBooking() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================
//   ✅ SUBMIT BOOKING
//   1. Saves to localStorage
//   2. Shows success toast to patient
//   3. Silently emails admin — patient sees nothing
// ============================================================
function submitBooking(e) {
  e.preventDefault();

  // Collect form data
  const appt = {
    name:    document.getElementById('patName').value.trim(),
    phone:   document.getElementById('patPhone').value.trim(),
    email:   document.getElementById('patEmail').value.trim(),
    age:     document.getElementById('patAge').value.trim(),
    service: document.getElementById('patService').value,
    doctor:  document.getElementById('patDoctor').value || 'Any Available',
    date:    document.getElementById('patDate').value,
    time:    document.getElementById('patTime').value,
    message: document.getElementById('patMessage').value.trim(),
  };

  // Save to localStorage (admin panel still works)
  const id = DB.saveAppointment(appt);
  appt.id = id;

  // Close modal and reset form
  closeBooking();
  document.getElementById('bookingForm').reset();

  // Show success to patient
  showToast(`✅ Appointment confirmed! Your ID: ${id}`);

  // 🔥 Silently send email to admin — no action needed from patient
  sendEmailNotification(appt);
}

// ============================================================
//   REVIEW MODAL
// ============================================================
let selectedRating = 0;

function openReviewModal() {
  document.getElementById('reviewModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  initStarRating();
}

function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('active');
  document.body.style.overflow = '';
}

function initStarRating() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(s => {
    s.addEventListener('mouseover', () => highlightStars(+s.dataset.val));
    s.addEventListener('mouseout',  () => highlightStars(selectedRating));
    s.addEventListener('click', () => {
      selectedRating = +s.dataset.val;
      document.getElementById('revRating').value = selectedRating;
      highlightStars(selectedRating);
    });
  });
}

function highlightStars(n) {
  document.querySelectorAll('.star').forEach(s =>
    s.classList.toggle('active', +s.dataset.val <= n)
  );
}

function submitReview(e) {
  e.preventDefault();
  if (!selectedRating) { showToast('⚠️ Please select a rating', 'error'); return; }
  const rev = {
    name:      document.getElementById('revName').value,
    treatment: document.getElementById('revTreatment').value,
    rating:    selectedRating,
    text:      document.getElementById('revText').value,
    initials:  document.getElementById('revName').value
                 .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
  };
  DB.saveReview(rev);
  closeReviewModal();
  selectedRating = 0;
  renderReviews();
  showToast('🙏 Thank you for your review!');
}

// ============================================================
//   RENDER REVIEWS
// ============================================================
function renderReviews() {
  const reviews = DB.getReviews().slice(0, 6);
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <div class="review-header">
        <div class="review-avatar">${r.initials}</div>
        <div class="review-meta">
          <h4>${r.name}</h4>
          <span>${r.date || 'Recently'}</span>
        </div>
      </div>
      <div class="review-stars">${'⭐'.repeat(r.rating)}</div>
      <p class="review-text">${r.text}</p>
      <p class="review-treatment">🦷 ${r.treatment}</p>
    </div>
  `).join('');
  observeReveal();
}

// ============================================================
//   SERVICE MODAL
// ============================================================
function openServiceModal(key) {
  const s = serviceData[key];
  if (!s) return;
  document.getElementById('serviceModalContent').innerHTML = `
    <div class="service-detail">
      <span class="service-detail-icon">${s.icon}</span>
      <h2>${s.title}</h2>
      <p>${s.desc}</p>
      <ul>${s.points.map(p => `<li>${p}</li>`).join('')}</ul>
      <div class="service-price">💰 ${s.price}</div><br/>
      <button class="btn-primary full-width"
        onclick="closeServiceModal();openBooking()">
        Book This Treatment
      </button>
    </div>
  `;
  document.getElementById('serviceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  document.getElementById('serviceModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================
//   TOAST
// ============================================================
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = type === 'error' ? '#E53E3E' : 'var(--teal)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ============================================================
//   NEWSLETTER
// ============================================================
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showToast('⚠️ Enter a valid email', 'error');
    return;
  }
  showToast('✅ Subscribed! Thanks for joining us.');
  document.getElementById('newsletterEmail').value = '';
}

// ============================================================
//   SCROLL REVEAL
// ============================================================
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initReveal() {
  document.querySelectorAll(
    '.service-card, .doctor-card, .contact-item, .feat, .stat'
  ).forEach(el => el.classList.add('reveal'));
  observeReveal();
}

// ============================================================
//   CLOSE MODALS ON OVERLAY CLICK
// ============================================================
['bookingModal', 'reviewModal', 'serviceModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ============================================================
//   INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initNavbar();
  renderReviews();
  initReveal();
});
