// =========================================================
// "Hecho a medida" form — opens WhatsApp with prefilled text
// =========================================================

export function initMedidaForm() {
  const form = document.getElementById('medida-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const tel = (data.get('tel') || '').toString().trim();
    const mensaje = (data.get('mensaje') || '').toString().trim();
    if (!nombre || !tel || !mensaje) {
      alert('Completá nombre, WhatsApp y mensaje, por favor.');
      return;
    }
    const text =
      `Hola Norberto! Quiero pedir una parrilla a medida.%0A%0A` +
      `Soy: ${encodeURIComponent(nombre)}%0A` +
      `Mi WhatsApp: ${encodeURIComponent(tel)}%0A%0A` +
      `Lo que necesito:%0A${encodeURIComponent(mensaje)}`;
    window.open(`https://wa.me/5491100000000?text=${text}`, '_blank', 'noopener');
  });
}
