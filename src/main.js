// =========================================================
// Asadores de Norberto — entry point
// =========================================================

import { PERF } from './modules/perf.js';
import { initCursor } from './modules/cursor.js';
import { initIntro } from './modules/intro.js';
import { initCatalog } from './modules/catalog.js';
import { initCart } from './modules/cart.js';
import { initAudio, tryAutoplayAfterIntro, revealAudioToggle } from './modules/audio.js';
import { initReveals, initTopbar, initHeroParallax } from './modules/reveals.js';
import { initMedidaForm } from './modules/medida.js';
import { initFab } from './modules/fab.js';

// 1. Custom cursor (skip on touch / low-end automatically)
if (PERF.enableCursor) initCursor();

// 2. Audio toggle prepared but hidden
initAudio();

// 3. Intro: when user clicks the steak, reveal showroom
initIntro({
  onDone: () => {
    const main = document.getElementById('showroom');
    if (main) {
      main.hidden = false;
      main.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 600, easing: 'ease-out', fill: 'forwards' }
      );
    }
    revealAudioToggle();
    tryAutoplayAfterIntro();
    initShowroom();
  }
});

function initShowroom() {
  initCatalog();
  initCart();
  initMedidaForm();
  initReveals();
  initTopbar();
  initFab();
  if (PERF.enableParallax) initHeroParallax();
  initSmoothAnchors();
  // Lazy-load Argentina map only when its section is near viewport
  lazyMount('#envios', '.argentina-map-wrap', () =>
    import('./modules/argentina.js').then(m => m.initArgentinaMap())
  );
}

function lazyMount(sectionSel, anchorSel, loader) {
  const section = document.querySelector(sectionSel);
  if (!section) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      loader();
      io.disconnect();
    });
  }, { rootMargin: '300px 0px' });
  io.observe(section);
}

// preload tango.mp3 only on a user gesture; keep main bundle slim
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
