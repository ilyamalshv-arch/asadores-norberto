// =========================================================
// Floating WhatsApp button — visible on touch / coarse pointers
// =========================================================

export function initFab() {
  const fab = document.getElementById('wa-fab');
  if (!fab) return;
  const isCoarse = matchMedia('(pointer: coarse)').matches;
  const isSmall = matchMedia('(max-width: 720px)').matches;
  if (!isCoarse && !isSmall) return;

  fab.hidden = false;

  // Hide while cart drawer is open (avoid overlap with checkout button)
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    const mo = new MutationObserver(() => {
      fab.classList.toggle('is-hidden', drawer.classList.contains('is-open'));
    });
    mo.observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }

  // Subtle entry animation
  requestAnimationFrame(() => fab.classList.add('is-mounted'));
}
