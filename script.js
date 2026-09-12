// ══════════════════════════════════════════════════════════════
// CHOCO FUEL — ULTRA PREMIUM INTERACTIONS
// Advanced animations, smooth effects, and polished interactions
// ══════════════════════════════════════════════════════════════

// ── Smooth Cursor Following (Ultra Enhanced) ─────────────────
const glow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Ultra-smooth cursor glow with advanced easing
function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ── Scroll Progress Bar (Ultra Premium) ────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  progressBar.style.transform = `scaleX(${progress})`;
}, { passive: true });

// ── Navbar scroll state (Advanced) ──────────────────────────
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 80);
  lastScrollY = scrollY;
}, { passive: true });

// ── Intersection Observer (Advanced Reveal) ─────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after revealing for better performance
      // revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Nutrition Ring Animation (Ultra Enhanced) ──────────────
const ringFill = document.getElementById('ringFill');
const proteinCounter = document.getElementById('proteinCounter');
let ringAnimated = false;

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !ringAnimated) {
      ringAnimated = true;
      ringFill.classList.add('animated');

      // Advanced easing animation
      let current = 0;
      const target = 25;
      const duration = 2500;
      const start = performance.now();

      const easeOutQuint = t => 1 - Math.pow(1 - t, 5);

      const animateCounter = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuint(progress);
        current = Math.round(easedProgress * target);
        proteinCounter.textContent = current + 'g';

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        }
      };

      setTimeout(() => requestAnimationFrame(animateCounter), 300);
    }
  });
}, { threshold: 0.4 });

if (document.querySelector('.nutrition-ring')) {
  ringObserver.observe(document.querySelector('.nutrition-ring'));
}

// ── Counter Animation (Ultra Premium) ──────────────────────
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      counterObserver.unobserve(el);

      const duration = 2800;
      const start = performance.now();

      const easeOutExpo = t => 1 - Math.pow(2, -10 * t);

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(easeOutExpo(progress) * target);

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

// ── Pop-up Image Animations (Advanced) ──────────────────────
const popItems = document.querySelectorAll('.pop-item');
const popObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('pop-visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
popItems.forEach(el => popObserver.observe(el));

// ── 3D Tilt Effect on Gallery Items ─────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    item.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.12)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// ── 3D Tilt Effect on Product Cards ─────────────────────────
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 16;
    const rotateY = (centerX - x) / 16;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Smooth Anchor Scrolling ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ── Parallax Scroll Effect ──────────────────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const parallaxElements = document.querySelectorAll('.floating-product-img');

  parallaxElements.forEach((el, index) => {
    const yPos = scrollY * (0.25 + index * 0.08);
    el.style.transform = `translateY(${yPos}px)`;
  });
}, { passive: true });

// ── Product Page Interactions ──────────────────────────────
const flavorBtns = document.querySelectorAll('.flavor-btn');
const productEmoji = document.getElementById('productEmoji');
const productQty = document.getElementById('productQty');
const totalPrice = document.getElementById('totalPrice');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const addToCartBtn = document.getElementById('addToCartBtn');

if (flavorBtns.length > 0) {
  flavorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      flavorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (productEmoji) {
        productEmoji.style.transform = 'rotate(360deg) scale(1.2)';
        productEmoji.textContent = btn.dataset.emoji;
        setTimeout(() => {
          productEmoji.style.transform = 'rotate(0deg) scale(1)';
        }, 600);
      }
    });
  });
}

if (qtyMinus) {
  qtyMinus.addEventListener('click', () => {
    const current = parseInt(productQty.value) || 1;
    if (current > 1) {
      productQty.value = current - 1;
      updatePrice();
    }
  });
}

if (qtyPlus) {
  qtyPlus.addEventListener('click', () => {
    const current = parseInt(productQty.value) || 1;
    if (current < 99) {
      productQty.value = current + 1;
      updatePrice();
    }
  });
}

if (productQty) {
  productQty.addEventListener('input', updatePrice);
}

function updatePrice() {
  const qty = parseInt(productQty.value) || 1;
  const pricePerUnit = 5.00;
  const total = (qty * pricePerUnit).toFixed(2);
  totalPrice.textContent = '$' + total;
}

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const qty = parseInt(productQty.value) || 1;
    const total = totalPrice.textContent;
    const flavor = document.querySelector('.flavor-btn.active')?.textContent || 'Classic Cocoa';

    // Add cart animation
    addToCartBtn.style.transform = 'scale(0.95)';
    addToCartBtn.textContent = '✓ Added!';

    setTimeout(() => {
      addToCartBtn.style.transform = '';
      addToCartBtn.textContent = 'Add to Cart';
    }, 2000);
  });
}

// ── Buy Now Button - Redirect to Google Forms ──────────────
document.addEventListener('DOMContentLoaded', () => {
  const buyNowBtn = document.getElementById('buyNowBtn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const qty = parseInt(productQty?.value) || 1;
      const flavor = document.querySelector('.flavor-btn.active')?.textContent || 'Classic Cocoa';
      const total = document.getElementById('totalPrice')?.textContent || '$5.00';

      // Add animation before redirect
      buyNowBtn.style.transform = 'scale(0.95)';
      buyNowBtn.textContent = 'Redirecting...';

      // Redirect to Google Forms after brief delay
      setTimeout(() => {
        window.location.href = 'https://forms.gle/TWu5Fa8YzBry24Z68';
      }, 800);
    });
  }

  // ── Main CTA Button - Redirect to Google Forms ──────────────
  const mainCTABtn = document.getElementById('mainCTABtn');
  if (mainCTABtn) {
    mainCTABtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Add animation before redirect
      mainCTABtn.style.transform = 'scale(0.95)';
      mainCTABtn.textContent = 'Redirecting...';

      // Redirect to Google Forms after brief delay
      setTimeout(() => {
        window.location.href = 'https://forms.gle/TWu5Fa8YzBry24Z68';
      }, 800);
    });
  }
});

// ── Page Load Animation ─────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ── Handle Reduced Motion Preference ────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

// ── Staggered Reveal for Multiple Elements ──────────────────
const staggerReveal = (container, selector) => {
  const items = container?.querySelectorAll(selector);
  if (!items) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
};

// Apply stagger reveal
const productSection = document.querySelector('.product-section');
if (productSection) {
  staggerReveal(productSection, '.product-card');
}

// ── Performance: Throttle Scroll Events ─────────────────────
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ── Lazy Load Support ──────────────────────────────────────
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ── Smooth page load opacity ────────────────────────────────
document.body.style.opacity = '1';

console.log('🎯 Choco Fuel Ultra Premium Experience initialized!');
