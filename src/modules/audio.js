// =========================================================
// Tango audio toggle — Howler lazy-loaded on first interaction
// (saves ~20KB from initial bundle for low-end users who never click it)
// =========================================================

let howl = null;
let isOn = false;
let loading = null;

async function getHowler() {
  if (!loading) {
    loading = import('howler').then(m => m.Howl);
  }
  return loading;
}

async function ensureHowl() {
  if (howl) return howl;
  const Howl = await getHowler();
  howl = new Howl({
    src: ['/audio/tango.mp3'],
    loop: true,
    volume: 0,
    html5: true,
    onloaderror: () => {
      console.info('[audio] tango.mp3 no encontrado — agregar /public/audio/tango.mp3');
    }
  });
  return howl;
}

export function initAudio() {
  const btn = document.getElementById('audio-toggle');
  if (!btn) return;

  btn.style.opacity = '0';
  btn.style.pointerEvents = 'none';
  btn.style.transition = 'opacity .6s';

  btn.addEventListener('click', async () => {
    const h = await ensureHowl();
    if (isOn) {
      h.fade(0.35, 0, 600);
      setTimeout(() => h.pause(), 650);
      isOn = false;
      btn.setAttribute('aria-pressed', 'false');
      btn.querySelector('.audio-toggle-label').textContent = 'Tango';
    } else {
      h.play();
      h.fade(0, 0.35, 800);
      isOn = true;
      btn.setAttribute('aria-pressed', 'true');
      btn.querySelector('.audio-toggle-label').textContent = '♪ Tango';
    }
  });
}

export function revealAudioToggle() {
  const btn = document.getElementById('audio-toggle');
  if (!btn) return;
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';
}

export async function tryAutoplayAfterIntro() {
  // Called right after the user clicked the steak — counts as a gesture
  // Don't import Howler if the user is on save-data
  const conn = navigator.connection || {};
  if (conn.saveData) return;

  try {
    const h = await ensureHowl();
    h.play();
    h.fade(0, 0.35, 1500);
    isOn = true;
    const btn = document.getElementById('audio-toggle');
    btn?.setAttribute('aria-pressed', 'true');
    btn?.querySelector('.audio-toggle-label')?.replaceChildren(document.createTextNode('♪ Tango'));
  } catch {
    /* ignore — user can toggle manually */
  }
}
