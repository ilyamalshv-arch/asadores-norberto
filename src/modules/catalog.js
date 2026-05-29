// =========================================================
// Catalog rendering + filters + product modal
// =========================================================

import { FAMILIES, PRODUCTS, ars, productById, productsByFamily } from './products.js';
import { cart } from './cart.js';

let activeFamily = 'todas';
const placeholder = createPlaceholderDataUri();

export function initCatalog() {
  renderFilters();
  renderGrid();
  initModal();
  renderHeroVitrina();
}

function renderFilters() {
  const container = document.getElementById('catalog-filters');
  if (!container) return;
  container.innerHTML = FAMILIES.map(f => `
    <button class="catalog-filter ${f.id === activeFamily ? 'is-active' : ''}"
            data-family="${f.id}"
            role="tab"
            aria-selected="${f.id === activeFamily}">${f.label}</button>
  `).join('');

  container.addEventListener('click', e => {
    const btn = e.target.closest('.catalog-filter');
    if (!btn) return;
    activeFamily = btn.dataset.family;
    container.querySelectorAll('.catalog-filter').forEach(b => {
      b.classList.toggle('is-active', b.dataset.family === activeFamily);
      b.setAttribute('aria-selected', b.dataset.family === activeFamily);
    });
    renderGrid();
  });
}

function pictureFor(image, alt) {
  if (!image) return `<img src="${placeholder}" alt="${alt}" loading="lazy" decoding="async" />`;
  // Generate srcset: /images/catalog/_MG_2875.webp + _MG_2875-sm.webp
  const sm = image.replace(/\.webp$/, '-sm.webp');
  return `<picture>
    <source media="(max-width: 720px)" srcset="${sm}" />
    <img src="${image}" alt="${alt}" loading="lazy" decoding="async" />
  </picture>`;
}

function renderGrid() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  const products = productsByFamily(activeFamily);
  grid.innerHTML = products.map(p => `
    <article class="catalog-card reveal" data-id="${p.id}">
      <div class="smoke-plume" aria-hidden="true"></div>
      <div class="catalog-card-figure">
        ${pictureFor(p.image, p.name)}
      </div>
      <div class="catalog-card-body">
        <span class="catalog-card-tag">${familyLabel(p.family)}</span>
        <h3 class="catalog-card-name">${p.name}</h3>
        <p class="catalog-card-size">${p.size}</p>
        <p class="catalog-card-price">
          ${ars.format(p.price)}
          <small>+ envío</small>
        </p>
        <div class="catalog-card-actions">
          <button type="button" class="btn btn-ghost" data-act="view">Detalles</button>
          <button type="button" class="btn btn-bordo" data-act="add">+ Carrito</button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.catalog-card').forEach(card => {
    const id = card.dataset.id;
    card.querySelector('[data-act="view"]').addEventListener('click', e => {
      e.stopPropagation();
      openModal(id);
    });
    card.querySelector('[data-act="add"]').addEventListener('click', e => {
      e.stopPropagation();
      const product = productById(id);
      cart.add(product);
      flyToCart(card);
    });
    card.addEventListener('click', () => openModal(id));
  });

  // Re-arm reveal observer for newly rendered cards
  if (window.__armReveals) window.__armReveals();
}

function familyLabel(id) {
  return FAMILIES.find(f => f.id === id)?.label || id;
}

// ---- Modal ----
function initModal() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('product-modal-close');
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const p = productById(id);
  if (!p) return;
  const body = document.getElementById('product-modal-body');
  const modal = document.getElementById('product-modal');
  body.innerHTML = `
    <div class="product-modal-figure">
      ${pictureFor(p.image, p.name)}
    </div>
    <div class="product-modal-content">
      <span class="product-modal-tag">${familyLabel(p.family)}</span>
      <h3 class="product-modal-name">${p.name}</h3>
      <p class="product-modal-desc">${p.desc}</p>
      <dl class="product-modal-spec">
        ${Object.entries(p.specs).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
        <dt>Material</dt><dd>Chapa SAE 1010 · 1,6 mm · Pintura epoxi 600°C</dd>
        <dt>Garantía</dt><dd>5 años contra defectos de fabricación</dd>
      </dl>
      <p class="product-modal-price">${ars.format(p.price)}</p>
      <div class="product-modal-actions">
        <button class="btn btn-ghost" id="modal-wa">Por WhatsApp</button>
        <button class="btn btn-bordo" id="modal-add">+ Carrito</button>
      </div>
    </div>
  `;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.querySelector('#modal-add')?.addEventListener('click', () => {
    cart.add(p);
    closeModal();
  });
  body.querySelector('#modal-wa')?.addEventListener('click', () => {
    const msg = `Hola Norberto! Vi en la web el modelo "${p.name}" (${p.size}). ¿Tenés stock? Saludos.`;
    window.open(whatsappLink(msg), '_blank', 'noopener');
  });
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
}

// ---- Fly-to-cart animation ----
function flyToCart(card) {
  const cartBtn = document.getElementById('cart-button');
  if (!cartBtn) return;
  const img = card.querySelector('.catalog-card-figure img');
  if (!img) return;

  const from = img.getBoundingClientRect();
  const to = cartBtn.getBoundingClientRect();

  const clone = img.cloneNode(true);
  clone.style.cssText = `
    position: fixed; left: ${from.left}px; top: ${from.top}px;
    width: ${from.width}px; height: ${from.height}px;
    z-index: 9990; pointer-events: none;
    transition: all .65s cubic-bezier(.5,0,.1,1);
    filter: drop-shadow(0 8px 20px rgba(255,87,34,.4));`;
  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = `${to.left + to.width / 2 - 24}px`;
    clone.style.top = `${to.top + to.height / 2 - 24}px`;
    clone.style.width = '48px';
    clone.style.height = '48px';
    clone.style.opacity = '0';
    clone.style.transform = 'rotate(360deg)';
  });
  setTimeout(() => clone.remove(), 700);

  cartBtn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
    { duration: 450, easing: 'cubic-bezier(.34,1.56,.64,1)' }
  );
}

// ---- Hero vitrina (rotating row) ----
function renderHeroVitrina() {
  const track = document.getElementById('vitrina-track');
  if (!track) return;
  const withImages = PRODUCTS.filter(p => p.image);
  // duplicate for seamless loop
  const items = [...withImages, ...withImages];
  track.innerHTML = items.map(p => {
    const sm = p.image.replace(/\.webp$/, '-sm.webp');
    return `
    <div class="vitrina-item">
      <picture>
        <source media="(max-width: 720px)" srcset="${sm}" />
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" />
      </picture>
    </div>`;
  }).join('');
}

// ---- Helpers ----
export function whatsappLink(message) {
  const phone = '5491100000000'; // placeholder — replace with real number
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function createPlaceholderDataUri() {
  // SVG silhouette of a generic grill — used when no photo is available
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 220'>
    <rect width='300' height='220' fill='#fff5d7'/>
    <g stroke='#5a0606' stroke-width='3' fill='none' stroke-linecap='round'>
      <rect x='60' y='80' width='180' height='60' rx='6' fill='#1a0f0a'/>
      <line x1='75' y1='95' x2='225' y2='95' stroke='#d4a036' stroke-width='2'/>
      <line x1='75' y1='110' x2='225' y2='110' stroke='#d4a036' stroke-width='2'/>
      <line x1='75' y1='125' x2='225' y2='125' stroke='#d4a036' stroke-width='2'/>
      <line x1='80' y1='140' x2='80' y2='180'/>
      <line x1='220' y1='140' x2='220' y2='180'/>
    </g>
    <text x='150' y='200' text-anchor='middle' font-family='Georgia' font-size='12' fill='#8b0e0e' font-style='italic'>foto pronto</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
