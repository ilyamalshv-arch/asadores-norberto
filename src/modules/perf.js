// =========================================================
// Device & connection profile — drives quality decisions
// =========================================================

function safe(n, fallback) {
  return Number.isFinite(n) ? n : fallback;
}

const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

const isCoarse = matchMedia('(pointer: coarse)').matches;
const isSmallScreen = matchMedia('(max-width: 720px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = !!conn.saveData;

// deviceMemory: 0.25, 0.5, 1, 2, 4, 8 GB (Chrome only).
// hardwareConcurrency: logical CPU cores.
const mem = safe(navigator.deviceMemory, 4);
const cores = safe(navigator.hardwareConcurrency, 4);

// effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
const eff = (conn.effectiveType || '').toLowerCase();
const slowNet = saveData || /(2g|slow)/i.test(eff);

// Heuristic: low-end device
const lowMem = mem <= 2;
const fewCores = cores <= 4;
const isLowEnd = lowMem || (fewCores && isCoarse);

// Three quality tiers
let tier = 'high';
if (isLowEnd || slowNet) tier = 'low';
else if (isCoarse || isSmallScreen) tier = 'mid';
if (reducedMotion) tier = 'low';

export const PERF = {
  tier,
  reducedMotion,
  saveData,
  slowNet,
  isCoarse,
  isSmallScreen,
  isLowEnd,
  mem, cores, effectiveType: eff,
  enableCursor:        tier !== 'low' && !isCoarse,
  enableSmokeTrail:    tier === 'high' && !isCoarse,
  enableParallax:      tier !== 'low',
  enableVitrinaScroll: tier !== 'low',
  enableGlobe:         tier !== 'low',
  enableMapAnim:       tier !== 'low',
  enableSteakSizzle:   tier !== 'low',
  introEmbersCount:    tier === 'high' ? 12 : tier === 'mid' ? 6 : 0,
  introSizzleCount:    tier === 'high' ? 8  : tier === 'mid' ? 4 : 0
};

if (typeof window !== 'undefined') window.__perf = PERF;

const root = document.documentElement;
root.classList.add(`perf-${PERF.tier}`);
if (PERF.isCoarse) root.classList.add('is-touch');
if (PERF.isSmallScreen) root.classList.add('is-small');
if (PERF.saveData) root.classList.add('save-data');
