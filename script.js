/* ─────────────────────────────────────────
   NUTRIVÈ  |  script.js
   - Scroll arrow
   - Scroll-driven two-phase date animation
   - Canvas particle system
───────────────────────────────────────── */

// ── SCROLL ARROW ──
document.getElementById('scrollArrow').addEventListener('click', () => {
  document.getElementById('ingredients-scroll-container')
    .scrollIntoView({ behavior: 'smooth' });
});

// ── SCROLL-DRIVEN TWO-PHASE DATE ANIMATION ──
const scrollContainer = document.getElementById('ingredients-scroll-container');
const dateWrap        = document.getElementById('dateVisual');
const ingredientText  = document.getElementById('ingredientText');
const spotlight       = document.querySelector('.date-spotlight');

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function onScroll() {
  const rect        = scrollContainer.getBoundingClientRect();
  // Scroll room = container height minus the pinned section (never 0)
  const totalScroll = Math.max(scrollContainer.offsetHeight - window.innerHeight, 1);

  // progress: 0 when container top hits viewport top, 1 when fully scrolled
  const progress = clamp(-rect.top / totalScroll, 0, 1);

  // Phase 1: 0.0 → 0.5  — date peeks in from left edge, text fades in
  // Phase 2: 0.5 → 1.0  — date glides into spotlight center, glow intensifies
  const phase1 = easeInOut(clamp(progress / 0.5, 0, 1));
  const phase2 = easeInOut(clamp((progress - 0.5) / 0.5, 0, 1));

  // ── Date position ──
  // Phase 1: -110% (fully off-screen) → -18% (just peeking at left edge)
  // Phase 2: -18% → 0% (fully inside left column)
  const dateX = lerp(lerp(-110, -18, phase1), 0, phase2);

  // ── Date opacity ──
  // Phase 1: 0 → 0.55 (partially visible at edge)
  // Phase 2: 0.55 → 1 (fully visible in spotlight)
  const dateOpacity = lerp(lerp(0, 0.55, phase1), 1, phase2);

  // ── Spotlight glow ── only blooms in phase 2
  const spotlightOpacity = phase2;

  // ── Text ── fades up during phase 1, stays at full in phase 2
  const textOpacity = phase1;
  const textY       = lerp(32, 0, phase1);

  // Apply to DOM
  dateWrap.style.transform  = `translateX(${dateX}%)`;
  dateWrap.style.opacity    = dateOpacity;
  spotlight.style.opacity   = spotlightOpacity;
  ingredientText.style.opacity   = textOpacity;
  ingredientText.style.transform = `translateY(${textY}px)`;
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
  const section = document.getElementById('ingredients');
  canvas.width  = section.offsetWidth;
  canvas.height = section.offsetHeight;
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
