// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu on link click
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll(
  '.greeting-content, .service-card, .work-card, .other-works, .company-table-wrap, .map-wrap, .number-item, .contact-tel, .recruit-banner-btn'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    header.style.background = 'rgba(26, 35, 50, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
  } else {
    header.style.background = 'rgba(26, 35, 50, 0.95)';
    header.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
});

// ==================== CONTACT FORM → GOOGLE FORMS ====================
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdo-xRHJMhDX-nMQB8ozPH_SmfccnRENehyrK-aVkceH-E4Fg/formResponse';

const ENTRY_MAP = {
  company: 'entry.153013803',
  name:    'entry.1657740942',
  tel:     'entry.693857129',
  email:   'entry.1189458205',
  message: 'entry.190337125'
};

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append(ENTRY_MAP.company, this.company.value);
  formData.append(ENTRY_MAP.name, this.name.value);
  formData.append(ENTRY_MAP.tel, this.tel.value);
  formData.append(ENTRY_MAP.email, this.email.value);
  formData.append(ENTRY_MAP.message, this.message.value);

  const btn = this.querySelector('.form-btn');
  btn.textContent = '送信中...';
  btn.disabled = true;

  fetch(GOOGLE_FORM_URL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    formMessage.textContent = 'お問い合わせありがとうございます。送信が完了しました。';
    formMessage.style.color = '#c9a84c';
    contactForm.reset();
    btn.textContent = '送信する';
    btn.disabled = false;
  }).catch(() => {
    formMessage.textContent = '送信に失敗しました。お電話にてお問い合わせください。';
    formMessage.style.color = '#e74c3c';
    btn.textContent = '送信する';
    btn.disabled = false;
  });
});

// ==================== SMOOTH SCROLL (FALLBACK) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
