# Asadores de Norberto

Sitio de la fábrica de parrillas de la familia Norberto en Luis Guillón, Buenos Aires. Hecho con Vite + GSAP + Howler, vanilla JS modules, sin framework.

## Cómo correrlo

```bash
cd site
npm install   # sólo la primera vez
npm run dev   # abre http://localhost:5173
```

Para deploy a producción:

```bash
npm run build  # genera /dist
npm run preview
```

`dist/` se puede subir a Vercel, Netlify, Cloudflare Pages o cualquier hosting estático.

## Estructura

```
site/
├── index.html                 # markup de TODA la página (intro + showroom)
├── public/
│   ├── images/
│   │   ├── catalog/           # 10 fotos sin fondo de productos
│   │   ├── atmosphere/        # 12 fotos atmosféricas de la fábrica
│   │   └── hero/              # 3 fotos hero (alta resolución)
│   └── audio/                 # 👈 ACÁ VA tango.mp3
├── src/
│   ├── main.js                # entry point
│   ├── styles/                # base · filete · intro · cursor · sections · catalog · cart · responsive
│   └── modules/
│       ├── intro.js           # intro click → showroom
│       ├── cursor.js          # custom ember cursor + sparks
│       ├── products.js        # datos del catálogo (precios, medidas, fotos)
│       ├── catalog.js         # render del grid + filtros + modal
│       ├── cart.js            # carrito localStorage + WhatsApp + MP
│       ├── audio.js           # toggle de tango
│       ├── medida.js          # form "hecho a medida"
│       └── reveals.js         # scroll reveals + topbar + parallax
└── scripts/
    └── convert-images.js      # comprime fotos originales → WebP
```

## Cosas para reemplazar antes de salir a producción

### 🔴 OBLIGATORIO

- **Número de WhatsApp**: en este momento es un placeholder `+54 9 11 0000-0000`. Reemplazar en:
  - `src/modules/cart.js` → línea con `5491100000000`
  - `src/modules/catalog.js` → función `whatsappLink`
  - `src/modules/medida.js` → URL del fetch
  - `index.html` → footer (`#footer-wa`)

- **Precios reales**: en `src/modules/products.js` los precios son placeholders en ARS. Confirmar con Norberto y actualizar el campo `price` de cada producto.

- **Música de tango**: poner un archivo `tango.mp3` en `public/audio/`. Sugerencias libres de regalías:
  - Free Music Archive – buscar "tango milonga"
  - YouTube Audio Library – sección "Latin"
  - Si tenés Piazzolla con derechos, mejor

### 🟡 IMPORTANTE

- **Mercado Pago link**: por ahora el botón "Pagar con Mercado Pago" muestra un alert. Para activarlo, crear una preference de MP por backend (Node + `mercadopago` SDK) o usar links estáticos por producto.

- **Email de contacto**: `hola@asadoresnorberto.com.ar` → real.

- **Foto de la fábrica para el bloque "Hecho a medida"**: ahora usa `atmosphere/_MG_2934.webp` (soldadura). Si tenés una foto mejor de Norberto soldando, reemplazar el `<img>` en `index.html`.

### 🟢 OPCIONAL

- **Historia de la familia**: en `index.html` la timeline 1958 → hoy es una construcción artística sobre la base de "Norberto, fábrica en La Matanza, tres generaciones". Confirmar con la familia los datos reales (origen del abuelo, año de fundación verdadero, etc.) y editar las `<article class="historia-card">`.

- **Foto del hero**: ahora `atmosphere/_MG_2998.webp`. Si querés otra atmosférica, cambiar `background-image` en `.hero-bg` (en `src/styles/sections.css`).

- **Asignación de fotos a productos**: 10 productos tienen foto, los demás muestran un SVG de "foto pronto". Cuando tengas más fotos sin fondo, agregarlas a `public/images/catalog/` y actualizar el campo `image` del producto en `products.js`.

## Cómo agregar/editar productos

Editar `src/modules/products.js`. Cada producto es:

```js
{
  id: 'identificador-unico',           // se usa para el carrito
  family: 'asadores',                  // ver FAMILIES al inicio del archivo
  name: 'Asador Criollo Grande',
  size: '110 × 50 cm',
  image: '/images/catalog/_MG_XXXX.webp', // o null para placeholder
  desc: 'Texto descriptivo...',
  specs: { 'Medidas': '...', 'Patas': '...' }, // pares clave/valor para el modal
  price: 185000                        // en ARS, sin formato
}
```

Las familias actuales:
- `asadores` Asadores criollos
- `parrillas` Parrillas
- `discos` Discos
- `carros` Carros asadores
- `fogoneros` Fogoneros
- `quemadores` Quemadores
- `rockets` Rockets
- `planchas` Planchas
- `extras` Duomo, sets, etc.

## Reprocesar fotos

Si llegan fotos nuevas:

1. Tirá las originales en `Fotos de parillas/` (o `PARRILLAS-sin fondo/` si están sin fondo).
2. Editá `scripts/convert-images.js` y agregá los nombres a `ATMOSPHERE_PICKS` o `HERO_PICKS`.
3. Corré:

```bash
npm run images
```

Esto te genera los WebP optimizados en `public/images/`. Las originales JPG no se tocan.

## Accesibilidad / Performance

- Respeta `prefers-reduced-motion`: si el usuario lo tiene activado, no hay animaciones, no hay sparks de cursor, no hay parallax.
- El cursor custom se oculta automáticamente en mobile y touch.
- Las imágenes hero/atmosphere están en WebP comprimido (1.7GB de originales → ~10MB optimizados).
- Las fotos del catálogo usan `loading="lazy"`.
- Intro se muestra una vez por sesión (sessionStorage). Para verlo de nuevo: F12 → Application → Session Storage → borrar `norberto.intro.shown`.

## Dirección de la fábrica

> Calle Dora Catalina Fleitas
> Luis Guillón, Esteban Echeverría
> Buenos Aires (CP B1838BHC)
> Argentina
> Coordenadas: -34.7993254, -58.4602667

El embed de Google Maps en la sección "Visitanos" usa esas coordenadas. Si la dirección exacta es diferente (ej. tiene número de calle), editar:
- El bloque `<address>` en `index.html` (sección `#fabrica`)
- Las URLs de los iframes (también en `#fabrica`)

---

Hecho con 🔥 para tres generaciones de la familia Norberto.
