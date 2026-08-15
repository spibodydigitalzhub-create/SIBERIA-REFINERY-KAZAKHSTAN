/* ========== SIBERIA REFINERY - MAIN JAVASCRIPT ========== */

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else if (window.scrollY < 30) {
    navbar.classList.remove('scrolled');
  }
  
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    if (window.scrollY > 500) scrollTop.classList.add('show');
    else scrollTop.classList.remove('show');
  }
});

// ===== MOBILE MENU =====
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentSlide = 0;
let slideIntervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlideFunc() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlideFunc() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startSlider() {
  slideIntervalId = setInterval(nextSlideFunc, 7000);
}

function resetSlider() {
  clearInterval(slideIntervalId);
  startSlider();
}

if (nextSlide) nextSlide.addEventListener('click', () => { nextSlideFunc(); resetSlider(); });
if (prevSlide) prevSlide.addEventListener('click', () => { prevSlideFunc(); resetSlider(); });
if (slides.length > 1) startSlider();

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, duration / steps);
  });
}

// Trigger counters on scroll
const statsSection = document.querySelector('.stats-section');
if (statsSection && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ===== TESTIMONIAL SLIDER =====
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;
let testimonialIntervalId;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
    clearInterval(testimonialIntervalId);
    startTestimonialAuto();
  });
});

function startTestimonialAuto() {
  testimonialIntervalId = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 8000);
}

if (testimonials.length > 0) startTestimonialAuto();

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== REVEAL ON SCROLL =====
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log('Form submission:', data);
    
    // Success message
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully';
    btn.style.background = 'var(--gold)';
    btn.disabled = true;
    
    setTimeout(() => {
      this.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// ===== ACTIVE NAV LINK =====
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }
});

console.log('Siberia Refinery Loaded Successfully | Built by Spibody Digitalz Hub');
