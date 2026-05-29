// =========================================================
// Intro: burning steak click → reveal showroom
// =========================================================

import { gsap } from 'gsap';

const INTRO_KEY = 'norberto.intro.shown';

export function initIntro({ onDone }) {
  const intro = document.getElementById('intro');
  const steak = document.getElementById('intro-steak');
  const skip = document.getElementById('intro-skip');
  if (!intro || !steak) { onDone?.(); return; }

  const already = sessionStorage.getItem(INTRO_KEY);
  if (already === '1') {
    intro.style.display = 'none';
    document.body.classList.remove('is-locked');
    onDone?.();
    return;
  }

  let triggered = false;
  function fire(skipped = false) {
    if (triggered) return;
    triggered = true;
    sessionStorage.setItem(INTRO_KEY, '1');

    if (skipped) {
      gsap.to(intro, {
        opacity: 0, duration: .5, ease: 'power2.out',
        onComplete: finalize
      });
      return;
    }

    intro.classList.add('is-firing');
    // Sparks burst at steak position
    spawnLaunchBurst(steak);

    // Wait for the CSS animation to finish, then fade out
    setTimeout(() => {
      gsap.to(intro, {
        opacity: 0, duration: .7, ease: 'power2.out',
        onComplete: finalize
      });
    }, 1400);
  }

  function finalize() {
    intro.style.display = 'none';
    document.body.classList.remove('is-locked');
    onDone?.();
  }

  steak.addEventListener('click', () => fire(false));
  skip?.addEventListener('click', () => fire(true));

  // Keyboard accessibility
  steak.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(false); }
  });
}

function spawnLaunchBurst(target) {
  // Inject ember particles flying off the steak
  const rect = target.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Particle counts scale with perf tier
  const html = document.documentElement;
  const lowTier = html.classList.contains('perf-low');
  const midTier = html.classList.contains('perf-mid');
  const emberCount = lowTier ? 12 : midTier ? 24 : 40;
  const smokeCount = lowTier ? 4  : midTier ? 8  : 12;

  const burst = document.createElement('div');
  burst.style.cssText = `
    position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9990; mix-blend-mode: screen;`;
  document.body.appendChild(burst);

  for (let i = 0; i < emberCount; i++) {
    const p = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 400;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 200;
    const hue = 18 + Math.random() * 30;
    p.style.cssText = `
      position: absolute; left: ${cx}px; top: ${cy}px;
      width: ${3 + Math.random() * 6}px; height: ${3 + Math.random() * 6}px;
      background: hsl(${hue}, 100%, ${55 + Math.random() * 20}%);
      border-radius: 50%; transform: translate(-50%,-50%);
      box-shadow: 0 0 10px hsl(${hue}, 100%, 60%);
      will-change: transform, opacity;`;
    burst.appendChild(p);
    gsap.to(p, {
      x: dx, y: dy, opacity: 0,
      duration: .9 + Math.random() * .6,
      ease: 'power2.out'
    });
  }

  // Smoke puff
  for (let i = 0; i < smokeCount; i++) {
    const s = document.createElement('span');
    s.style.cssText = `
      position: absolute; left: ${cx}px; top: ${cy}px;
      width: 80px; height: 80px;
      background: radial-gradient(circle, rgba(180,120,80,.4) 0%, transparent 65%);
      border-radius: 50%; transform: translate(-50%,-50%) scale(.2);
      filter: blur(8px); will-change: transform, opacity;`;
    burst.appendChild(s);
    gsap.to(s, {
      x: (Math.random() - .5) * 200,
      y: -300 - Math.random() * 200,
      scale: 3 + Math.random() * 2,
      opacity: 0,
      duration: 2 + Math.random() * .8,
      ease: 'power1.out'
    });
  }

  setTimeout(() => burst.remove(), lowTier ? 1500 : 3000);
}
