// =========================================================
// Cart — localStorage + WhatsApp + Mercado Pago
// =========================================================

import { ars, productById } from './products.js';
import { whatsappLink } from './catalog.js';

const STORAGE_KEY = 'norberto.cart.v1';

class Cart {
  constructor() {
    this.items = this.load();
    this.listeners = new Set();
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  }
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    this.listeners.forEach(fn => fn(this.items));
  }
  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.qty += 1;
    else this.items.push({ id: product.id, qty: 1 });
    this.save();
  }
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }
  update(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, qty);
    if (item.qty === 0) this.remove(id);
    else this.save();
  }
  total() {
    return this.items.reduce((sum, i) => {
      const p = productById(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }
  count() {
    return this.items.reduce((n, i) => n + i.qty, 0);
  }
  clear() {
    this.items = [];
    this.save();
  }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
}

export const cart = new Cart();

export function initCart() {
  const btn = document.getElementById('cart-button');
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const closeBtn = document.getElementById('cart-close');
  const checkoutBtn = document.getElementById('cart-checkout');
  const badge = document.getElementById('cart-badge');
  const body = document.getElementById('cart-body');
  const total = document.getElementById('cart-total');

  function open() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');
  }
  function close() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-open');
  }

  btn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  function render() {
    const items = cart.items;
    if (!items.length) {
      body.innerHTML = `<p class="cart-empty">Tu carrito está más vacío que parrilla en cuarentena.</p>`;
    } else {
      body.innerHTML = items.map(i => {
        const p = productById(i.id);
        if (!p) return '';
        return `
          <div class="cart-item" data-id="${p.id}">
            <img src="${p.image || ''}" alt="${p.name}" onerror="this.style.background='#f7e9bf'" />
            <div>
              <h4 class="cart-item-name">${p.name}</h4>
              <div class="cart-item-meta">
                <div class="cart-item-qty">
                  <button data-act="dec" aria-label="Restar">−</button>
                  <span>${i.qty}</span>
                  <button data-act="inc" aria-label="Sumar">+</button>
                </div>
                <span class="cart-item-price">${ars.format(p.price * i.qty)}</span>
              </div>
            </div>
            <button class="cart-item-remove" data-act="rm" aria-label="Quitar">×</button>
          </div>
        `;
      }).join('');

      body.querySelectorAll('.cart-item').forEach(row => {
        const id = row.dataset.id;
        row.querySelector('[data-act="inc"]').onclick = () =>
          cart.update(id, (cart.items.find(x => x.id === id)?.qty || 0) + 1);
        row.querySelector('[data-act="dec"]').onclick = () =>
          cart.update(id, (cart.items.find(x => x.id === id)?.qty || 0) - 1);
        row.querySelector('[data-act="rm"]').onclick = () => cart.remove(id);
      });
    }
    total.textContent = ars.format(cart.total());
    const n = cart.count();
    badge.textContent = n;
    badge.classList.toggle('is-empty', n === 0);
  }

  cart.on(render);
  render();

  // Checkout: WhatsApp
  checkoutBtn?.addEventListener('click', () => {
    if (!cart.items.length) return;
    let msg = `Hola Norberto! Me gustaría pedir:%0A%0A`;
    cart.items.forEach(i => {
      const p = productById(i.id);
      msg += `• ${p.name} (${p.size}) × ${i.qty} — ${ars.format(p.price * i.qty)}%0A`;
    });
    msg += `%0ATotal aprox: ${ars.format(cart.total())}%0A%0A¿Confirmamos por acá? Gracias!`;
    window.open(`https://wa.me/5491100000000?text=${msg}`, '_blank', 'noopener');
  });
}
