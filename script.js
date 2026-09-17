/* ─────────────────────────────────────────
   NUTRIV È  |  script.js
   - Scroll arrow click
   - Intersection Observer (date slide-in)
   - Canvas particle system
───────────────────────────────────────── */

// ── SCROLL ARROW ──
document.getElementById('scrollArrow').addEventListener('click', () => {
  document.getElementById('ingredients').scrollIntoView({ behavior: 'smooth' });
});

// ── INTERSECTION OBSERVER: Date slide-in animation ──
const dateVisual = document.getElementById('dateVisual');

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      slideObserver.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.25 });

slideObserver.observe(dateVisual);

// ── PARTICLE SYSTEM ──
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animFrameId;

// Brand palette particle colors
const PARTICLE_COLORS = [
  [253, 213, 105], // --champagne-gold
  [238, 165,  61], // --warm-gold
  [204, 131,  43], // --golden-amber
  [161,  97,  29], // --burnished-gold
  [124,  71,  18], // --caramel
];

function resizeCanvas() {
  const section  = document.getElementById('ingredients');
  canvas.width   = section.offsetWidth;
  canvas.height  = section.offsetHeight;
}

class Particle {
  constructor(stagger = false) {
    this.reset(stagger);
  }

  reset(initial = false) {
    this.x           = Math.random() * canvas.width;
    this.y           = initial
                         ? Math.random() * canvas.height   // spread on load
                         : canvas.height + 5;              // rise from bottom
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
    // Sine-curve fade: in at start, out at end
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
    particles.push(new Particle(true)); // stagger initial positions
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animFrameId = requestAnimationFrame(animate);
}

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    cancelAnimationFrame(animFrameId);
    resizeCanvas();
    initParticles();
    animate();
  }, 150);
});

// Init
resizeCanvas();
initParticles();
animate();
