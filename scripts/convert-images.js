import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const SIN_FONDO_DIR = path.join(ROOT, 'PARRILLAS-sin fondo');
const HI_RES_DIR = path.join(ROOT, 'Fotos de parillas');
const OUT_BASE = path.resolve(import.meta.dirname, '..', 'public', 'images');

const CATALOG_OUT = path.join(OUT_BASE, 'catalog');
const ATMOSPHERE_OUT = path.join(OUT_BASE, 'atmosphere');
const HERO_OUT = path.join(OUT_BASE, 'hero');

// Atmospheric pictures we want from the big folder (factory, fire, hands, action)
const ATMOSPHERE_PICKS = [
  '_MG_2877', '_MG_2890', '_MG_2901', '_MG_2912',
  '_MG_2934', '_MG_2950', '_MG_2964', '_MG_2985',
  '_MG_2998', '_MG_3019', '_MG_3037', '_MG_3068'
];

const HERO_PICKS = [
  '_MG_2875', '_MG_2998', '_MG_3037'
];

await mkdir(CATALOG_OUT, { recursive: true });
await mkdir(ATMOSPHERE_OUT, { recursive: true });
await mkdir(HERO_OUT, { recursive: true });

function logSize(label, bytes) {
  const kb = bytes / 1024;
  if (kb > 1024) return `${label}: ${(kb / 1024).toFixed(1)}MB`;
  return `${label}: ${kb.toFixed(0)}KB`;
}

async function convertCatalog() {
  const files = (await readdir(SIN_FONDO_DIR)).filter(f => f.endsWith('.jpg'));
  console.log(`\n=== CATALOG (sin fondo) — ${files.length} files × 2 sizes ===`);
  for (const file of files) {
    const inPath = path.join(SIN_FONDO_DIR, file);
    const base = path.basename(file, '.jpg');
    const inStat = await stat(inPath);
    // Full size for desktop
    await sharp(inPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6, smartSubsample: true })
      .toFile(path.join(CATALOG_OUT, `${base}.webp`));
    // Mobile size — 600px is enough for grid cards on phone
    await sharp(inPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, smartSubsample: true })
      .toFile(path.join(CATALOG_OUT, `${base}-sm.webp`));
    const fullStat = await stat(path.join(CATALOG_OUT, `${base}.webp`));
    const smStat = await stat(path.join(CATALOG_OUT, `${base}-sm.webp`));
    console.log(`  ${base}  ${logSize('in', inStat.size)} -> full ${logSize('', fullStat.size)} / sm ${logSize('', smStat.size)}`);
  }
}

async function convertSelected(picks, outDir, sizes, label) {
  console.log(`\n=== ${label} — ${picks.length} files × ${sizes.length} sizes ===`);
  for (const baseName of picks) {
    const inPath = path.join(HI_RES_DIR, `${baseName}.jpg`);
    try {
      const inStat = await stat(inPath);
      const outs = [];
      for (const s of sizes) {
        const outPath = path.join(outDir, `${baseName}${s.suffix}.webp`);
        await sharp(inPath)
          .resize({ width: s.width, withoutEnlargement: true })
          .webp({ quality: s.quality, effort: 6, smartSubsample: true })
          .toFile(outPath);
        const outStat = await stat(outPath);
        outs.push(`${s.suffix || 'full'} ${logSize('', outStat.size)}`);
      }
      console.log(`  ${baseName}  ${logSize('in', inStat.size)} -> ${outs.join(' / ')}`);
    } catch (err) {
      console.warn(`  ${baseName}  SKIP: ${err.message}`);
    }
  }
}

await convertCatalog();
await convertSelected(ATMOSPHERE_PICKS, ATMOSPHERE_OUT, [
  { suffix: '',     width: 1800, quality: 88 },   // desktop
  { suffix: '-sm',  width: 800,  quality: 80 }    // mobile
], 'ATMOSPHERE');
await convertSelected(HERO_PICKS, HERO_OUT, [
  { suffix: '',     width: 2400, quality: 85 },   // desktop
  { suffix: '-sm',  width: 1200, quality: 80 },   // tablet/large mobile
  { suffix: '-xs',  width: 720,  quality: 72 }    // small mobile / slow net
], 'HERO');

console.log('\nDone.');
