// =========================================================
// Intersection-based scroll reveals + sticky topbar
// =========================================================

import { gsap } from 'gsap';

export function initReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  function arm() {
    // Mark hero children as reveal candidates
    document.querySelectorAll('.section-head, .historia-card, .envios-card, .faq-item, .catalog-card, .medida-grid > *, .fabrica-grid > *')
      .forEach(el => {
        if (!el.classList.contains('is-visible') && !el.classList.contains('_armed')) {
          el.classList.add('reveal', '_armed');
          io.observe(el);
        }
      });
  }
  window.__armReveals = arm;
  arm();

  // Stagger historia cards with GSAP
  const cards = document.querySelectorAll('.historia-card');
  if (cards.length) {
    const cardIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          gsap.fromTo(cards,
            { opacity: 0, y: 40, rotate: -2 },
            { opacity: 1, y: 0, rotate: 0, duration: .9, stagger: .12, ease: 'power3.out' });
          cardIO.disconnect();
        }
      });
    }, { threshold: 0.1 });
    cardIO.observe(cards[0]);
  }
}

export function initTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  topbar.hidden = false;
  let lastY = 0;

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:80vh;width:1px;height:1px;pointer-events:none';
  document.getElementById('showroom').prepend(sentinel);

  const io = new IntersectionObserver(([e]) => {
    topbar.classList.toggle('is-visible', !e.isIntersecting);
  });
  io.observe(sentinel);

  // Auto-hide on scroll down, show on scroll up (subtle)
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    lastY = y;
  }, { passive: true });
}

export function initHeroParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroSection = document.querySelector('.hero');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const offset = -rect.top * 0.3;
        bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
      }
      ticking = false;
    });
  }, { passive: true });
}
