# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 🔐 Mini-Admin (`/mini-admin`)

Panel interno para gestionar el catálogo de productos (toggle activo/inactivo + crear producto).

### Causa del 404 original (toggle `is_active`)

El endpoint `src/pages/api/product-activate.ts` exportaba `export const post` (minúsculas). **Astro 5 requiere exports en MAYÚSCULAS** (`POST`, `GET`, etc.) — el handler no era reconocido, resultando en 404. Además, el endpoint era un stub que nunca tocaba la BD.

**Solución aplicada:** se eliminó el API route por completo. Ahora el admin usa **Supabase Auth** (login real con `signInWithPassword`) y llama directamente a Supabase desde el cliente con la sesión autenticada. Las operaciones de escritura (`UPDATE`, `INSERT`, Storage upload) están protegidas por **RLS** (solo `authenticated`).

### Variables de entorno necesarias

| Variable | Dónde | Requerida |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | Vercel + `.env` local | Sí |
| `PUBLIC_SUPABASE_ANON_KEY` | Vercel + `.env` local | Sí |

> No se necesita `SUPABASE_SERVICE_ROLE_KEY`. Toda la escritura pasa por la sesión autenticada + RLS.

### Configuración de Supabase (pre-requisito)

1. **Crear usuario admin** en Supabase Dashboard → Authentication → Users → "Add user" (email + password).

2. **Configurar RLS en tabla `products`** (reemplazar la policy existente):
   - `public_read` — `FOR SELECT`, role `anon`, `USING (is_active = true)` — público solo ve activos.
   - `admin_select_all` — `FOR SELECT`, role `authenticated`, `USING (true)` — admin ve todos.
   - `admin_write` — `FOR INSERT` y `FOR UPDATE`, role `authenticated`, `WITH CHECK (true)`.

3. **Configurar RLS en Storage (bucket `catalog`)**:
   - `SELECT` (download) para todos (imágenes públicas).
   - `INSERT` (upload) solo para `authenticated`.

4. **Asegurar que el bucket `catalog` sea público** (para que `getPublicUrl()` funcione sin token).

### Probar localmente

```bash
# 1. Crear .env con tus valores reales (ver .env.example)
# 2. Levantar dev server
npm run dev
# 3. Ir a http://localhost:4321/mini-admin
# 4. Login con el email/password del usuario admin creado en Supabase Auth
```

### Probar en Vercel

1. Asegurar que `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` estén en Vercel → Settings → Environment Variables.
2. Deploy (push a main o `vercel --prod`).
3. Ir a `https://tu-dominio.vercel.app/mini-admin`.
4. Login con las mismas credenciales de Supabase Auth.

### Funcionalidades del admin

- **Toggle activo/inactivo**: click en el botón "Sí"/"No" → actualiza `products.is_active` por `id` (uuid) → reflejo inmediato en UI sin recarga.
- **Crear producto**: formulario con nombre, descripción, precio, categoría (combo), opciones dinámicas (hasta 5, formato jsonb), e imagen (upload a Storage → `catalog/{categoria_slug}/{slug}.{ext}`).
- **Búsqueda**: filtro de texto sobre la tabla de productos.
