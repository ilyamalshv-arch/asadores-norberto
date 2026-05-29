// =========================================================
// Pala asador cursor — robust follow + smoke trail + click puff
// Audio synthesized via Web Audio (no mp3 files)
// =========================================================

const HOVER_TARGETS = 'a, button, [role="button"], summary, input, textarea, select, .catalog-card, .historia-card, .envios-card, .faq-item, .polaroid';

export function initCursor() {
  const hasFinePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cursor = document.getElementById('spatula-cursor');
  const canvas = document.getElementById('smoke-canvas');
  if (!cursor || !canvas) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Smoke trail only on "high" perf tier (skip canvas particles on weak hardware)
  const enableTrail = !reducedMotion && !document.documentElement.classList.contains('perf-low') && !document.documentElement.classList.contains('perf-mid');
  document.documentElement.classList.add('has-spatula-cursor');

  // ---------- Canvas ----------
  const ctx = canvas.getContext('2d');
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ---------- Follow state ----------
  const state = {
    mx: -100, my: -100,   // start off-screen so nothing shows until first move
    cx: -100, cy: -100,
    lastX: -100, lastY: -100,
    moveTime: 0,
    primed: false,         // becomes true on first mouse signal
  };

  function setTarget(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') return;
    state.mx = x;
    state.my = y;
    state.moveTime = performance.now();
    if (!state.primed) {
      // Snap to position on first move to avoid "flying from corner"
      state.cx = x;
      state.cy = y;
      state.lastX = x;
      state.lastY = y;
      state.primed = true;
      cursor.classList.add('is-active');
    }
  }

  // Listen on multiple events so SOMETHING fires regardless of browser quirks
  const moveOpts = { passive: true, capture: true };
  window.addEventListener('mousemove', e => setTarget(e.clientX, e.clientY), moveOpts);
  window.addEventListener('pointermove', e => setTarget(e.clientX, e.clientY), moveOpts);
  // Drag still updates position
  window.addEventListener('dragover', e => setTarget(e.clientX, e.clientY), moveOpts);

  // Hover detection — delegated, robust
  document.addEventListener('mouseover', e => {
    if (e.target && e.target.closest && e.target.closest(HOVER_TARGETS)) {
      cursor.classList.add('is-hover');
    }
  }, { capture: true });
  document.addEventListener('mouseout', e => {
    if (!e.target || !e.target.closest) return;
    const from = e.target.closest(HOVER_TARGETS);
    const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(HOVER_TARGETS) : null;
    if (from && !to) cursor.classList.remove('is-hover');
  }, { capture: true });

  // Click — swat + sound + smoke burst
  window.addEventListener('pointerdown', e => {
    setTarget(e.clientX, e.clientY); // ensure position is fresh
    cursor.classList.add('is-click');
    playPuff();
    burstSmoke(e.clientX, e.clientY, 22);
    setTimeout(() => cursor.classList.remove('is-click'), 380);
  }, { passive: true });

  // ---------- Smoke particles ----------
  const smoke = [];

  function emitPuff(x, y, opts = {}) {
    const {
      size = 14,
      vx = 0,
      vy = -0.3,
      life = 1.4,
      hue = 30 + Math.random() * 10,
      sat = 8,
      light = 60,
      alpha = 0.18,
      grow = 0.6
    } = opts;
    smoke.push({
      x, y,
      vx: vx + (Math.random() - .5) * 0.4,
      vy: vy + (Math.random() - .5) * 0.2,
      size: size * (.8 + Math.random() * .5),
      grow,
      life,
      age: 0,
      hue, sat, light,
      alpha
    });
  }

  function burstSmoke(x, y, count) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.8;
      emitPuff(
        x + (Math.random() - .5) * 8,
        y + (Math.random() - .5) * 8,
        {
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - 0.8,
          size: 16 + Math.random() * 16,
          life: 1.6 + Math.random() * 1.4,
          alpha: 0.22 + Math.random() * 0.15,
          hue: 28 + Math.random() * 18,
          sat: 14,
          light: 55 + Math.random() * 15,
          grow: 0.8
        }
      );
    }
    // bright sparks
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI / 2 + (Math.random() - .5) * 1.6;
      const speed = 1.2 + Math.random() * 2.8;
      smoke.push({
        x: x + (Math.random() - .5) * 6,
        y: y + (Math.random() - .5) * 6,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 0.6,
        size: 2 + Math.random() * 2.5,
        grow: -1.5,
        life: 0.6 + Math.random() * 0.5,
        age: 0,
        hue: 25 + Math.random() * 15,
        sat: 100,
        light: 60 + Math.random() * 15,
        alpha: 0.9,
        isEmber: true
      });
    }
  }

  // ---------- Animation loop with rAF + setInterval fallback ----------
  let last = performance.now();
  let rafId = 0;

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    step(dt, now);
    rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);

  // Heartbeat: if rAF stalls (hidden tab, throttle), keep ticking softly
  // — so when the user returns, position is already correct.
  setInterval(() => {
    if (document.hidden) return;
    const now = performance.now();
    if (now - last > 200) {
      // forced step
      step(Math.min((now - last) / 1000, 1 / 20), now);
      last = now;
    }
  }, 250);

  function step(dt, now) {
    if (!state.primed) {
      // Nothing to render until first mouse move
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      return;
    }

    // Smooth follow (fast lerp)
    state.cx += (state.mx - state.cx) * 0.5;
    state.cy += (state.my - state.cy) * 0.5;
    // Snap if super close (avoids sub-pixel jitter)
    if (Math.abs(state.mx - state.cx) < 0.1) state.cx = state.mx;
    if (Math.abs(state.my - state.cy) < 0.1) state.cy = state.my;

    // Position the cursor
    cursor.style.transform = `translate3d(${state.cx.toFixed(1)}px, ${state.cy.toFixed(1)}px, 0)`;

    // Emit trailing smoke when moving (only on high tier)
    if (enableTrail) {
      const dx = state.cx - state.lastX, dy = state.cy - state.lastY;
      const v = Math.hypot(dx, dy);
      if (v > 1.5 && now - state.moveTime < 250) {
        const n = Math.min(3, Math.floor(v / 6) + 1);
        for (let i = 0; i < n; i++) {
          emitPuff(
            state.cx + (Math.random() - .5) * 10 - dx * 0.4,
            state.cy + (Math.random() - .5) * 10 - dy * 0.4 + 6,
            {
              vx: -dx * 0.04 + (Math.random() - .5) * 0.5,
              vy: -Math.abs(dy) * 0.04 - 0.25 + (Math.random() - .5) * 0.3,
              size: 9 + Math.random() * 9,
              life: 0.9 + Math.random() * 0.7,
              alpha: 0.12 + Math.random() * 0.08,
              hue: 25 + Math.random() * 15,
              sat: 10,
              light: 58 + Math.random() * 10,
              grow: 0.5
            }
          );
        }
      }
    }
    state.lastX = state.cx;
    state.lastY = state.cy;

    // Draw smoke
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = smoke.length - 1; i >= 0; i--) {
      const p = smoke[i];
      p.age += dt;
      if (p.age >= p.life) { smoke.splice(i, 1); continue; }
      p.vy -= dt * 0.8;
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.x += p.vx;
      p.y += p.vy;
      p.size += p.grow * dt * 30;

      const t = p.age / p.life;
      const fade = 1 - t;

      if (p.isEmber) {
        const a = fade * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size) * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a * 0.18})`;
        ctx.fill();
      } else {
        const r = Math.max(2, p.size);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const a = fade * p.alpha;
        grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light + 15}%, ${a})`);
        grad.addColorStop(0.55, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a * 0.6})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light - 5}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// =========================================================
// Click sound — synthesized "puff" via Web Audio
// =========================================================

let audioCtx = null;
let muted = false;

function getAudioCtx() {
  if (!audioCtx) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    } catch { /* unsupported */ }
  }
  // Resume if suspended (Chrome autoplay policy)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playPuff() {
  if (muted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const dur = 0.22;

  // White noise buffer
  const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;

  // Low-pass with downward sweep — "puff/whoosh"
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2200, t0);
  filter.frequency.exponentialRampToValueAtTime(180, t0 + 0.18);
  filter.Q.value = 1.2;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 180;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.4, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(filter).connect(hp).connect(gain).connect(ctx.destination);
  src.start(t0);
  src.stop(t0 + dur);

  // Quick sine "tick" on top
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, t0);
  osc.frequency.exponentialRampToValueAtTime(90, t0 + 0.06);
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.001, t0);
  oscGain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.006);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08);
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.1);
}

export function setCursorMuted(v) { muted = !!v; }
