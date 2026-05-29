# Deploy a Cloudflare Pages

Tenés dos caminos. El **A** (UI) es más simple y no requiere tokens. El **B** (CI) hace el deploy automático en cada push y queda más prolijo.

---

## Camino A — Conectar el repo desde el dashboard de Cloudflare (recomendado para empezar)

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Autorizá Cloudflare a leer tu GitHub (una vez nada más) y elegí el repo `asadores-norberto`.
3. Configurar el build:
   - **Production branch**: `main`
   - **Framework preset**: *None* (es Vite vanilla)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: dejá vacío
   - **Environment variables**: no hace falta ninguna
4. **Save and Deploy** — Cloudflare clona el repo, builda y publica en ~30s.
5. Tu sitio queda en `https://asadores-norberto.pages.dev`.

A partir de ahí, cada `git push origin main` re-buildea y publica solo. Cada PR genera un *preview deploy* con su propia URL — útil para mostrar cambios antes de mergear.

### Dominio propio (cuando lo tengas)

En el dashboard del proyecto → **Custom domains** → agregar `asadoresdenorberto.com.ar` (o el que sea). Cloudflare te dice qué registros DNS poner. Si el dominio ya está en Cloudflare, es un click.

---

## Camino B — Deploy desde GitHub Actions (más control)

El archivo `.github/workflows/cloudflare-pages.yml` ya está listo. Activa el deploy automático en cada push a `main`. **No hace falta el Camino A**, son alternativos.

### Setup (una sola vez)

1. **Crear el proyecto vacío en Cloudflare Pages**
   - dashboard → **Workers & Pages** → **Create application** → **Pages** → **Direct upload**
   - Nombre: `asadores-norberto`
   - Subí cualquier `index.html` dummy nomás para crearlo (después el workflow lo reemplaza).

2. **Generar API token en Cloudflare**
   - [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → template **Edit Cloudflare Workers**
   - O custom token con permission: `Account → Cloudflare Pages → Edit`
   - Copiá el token (sólo lo ves una vez).

3. **Obtener Account ID**
   - dashboard → cualquier dominio → barra lateral derecha → "Account ID"

4. **Agregar los secrets en GitHub**
   - En el repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - `CLOUDFLARE_API_TOKEN` = el token del paso 2
   - `CLOUDFLARE_ACCOUNT_ID` = el ID del paso 3

5. **Push** — el próximo push a `main` dispara el workflow y publica.

### Probar manualmente

GitHub repo → tab **Actions** → workflow **Deploy to Cloudflare Pages** → **Run workflow**.

---

## Comandos útiles

```bash
# Build local
npm run build

# Preview del build localmente (puerto 4173)
npm run preview

# Test del build con Wrangler antes de deployar
npx wrangler pages dev dist --port 8788
```

## Performance esperada en producción

Cloudflare Pages sirve desde edge (300+ ciudades), HTTP/3, Brotli automático.
- **FCP** (First Contentful Paint): <800ms incluso en 3G argentino
- **LCP** (Largest Contentful Paint): <1.5s con hero-xs (~140KB)
- **TTI** (Time to Interactive): <2s — main JS pesa 40KB gzipped

Los hashes de los assets (`style-DGxTVzQd.css`) hacen que el cache sea eterno: los visitantes que vuelven cargan en <100ms.
