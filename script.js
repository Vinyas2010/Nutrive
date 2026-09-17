/* ─────────────────────────────────────────
   NUTRIVÈ  |  script.js
   - Scroll arrow
   - Slide 2: date peeks in half-way at the left edge
   - Slide 3: date glides from half to fully visible
   - Canvas particle system
───────────────────────────────────────── */

// ── SCROLL ARROW ──
document.getElementById('scrollArrow').addEventListener('click', () => {
  document.getElementById('ingredient-teaser')
    .scrollIntoView({ behavior: 'smooth' });
});

// ── ELEMENTS ──
const teaserSection      = document.getElementById('ingredient-teaser');
const teaserDate         = document.getElementById('teaserDate');
const teaserText         = document.getElementById('teaserText');

const ingredientsSection = document.getElementById('ingredients');
const dateWrap           = document.getElementById('dateVisual');
const ingredientText     = document.getElementById('ingredientText');
const spotlight          = document.querySelector('.date-spotlight');

// ── HELPERS ──
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// 0 when the section's top is at the bottom of the viewport,
// 1 when the section's top reaches the top of the viewport (fully in view)
function enterProgress(section) {
  const rect = section.getBoundingClientRect();
  return clamp((window.innerHeight - rect.top) / window.innerHeight, 0, 1);
}

// ── SCROLL-DRIVEN ANIMATIONS ──
function onScroll() {
  /* Slide 2: date slides in from off-screen and stops half visible */
  const p2 = easeInOut(enterProgress(teaserSection));

  const teaserX = lerp(-110, -50, p2);   // -50% = exactly half hidden
  teaserDate.style.transform = `translate(${teaserX}%, -50%)`;
  teaserDate.style.opacity   = p2;

  teaserText.style.opacity   = p2;
  teaserText.style.transform = `translateY(${lerp(32, 0, p2)}px)`;

  /* Slide 3: date moves from half-way left to centre, glow blooms, text fades up */
  const p3 = easeInOut(enterProgress(ingredientsSection));

  dateWrap.style.transform = `translateX(${lerp(-50, 0, p3)}%)`;
  dateWrap.style.opacity   = lerp(0.5, 1, p3);
  spotlight.style.opacity  = p3;

  ingredientText.style.opacity   = p3;
  ingredientText.style.transform = `translateY(${lerp(32, 0, p3)}px)`;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // initialise on load

// ── PARTICLE SYSTEM ──
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let particles   = [];
let animFrameId;

const PARTICLE_COLORS = [
  [253, 213, 105], // champagne-gold
  [238, 165,  61], // warm-gold
  [204, 131,  43], // golden-amber
  [161,  97,  29], // burnished-gold
  [124,  71,  18], // caramel
];

function resizeCanvas() {
  canvas.width  = ingredientsSection.offsetWidth;
  canvas.height = ingredientsSection.offsetHeight;
}

class Particle {
  constructor(stagger = false) {
    this.reset(stagger);
  }

  reset(initial = false) {
    this.x           = Math.random() * canvas.width;
    this.y           = initial
                         ? Math.random() * canvas.height
                         : canvas.height + 5;
    this.size        = Math.random() * 2.2 + 0.4;
    this.speedX      = (Math.random() - 0.5) * 0.35;
    this.speedY      = -(Math.random() * 0.55 + 0.15);
    this.life        = 0;
    this.maxLife     = Math.random() * 220 + 80;
    this.color       = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.baseOpacity = Math.random() * 0.55 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife || this.y < -5) this.reset();
  }

  draw() {
    const alpha = this.baseOpacity * Math.sin((this.life / this.maxLife) * Math.PI);
    const [r, g, b] = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 130; i++) {
    particles.push(new Particle(true));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animFrameId = requestAnimationFrame(animate);
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    cancelAnimationFrame(animFrameId);
    resizeCanvas();
    initParticles();
    animate();
    onScroll(); // recalculate animation state after resize
  }, 150);
});

resizeCanvas();
initParticles();
animate();
