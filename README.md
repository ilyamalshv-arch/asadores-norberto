<div align="center">

```
       )   )   )      )
      (   (   (      (
   .---.----.---.--.---.
   | * |    | * |  | * |        🔥  A S A D O R E S  🔥
   '---'----'---'--'---'              de NORBERTO
   ║   ║    ║   ║  ║   ║       desde 1962 · Luis Guillón
   ╚═══╧════╧═══╧══╧═══╝              Buenos Aires
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    \\\  ░░░░░░░  ///
        ▓▓▓▓▓▓▓
```

### *"La parrilla no es un objeto. Es un domingo."*
**— don Norberto, 2024**

---

[![Stack](https://img.shields.io/badge/stack-Vite_+_GSAP_+_vanilla_JS-8b0e0e?style=for-the-badge)](#-stack)
[![Material](https://img.shields.io/badge/chapa-SAE_1010_·_1.6mm-d4a036?style=for-the-badge)](#-filosof%C3%ADa-de-código)
[![Hecho en](https://img.shields.io/badge/hecho_en-La_Matanza-1e3a8a?style=for-the-badge)](https://www.google.com/maps?q=-34.7993254,-58.4602667)
[![Performance](https://img.shields.io/badge/first_paint-~210KB_en_3G-0f5132?style=for-the-badge)](#-perfilado-para-pueblos-chicos)

</div>

---

## 🥩 Qué es esto

El sitio de la fábrica de parrillas, asadores criollos y discos de la familia **Norberto**, en Luis Guillón, partido de Esteban Echeverría. Tres generaciones haciendo lo mismo desde 1962: cortar chapa, doblarla, soldarla, pintarla, y mandarla a una casa donde el domingo va a ser un poco mejor.

No es un e-commerce gigante. No es un SaaS. Es un **catálogo digno** con carrito que termina en WhatsApp, porque así se compra en Argentina y no hay nada de malo en eso.

---

## 🛠 Stack

> *"Usamos lo que conocemos y lo que aguanta. Igual que la 1,6."*

| Capa | Herramienta | Por qué |
|---|---|---|
| Build | **Vite 5** | Rápido, sin configuración, dev server en 300ms |
| JS | **Vanilla ES2020** | Sin React. Si entra alguien nuevo al taller, lo aprende en una tarde |
| Animaciones | **GSAP 3** | Open-source desde 2024. Sin licencia, sin drama |
| Audio | **Howler 2** | Lazy-loaded — sólo si el cliente prende el tango |
| Imágenes | **sharp** | Pipeline propia: original → WebP × 3 resoluciones |
| Tipografía | Alfa Slab One · Pacifico · Source Serif 4 · Inconsolata | Filete porteño con corazón rioplatense |
| Deploy | **Cloudflare Pages** | Edge, HTTP/3, Brotli, 300+ ciudades |

**Cero frameworks pesados.** Cero `node_modules` de 800MB. Cero CSS-in-JS. El bundle inicial pesa **~63 KB gzipped** — un cuarto de lo que pesa un React vacío.

---

## 🔥 Cómo prender el fuego (local)

```bash
git clone https://github.com/ilyamalshv-arch/asadores-norberto.git
cd asadores-norberto
npm install        # primera vez nomás
npm run dev        # arranca en http://localhost:5173
```

Vas a ver el intro con el bife sobre la parrilla. Tocá la carne y entrás al showroom. Si querés saltar el intro siempre, abrí DevTools → Application → Session Storage → poné `norberto.intro.shown = 1`.

### Otros comandos del taller

```bash
npm run build      # genera /dist optimizado para producción
npm run preview    # corre /dist en puerto 4173 para verificar antes de subir
npm run images     # re-procesa fotos originales a WebP (catalog/atmosphere/hero × 2-3 tamaños)
```

---

## 🗂 Estructura del taller

```
site/
├── index.html                  El plano de todo el galpón
├── public/
│   ├── images/
│   │   ├── catalog/            10 fotos "sin fondo" × 2 tamaños (full + sm)
│   │   ├── atmosphere/         12 fotos del taller × 2 tamaños
│   │   └── hero/               3 fotos hero × 3 tamaños (full, sm, xs)
│   └── audio/                  👈 acá va tango.mp3 cuando lo tengas
├── src/
│   ├── main.js                 Punto de entrada — orquesta todo
│   ├── styles/
│   │   ├── base.css            Reset + variables (paleta filete, fonts)
│   │   ├── filete.css          Botones + tipografía decorativa + topbar
│   │   ├── intro.css           Bife ardiendo + ribbon con la marca
│   │   ├── cursor.css          Pala asador + canvas de humo
│   │   ├── sections.css        Hero, historia, fábrica, envíos, faq, footer
│   │   ├── catalog.css         Grid + cards + modal
│   │   ├── cart.css            Drawer lateral + items
│   │   ├── argentina.css       Mapa animado de envíos + globo de exportación
│   │   ├── album.css           Polaroids vintage de la galería familiar
│   │   ├── fab.css             Botón flotante de WhatsApp (mobile)
│   │   ├── responsive.css      Quiebres de breakpoints clásicos
│   │   └── perf.css            Reglas para gama media/baja + content-visibility
│   └── modules/
│       ├── perf.js             Detecta el dispositivo y baja efectos si hace falta
│       ├── intro.js            Click en bife → bife vuela → parrilla cae → showroom
│       ├── cursor.js           Pala que sigue el mouse + humo + "puff" al click
│       ├── products.js         La base de datos del catálogo (25 modelos)
│       ├── catalog.js          Render del grid, filtros, modal, fly-to-cart
│       ├── cart.js             Carrito en localStorage → WhatsApp con todo el pedido
│       ├── medida.js           Formulario "hecho a medida"
│       ├── argentina.js        Mapa de envíos con rutas animadas (lazy)
│       ├── reveals.js          Scroll-reveals + topbar + parallax del hero
│       ├── audio.js            Toggle del tango (Howler lazy-loaded)
│       └── fab.js              Botón flotante de WhatsApp
└── scripts/
    └── convert-images.js       Pipeline de WebP con sharp
```

**Una sección = un CSS = un módulo JS.** Si tenés que tocar la parte del envío, todo lo del envío vive junto: `index.html#envios` + `src/styles/argentina.css` + `src/modules/argentina.js`. Nada de cazar imports por 14 archivos.

---

## 🍷 Filosofía de código

Las mismas reglas que aplica don Norberto al fierro, aplicadas al código:

| En el taller | En el repo |
|---|---|
| Chapa SAE 1010, sin atajos | Vanilla JS, sin frameworks por moda |
| 1,6 mm aunque cueste más | 25+ módulos chiquitos en vez de 3 mega-archivos |
| Soldadura por arco, no por puntos | `<picture>` con srcset real, no un `<img>` de 2MB |
| Si no aguanta 600°C, no sirve | Si no funciona en Android 8 con 2GB de RAM, no sirve |
| El parrillero conoce su parrilla | El que toca el código tiene que poder leerlo en una tarde |
| Garantía: cinco años | Cero CSS abandonado, cero TODOs viejos |

---

## 🛒 Cómo agregar un producto al catálogo

Editás `src/modules/products.js`. Cada producto es un objeto:

```js
{
  id: 'identificador-unico',
  family: 'asadores',                          // ver FAMILIES arriba del archivo
  name: 'Asador Criollo Grande',
  size: '110 × 50 cm',
  image: '/images/catalog/_MG_2875.webp',      // o null = placeholder elegante
  desc: 'El cruz de toda la vida. Para corderos...',
  specs: {
    'Medidas': '110 × 50 cm',
    'Para': 'Cordero entero',
    'Patas': 'Regulables'
  },
  price: 185000
}
```

Las familias actuales: `asadores · parrillas · discos · carros · fogoneros · quemadores · rockets · planchas · extras`. Si querés una familia nueva, agregala en el array `FAMILIES` al inicio del archivo y listo — el filtro se autocompleta.

### Cuando llegan fotos nuevas

1. Tirá los originales en `Fotos de parillas/` (con fondo) o `PARRILLAS-sin fondo/` (sin fondo).
2. Editá `scripts/convert-images.js` agregando el nombre a `ATMOSPHERE_PICKS` / `HERO_PICKS` (las "sin fondo" se procesan todas automáticamente).
3. `npm run images` — genera las 2-3 variantes WebP optimizadas. Los JPG originales no se tocan.

---

## 📱 Perfilado para pueblos chicos

> *Argentina es un país largo con conexión despareja. Si el sitio anda en La Quiaca, anda en cualquier lado.*

Detectamos automáticamente el dispositivo en `perf.js` y bajamos efectos según el "tier":

| Efecto | high (desktop bueno) | mid (teléfono ok) | low (Android viejo / save-data) |
|---|---|---|---|
| Cursor pala + humo | ✅ con trail | – | – |
| Parallax del hero | ✅ | ✅ | – |
| Vitrina infinita | ✅ veloz | ✅ lenta | – |
| Globo rotando | ✅ | ✅ | static |
| Partículas al click | 40 | 24 | 12 |
| Backdrop blur | ✅ | ✅ | – |
| Hero background | full WebP | -sm WebP | gradiente CSS |
| Filtros saturate/contrast | ✅ | ✅ | sólo sepia |
| Polaroids hover lift | ✅ | ✅ | – |

Para probar el modo "low" en tu desktop:

```js
// Abrí DevTools console y pegá:
document.documentElement.classList.remove('perf-high', 'perf-mid');
document.documentElement.classList.add('perf-low');
location.reload();   // opcional, para re-init módulos
```

Vas a ver todo el contenido intacto pero sin parpadeos. Es el sitio que ven los del interior con Tecno de 2GB.

### Las cuentas del verdulero

| Concepto | Tamaño gzipped |
|---|---|
| `index.html` | 12 KB |
| Todo el CSS (12 archivos en uno) | 11 KB |
| Main JS bundle (con GSAP adentro) | 40 KB |
| Hero -xs (foto de 720px) | 84-144 KB |
| **Total first paint en mobile 3G** | **~210 KB** |
| `argentina.js` (lazy, sólo al scroll a envíos) | 1.25 KB |
| `howler.js` (lazy, sólo si tocan Tango) | 10 KB |

**LCP esperado en 3G argentino: <1.5s.** Cloudflare sirve desde edge con HTTP/3 + Brotli.

---

## ✍ Lo que falta reemplazar antes de salir a producción

### 🔴 Bloqueante

- **WhatsApp real** — placeholder `+54 9 11 0000-0000` en 4 lugares:
  - `src/modules/cart.js` (función checkout)
  - `src/modules/catalog.js` (`whatsappLink`)
  - `src/modules/medida.js` (form a medida)
  - `index.html` (footer + FAB)
- **Precios reales** — en `src/modules/products.js` los `price: 185000` son placeholders. Norberto los confirma y se actualizan en un commit.
- **Música tango** — un `tango.mp3` en `public/audio/`. Opciones legales: Free Music Archive, YouTube Audio Library sección "Latin", o Piazzolla si tenés los derechos. ~1-2 MB max.

### 🟡 Importante

- **Mail de contacto** real reemplazando `hola@asadoresnorberto.com.ar`
- **Datos verdaderos en la historia** — la timeline 1958 → hoy está construida sobre el dato real ("Norberto, La Matanza, tres generaciones"). Si la abuela era de Galicia y no de Calabria, lo corregimos en una pasada. Las cards viven en `index.html#historia`.

### 🟢 Cuando se pueda

- **Fotos de las 15 modelos sin foto** — actualmente sólo 10 tienen foto sin fondo, el resto muestra un SVG de "foto pronto". Cuando lleguen, van a `public/images/catalog/` + actualizar el campo `image` del producto.
- **Mercado Pago** — por ahora el cobro se coordina por WhatsApp (Norberto manda el link de MP en chat). Si más adelante quieren cobrar online directo, hay que crear una preference con backend Node + `mercadopago` SDK.
- **Idioma inglés** — si vienen consultas de afuera, agregamos `lang=en` con el mismo HTML traducido.

---

## 🌎 Deploy

Cubierto en detalle en [DEPLOY.md](./DEPLOY.md). Resumen:

- **Cloudflare Pages** (recomendado): conectar el repo desde el dashboard, build command `npm run build`, output `dist`, branch `main`. Auto-deploy en cada push.
- **GitHub Actions**: workflow `.github/workflows/cloudflare-pages.yml` ya está listo. Necesita 2 secrets (`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`) y queda automático.

URL de producción cuando esté: `https://asadores-norberto.pages.dev` (y después el dominio propio).

---

## 📍 La dirección verdadera

```
🇦🇷  Calle Dora Catalina Fleitas 740
    Luis Guillón, Partido de Esteban Echeverría
    Buenos Aires (CP B1838BHC)
    Argentina

📞  WhatsApp: pendiente
✉   hola@asadoresnorberto.com.ar (pendiente)
🕐  Lun-Vie 8:00-17:00 · Sáb 9:00-13:00 · Dom cerrado (asando)

🗺  -34.7993254, -58.4602667
```

---

## 🙋 Cosas que te vas a preguntar

<details>
<summary><b>¿Por qué no React/Next/Astro?</b></summary>

Porque para una landing de 25 productos y un carrito que termina en WhatsApp, traer 200KB de framework es como pedir un colectivo para cruzar la calle. Vanilla JS con módulos chiquitos es más rápido, más liviano, y lo mantiene cualquiera. Si algún día este sitio se transforma en un e-commerce serio con cuentas de usuario y backend propio, ahí lo migramos. Mientras tanto, KISS.

</details>

<details>
<summary><b>¿GSAP no es pago?</b></summary>

Era. Webflow compró Greensock en 2024 y liberó todo (incluyendo ScrollTrigger, MorphSVG, SplitText). Ahora es MIT-like libre para uso comercial. Si alguna vez vuelve a ser pago, lo cambiamos por Motion One sin drama.

</details>

<details>
<summary><b>¿Por qué WebP y no AVIF?</b></summary>

AVIF es ~20% más chico pero no lo soportan Android < 12, ni iOS < 16, ni varios browsers chinos. WebP lo soporta hasta el celular del primo, y ya recortamos los originales de 1.7GB a 14MB. Por ahora WebP es el sweet spot. Cuando AVIF tenga 95% de adopción global, lo agregamos como `<source type="image/avif">` antes del WebP.

</details>

<details>
<summary><b>¿Por qué autoplay del tango está desactivado?</b></summary>

Porque todos los browsers modernos lo bloquean por defecto (autoplay policy). Y porque autoplay con sonido es la cosa más invasiva que existe en la web. Lo que SÍ hacemos: cuando el usuario toca el bife del intro, eso cuenta como "gesture" y desbloquea el audio. Ahí intentamos arrancar el tango bajito. Si el usuario lo apaga, se queda apagado. Más respetuoso, más legal.

</details>

<details>
<summary><b>¿No es muy decorativo el filete porteño?</b></summary>

Es exactamente lo que tiene que ser. El filete es **patrimonio cultural inmaterial argentino** (UNESCO 2015) y es la estética visual de los gremios populares: parrilleros, carniceros, fileteros, choriperreros. Aplicarlo acá no es decoración: es señalar de qué lado de la cocina estamos. Si fuera una parrilla "premium gourmet de diseño minimalista", iríamos por otro lado. Pero no es eso. Es la parrilla de don Norberto.

</details>

---

<div align="center">

## 🥩

**Hecho con fuego, chapa SAE 1010 y un poco de paciencia.**
*Para tres generaciones de la familia Norberto.*

[![Buenos Aires](https://img.shields.io/badge/desde-Buenos_Aires_🇦🇷-1e3a8a?style=flat-square)](https://www.google.com/maps?q=-34.7993254,-58.4602667)
[![Filete porteño](https://img.shields.io/badge/dise%C3%B1ado-en_filete_porteño-8b0e0e?style=flat-square)](https://es.wikipedia.org/wiki/Fileteado)

```
              )    )
             (    (
        .---.----.---.
        | * | ░░ | * |
        '---'----'---'
        ║   ║░░░░║   ║
        ╚═══╧════╧═══╝
         ░░░░░░░░░░░
            ▓▓▓▓▓
```

</div>
