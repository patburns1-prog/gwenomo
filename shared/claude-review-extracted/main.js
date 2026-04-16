// ═══════════════════════════════════════════════
//  GWENOMO · main.js
// ═══════════════════════════════════════════════

// ── Scroll progress bar ──────────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  if (progressBar) progressBar.style.width = `${pct}%`;
}, { passive: true });

// ── Hero entrance animations ─────────────────────
// Auto-trigger staggered reveals for hero elements on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up').forEach((el) => {
    el.classList.add('visible');
  });
});

// ── Intersection observer for .reveal elements ───
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

// ── Cursor sparkle trail ─────────────────────────
const sparkleColors = ['#d8ab49', '#c54b43', '#2f6b41', '#f0c060', '#ffffff', '#4a9060'];
let lastSparkle = 0;

function createSparkle(x, y) {
  const s = document.createElement('div');
  s.className = 'cursor-sparkle';
  const size = 4 + Math.random() * 7;
  s.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]};
  `;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 700);
}

// Only on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastSparkle > 45) {
      lastSparkle = now;
      createSparkle(e.clientX, e.clientY);
    }
  }, { passive: true });
}

// ── Speech bubble rotator ────────────────────────
const speechMessages = [
  '¡Hola! Soy un guardián de alegría ✨',
  '¡Puedo ser tu regalo perfecto! 🎁',
  '¡Hechos con amor desde Ecuador! 🌿',
  '¡Diseña el tuyo y dinos cómo lo quieres! 🎨',
  '¡Cada gnomo es único, como tú! 🌈',
  '¡Me encantan los hogares felices! 🏡',
];
let speechIdx = 0;
const speechText = document.getElementById('speechText');

setInterval(() => {
  if (!speechText) return;
  speechIdx = (speechIdx + 1) % speechMessages.length;
  speechText.style.opacity = '0';
  setTimeout(() => {
    speechText.textContent = speechMessages[speechIdx];
    speechText.style.opacity = '1';
  }, 300);
}, 4500);

if (speechText) {
  speechText.style.transition = 'opacity 300ms ease';
}

// ── Gnome hero 3D tilt on pointer move ───────────
const heroGnome = document.getElementById('heroGnome');
const heroStage = document.querySelector('.hero-stage');

if (heroStage && heroGnome) {
  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = (e.clientX - cx) / rect.width * 18;
    const ry = (e.clientY - cy) / rect.height * 12;
    heroGnome.style.transform = `perspective(900px) rotateY(${rx}deg) rotateX(${-ry}deg)`;
  });
  heroStage.addEventListener('mouseleave', () => {
    heroGnome.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}

// ── Tilt cards ────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rY = ((x / rect.width) - 0.5) * 12;
    const rX = ((y / rect.height) - 0.5) * -12;
    card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

// ── Sparkles parallax ─────────────────────────────
const sparklesEl = document.querySelector('.sparkles');
window.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  if (sparklesEl) {
    sparklesEl.style.backgroundPosition = `${x / 8}px ${y / 8}px, ${40 + x / 14}px ${60 + y / 14}px`;
  }
}, { passive: true });

// ── Fortune flip cards ────────────────────────────
document.querySelectorAll('.fortune-card').forEach((card) => {
  const toggle = () => card.classList.toggle('flipped');
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

// ── Counter animation for stats ───────────────────
const statNums = document.querySelectorAll('.stat-num[data-count]');
let countersStarted = false;

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNums.forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const steps = 60;
        const inc = target / steps;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 25);
      });
    }
  });
}, { threshold: 0.4 });

statNums.forEach((el) => counterObs.observe(el));

// ── Gnome color customizer ─────────────────────────
const customizer = {
  hat: { color: '#c54b43', name: 'Rojo navideño' },
  coat: { color: '#2f6b41', name: 'Verde bosque' },
  beard: { color: '#ffffff', name: 'Blanca clásica' },
};

// Map of part → preview SVG element IDs
const gnomeParts = {
  hat: ['pvHat'],
  coat: ['pvCoat', 'pvArmL', 'pvArmR'],
  beard: ['pvBeard'],
};

function applyColor(part, color) {
  customizer[part].color = color;
  const ids = gnomeParts[part] || [];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('fill', color);
  });
  // Add pop animation to preview gnome
  const preview = document.getElementById('previewGnome');
  if (preview) {
    preview.classList.remove('updating');
    void preview.offsetWidth; // reflow
    preview.classList.add('updating');
  }
  updateOrderSummary();
}

function updateOrderSummary() {
  const hatTag = document.getElementById('summaryHat');
  const coatTag = document.getElementById('summaryCoat');
  const beardTag = document.getElementById('summaryBeard');
  if (hatTag) hatTag.textContent = `🎩 ${customizer.hat.name}`;
  if (coatTag) coatTag.textContent = `🧥 ${customizer.coat.name}`;
  if (beardTag) beardTag.textContent = `🧔 ${customizer.beard.name}`;
}

// Swatch click handlers
document.querySelectorAll('.swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const part = swatch.dataset.part;
    const color = swatch.dataset.color;
    const name = swatch.dataset.name;

    // Update active state within group
    document.querySelectorAll(`.swatch[data-part="${part}"]`).forEach((s) => {
      s.classList.remove('swatch-active');
      s.setAttribute('aria-pressed', 'false');
    });
    swatch.classList.add('swatch-active');
    swatch.setAttribute('aria-pressed', 'true');

    customizer[part] = { color, name };
    applyColor(part, color);
  });
});

// WhatsApp order button
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    const recipient = (document.getElementById('recipientName')?.value || '').trim();

    let msg = `¡Hola Wen! Quiero encargar un Gwenomo personalizado 🎄\n\n`;
    msg += `🎩 Sombrero: ${customizer.hat.name}\n`;
    msg += `🧥 Cuerpo: ${customizer.coat.name}\n`;
    msg += `🧔 Barba: ${customizer.beard.name}\n`;
    if (recipient) msg += `\n📝 Es para: ${recipient}\n`;
    msg += `\n¿Tienen disponible? ¿Cuánto cuesta? ✨`;

    const url = `https://wa.me/593996259465?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noreferrer');

    // Visual feedback
    const originalText = orderBtn.innerHTML;
    orderBtn.innerHTML = `<span>✅ ¡Listo! Abriendo WhatsApp…</span>`;
    orderBtn.disabled = true;
    setTimeout(() => {
      orderBtn.innerHTML = originalText;
      orderBtn.disabled = false;
    }, 3000);
  });
}

// ── Peeking gnome ─────────────────────────────────
const welcomeGnome = document.getElementById('welcomeGnome');
setTimeout(() => {
  welcomeGnome?.classList.add('active');
}, 2400);

welcomeGnome?.addEventListener('click', () => {
  welcomeGnome.classList.toggle('active');
});

// ── Snow canvas ───────────────────────────────────
const canvas = document.getElementById('snow-canvas');
const ctx = canvas?.getContext('2d');
let particles = [];

function initSnow() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.4 + 0.5,
    v: Math.random() * 0.7 + 0.2,
    drift: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.6 + 0.3,
  }));
}

function drawSnow() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.fill();
    p.y += p.v;
    p.x += p.drift;
    if (p.y > canvas.height + 4) { p.y = -10; p.x = Math.random() * canvas.width; }
    if (p.x > canvas.width + 4)  p.x = -4;
    if (p.x < -4)                 p.x = canvas.width + 4;
  });
  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', initSnow, { passive: true });
initSnow();
drawSnow();
