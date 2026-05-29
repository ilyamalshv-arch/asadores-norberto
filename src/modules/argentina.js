// =========================================================
// Argentina map · animated city dots + routes from Luis Guillón
// =========================================================

// All coordinates on the same viewBox (400 × 820) as the SVG
const ORIGIN = { x: 305, y: 410, name: 'Luis Guillón', label: 'NORBERTO ↓' };

const CITIES = [
  { x: 175, y: 80,  name: 'Salta',         eta: '5-7 d',  side: 'right' },
  { x: 230, y: 130, name: 'Jujuy',         eta: '6-8 d',  side: 'right' },
  { x: 340, y: 175, name: 'Misiones',      eta: '4-6 d',  side: 'right' },
  { x: 290, y: 240, name: 'Resistencia',   eta: '4-5 d',  side: 'right' },
  { x: 180, y: 280, name: 'Tucumán',       eta: '4-6 d',  side: 'left' },
  { x: 195, y: 320, name: 'Córdoba',       eta: '3-4 d',  side: 'left' },
  { x: 105, y: 340, name: 'Mendoza',       eta: '3-5 d',  side: 'left' },
  { x: 270, y: 365, name: 'Rosario',       eta: '24-48 h', side: 'right' },
  { x: 330, y: 460, name: 'Mar del Plata', eta: '24-48 h', side: 'right' },
  { x:  85, y: 510, name: 'Neuquén',       eta: '5-7 d',  side: 'left' },
  { x:  55, y: 565, name: 'Bariloche',     eta: '5-8 d',  side: 'left' },
  { x: 175, y: 600, name: 'Pto. Madryn',   eta: '5-7 d',  side: 'right' },
  { x: 165, y: 700, name: 'Río Gallegos',  eta: '7-9 d',  side: 'right' },
  { x: 130, y: 785, name: 'Ushuaia',       eta: '8-10 d', side: 'right' }
];

export function initArgentinaMap() {
  const wrap = document.getElementById('argentina-map-wrap');
  if (!wrap) return;
  const svg = document.getElementById('argentina-map');
  const citiesG = document.getElementById('ar-cities');
  const routesG = document.getElementById('ar-routes');
  if (!svg || !citiesG || !routesG) return;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  // ---- Origin (Luis Guillón) ----
  const origDot = document.createElementNS(SVG_NS, 'circle');
  origDot.setAttribute('cx', ORIGIN.x);
  origDot.setAttribute('cy', ORIGIN.y);
  origDot.setAttribute('r', 6);
  origDot.setAttribute('class', 'origin-dot');
  citiesG.appendChild(origDot);

  const origLabel = document.createElementNS(SVG_NS, 'text');
  origLabel.setAttribute('x', ORIGIN.x + 10);
  origLabel.setAttribute('y', ORIGIN.y - 8);
  origLabel.setAttribute('class', 'origin-label');
  origLabel.textContent = 'Luis Guillón';
  citiesG.appendChild(origLabel);

  // ---- Cities ----
  CITIES.forEach((city, i) => {
    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('cx', city.x);
    dot.setAttribute('cy', city.y);
    dot.setAttribute('r', 3.5);
    dot.setAttribute('class', 'city-dot');
    dot.dataset.idx = i;
    citiesG.appendChild(dot);

    const label = document.createElementNS(SVG_NS, 'text');
    const dx = city.side === 'right' ? 8 : -8;
    label.setAttribute('x', city.x + dx);
    label.setAttribute('y', city.y + 3);
    label.setAttribute('text-anchor', city.side === 'right' ? 'start' : 'end');
    label.setAttribute('class', 'city-label');
    label.dataset.idx = i;
    label.textContent = city.name;
    citiesG.appendChild(label);

    // Route from origin to city (curved bezier)
    const ctrlX = (ORIGIN.x + city.x) / 2 + (city.x > ORIGIN.x ? 30 : -30);
    const ctrlY = (ORIGIN.y + city.y) / 2 - 30;
    const path = document.createElementNS(SVG_NS, 'path');
    const d = `M ${ORIGIN.x} ${ORIGIN.y} Q ${ctrlX} ${ctrlY} ${city.x} ${city.y}`;
    path.setAttribute('d', d);
    path.setAttribute('class', 'route-path');
    path.dataset.idx = i;
    routesG.appendChild(path);
    // Measure length for dasharray
    const len = path.getTotalLength();
    path.style.setProperty('--len', len);
  });

  // ---- Trigger on viewport ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateMap();
      animateCounters();
      io.disconnect();
    });
  }, { threshold: 0.25 });
  io.observe(wrap);
}

function animateMap() {
  const routes = document.querySelectorAll('.route-path');
  const dots = document.querySelectorAll('.city-dot');
  const labels = document.querySelectorAll('.city-label');
  const lowTier = document.documentElement.classList.contains('perf-low');
  // On low tier, draw everything at once (no staggered delay = fewer paint frames)
  const baseDelay = lowTier ? 0 : 250;
  const stagger = lowTier ? 0 : 220;
  routes.forEach((p, i) => {
    setTimeout(() => {
      p.classList.add('is-active');
      dots[i]?.classList.add('is-active');
      labels[i]?.classList.add('is-active');
    }, baseDelay + i * stagger);
  });
}

function animateCounters() {
  document.querySelectorAll('.map-counter-num').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1800;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString('es-AR');
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
