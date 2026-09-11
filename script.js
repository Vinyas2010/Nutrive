// ── Cursor Glow ──────────────────────────────
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ── Scroll Progress Bar ──────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  progressBar.style.transform = `scaleX(${progress})`;
});

// ── Navbar scroll state ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ── Intersection Observer (reveal animations) ─
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Nutrition Ring Animation ──────────────────
const ringFill = document.getElementById('ringFill');
const proteinCounter = document.getElementById('proteinCounter');
let ringAnimated = false;

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !ringAnimated) {
      ringAnimated = true;
      ringFill.classList.add('animated');
      // Animate counter 0 → 25
      let current = 0;
      const target = 25;
      const step = () => {
        current += 1;
        proteinCounter.textContent = current + 'g';
        if (current < target) requestAnimationFrame(step);
      };
      setTimeout(step, 300);
    }
  });
}, { threshold: 0.4 });
ringObserver.observe(document.querySelector('.nutrition-ring'));

// ── Counter Animation ────────────────────────
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      counterObserver.unobserve(el);

      const duration = 2000;
      const start = performance.now();

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(easeOut(progress) * target);

        if (target >= 1000000) {
          el.textContent = (value / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
          el.textContent = (value / 1000).toFixed(1) + 'K';
        } else {
          el.textContent = value;
        }

        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ── Intersection Observer (pop-up image animations) ─
const popItems = document.querySelectorAll('.pop-item');
const popObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('pop-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
popItems.forEach(el => popObserver.observe(el));

// ── Parallax tilt on gallery items ───────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    item.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// ── Parallax tilt on product cards ────────────
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Smooth anchor scrolling ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
