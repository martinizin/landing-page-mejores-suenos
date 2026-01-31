# Plan de desarrollo por fases — Landing + Catálogo + Admin (Astro + Supabase)

> **Objetivo del documento:** servir como guía de ejecución y monitoreo **fase por fase**.  
> **Regla clave:** **NO avanzar a la siguiente fase** hasta que **Martín** lo solicite explícitamente (por ejemplo: “Avanza a Fase 2”).  
> **Stack fijo (no cambiar):** Astro (TS) + Tailwind + React islands solo en /admin + Supabase (Postgres + Auth + Storage) + Cloudflare Pages.  
> **Dependencias:** instalar **solo** lo estrictamente necesario (ver sección “Dependencias permitidas por fase”).

---

## 0) Contexto y alcance (resumen)


### Fuente de inventario (input del proyecto)
- Existe el archivo **`inventario.txt`** con el listado de **modelos**, **opciones/plazas/medidas** y **precios** para Colchones y Almohadas.
- Este archivo se usará como **fuente de verdad** para:
  - crear/validar el *mock catalog* (Fase 1–2),
  - preparar la **carga inicial (seed)** en Supabase (Fase 3),
  - verificar que el **dropdown de opciones/plazas** y los **precios** se muestran correctamente en el detalle de producto.
- **Imágenes (.webp):** se gestionan por separado (Storage) y deben mapearse a cada modelo.


### Páginas públicas
- **Home**: hero/banner, navegación, secciones, y **footer contacto**.
- **Colchones**: listado de productos (cards) + buscador.
- **Almohadas**: listado de productos (cards) + buscador.
- **Detalle de producto**: información del producto + dropdown de **plazas/opciones** + botones **Comprar** y **WhatsApp** (ambos redirigen al WhatsApp del vendedor).
- Texto fijo debajo de cada producto: **“El precio incluye envío a nivel nacional.”**

### Admin
- Login (Supabase Auth).
- Listado de productos con toggle **mostrar/ocultar**.
- Crear producto:
  - subir imagen **.webp**
  - nombre modelo
  - opciones/plazas (lista)
  - precio
  - categoría (colchones/almohadas)
- (Entrega completa) editar producto y reemplazar imagen (si se solicita dentro de la fase).

---

## 1) Paleta de colores (extraída de tus referencias)

> Usar esta paleta **sin inventar colores nuevos** (solo variaciones de opacidad / tintes).  
> Recomendación: definirlos como tokens en Tailwind y **usar clases semánticas**.

**Colores base**
- **Primary Navy:** `#033494`
- **Primary Blue:** `#0557B8`
- **Blue (UI):** `#0762B3`
- **Accent Cyan:** `#05ADC8` (alternativa: `#0FC2D7` para elementos más vivos)
- **Dark Slate:** `#13242B`
- **Muted Slate:** `#677789`
- **Gray Light:** `#D5D7D6`
- **Gray Mid:** `#AAAAAB`
- **White:** `#FFFFFF`

**Gradiente recomendado (hero/banners)**
- `linear-gradient(90deg, rgba(3,52,148,0.92), rgba(5,87,184,0.78))`

---

## 2) Estructura de proyecto sugerida (SOLID friendly)

> Separar responsabilidades: UI / Data / Utils / Config.  
> Evitar lógica de negocio dentro de componentes.

```
src/
  pages/
    index.astro
    colchones.astro
    almohadas.astro
    producto/[slug].astro
    admin/...
  components/
    layout/
      Header.astro
      Footer.astro
      HeroBanner.astro
    catalog/
      ProductCard.astro
      SearchBar.astro
      PriceTag.astro
      PlazaSelect.astro
    common/
      Button.astro
      Badge.astro
  lib/
    config/
      brand.ts         // tokens: colores, whatsapp, textos
    data/
      catalogRepo.ts   // interfaz + repos (mock/supabase)
      mockCatalog.ts
      supabaseClient.ts
    utils/
      slug.ts
      whatsapp.ts
public/
  images/...
```

### Principios a respetar (resumen)
- **S (Single Responsibility):** componentes UI solo renderizan; acceso a datos en repos.
- **O (Open/Closed):** repositorio intercambiable (mock → Supabase) sin reescribir UI.
- **L/I/D:** interfaces para data (`CatalogRepo`) y helpers puros (`whatsapp.ts`, `slug.ts`).

---

## 3) Dependencias permitidas por fase

> Si algo no está aquí, **NO instalarlo** sin aprobación de Martín.

- **Fase 1–2:** Solo Astro + Tailwind (y dependencias propias de Tailwind).
- **Fase 3:** `@supabase/supabase-js` (solo lectura para landing).
- **Fase 5 (Admin):** `@astrojs/react`, `react`, `react-dom` (solo para /admin).
  - Librerías extra (react-hook-form, zod, etc.): **solo si Martín las aprueba**. Por defecto, formularios con React básico + validación simple.

---

# FASE 1 — Base del proyecto + diseño UI base (landing “estática” con mock)

## Objetivo
Tener la landing navegable con el **look & feel** de las referencias, responsive, usando **datos mock** (sin Supabase aún), para validar UI/flujo visual rápidamente.

## Tareas
1. Instalar y configurar **Tailwind** en Astro (mínimo necesario).
2. Crear tokens de marca en `src/lib/config/brand.ts`:
   - colores (paleta)
   - número WhatsApp (placeholder)
   - texto fijo “incluye envío…”
3. Configurar `tailwind.config.*` con colores personalizados (ver paleta).
4. Crear layout global:
   - `Header` (logo + links: Home, Colchones, Almohadas + buscador)
   - `Footer` (Contacto, en Home)
5. Crear páginas vacías con layout:
   - `/` (Home)
   - `/colchones`
   - `/almohadas`
   - `/producto/[slug]` (solo estructura)
6. Componentes base:
   - `HeroBanner` (imagen + overlay + título)
   - `ProductCard` (estructura: imagen, nombre, precio, texto fijo)
   - `SearchBar` (solo UI, sin lógica)
7. Crear `mockCatalog.ts` con:
   - categorías: colchones, almohadas
   - 3–5 productos demo por categoría (imagen placeholder)
8. En listados: render de productos mock en grid responsive.

## Definition of Done (DoD)
- Navegación entre páginas funciona.
- UI respeta paleta y estilo de las referencias (hero azul, cards, buscador).
- Responsive básico (mobile/desktop).
- **NO** hay llamadas a Supabase aún.
- Commit: `feat(phase1): base landing ui + mock catalog`.

---

# FASE 2 — Flujo completo público (búsqueda + detalle + WhatsApp) usando mock

## Objetivo
Validar el **flujo completo del cliente** con datos mock: listado → detalle → selección de plaza → WhatsApp.

## Tareas
1. Implementar lógica del buscador (client-side):
   - filtra por `name` (y opcional por descripción).
2. Implementar detalle `/producto/[slug]` (mock):
   - imagen, nombre, precio, descripción
   - dropdown de plazas/opciones (desde `options`)
   - texto fijo “incluye envío…”
3. Implementar `whatsapp.ts`:
   - construir `wa.me` con mensaje URL-encoded
   - incluir producto + plaza + precio
4. Botones en detalle:
   - **Comprar** y **WhatsApp**: mismo destino (link) y estilos diferentes
5. Añadir botón flotante WhatsApp global (opcional).
6. Estados UX mínimos:
   - producto no encontrado (404 simple)
   - deshabilitar “Comprar” hasta elegir plaza (recomendado)

## DoD
- Desde listado se entra al detalle.
- Selección de plaza afecta el mensaje de WhatsApp.
- Botones abren WhatsApp correctamente (enlace).
- Responsive pulido en listado + detalle.
- Commit: `feat(phase2): public flow search + detail + whatsapp (mock)`.

---

# FASE 3 — Integración Supabase para la landing (solo lectura)

## Objetivo
Reemplazar el mock por datos reales desde Supabase para **categorías y productos activos**, sin tocar aún el admin.

## Tareas
0. **Carga inicial (seed) desde `inventario.txt`:** insertar categorías y productos (nombre, precio, opciones/plazas/medidas) como base para el catálogo.
1. Crear proyecto en Supabase:
   - tablas: `categories`, `products`
   - bucket storage: `catalog`
2. Modelo mínimo:
   - `products`: `slug, name, description, price, options, image_url, is_active, category_id`
3. RLS mínimo:
   - `categories`: `SELECT` público
   - `products`: `SELECT` público solo `is_active = true`
4. Integrar `@supabase/supabase-js`:
   - `supabaseClient.ts` con env vars
5. Implementar `CatalogRepo`:
   - `MockCatalogRepo` (existente)
   - `SupabaseCatalogRepo` (nuevo)
6. Cambiar páginas públicas para usar repo Supabase (sin reescribir UI).
7. Confirmar que el sitio funciona con 40 productos (rendimiento OK):
   - 1 consulta por categoría
   - filtrar búsqueda en frontend

## DoD
- Listados y detalle se alimentan desde Supabase.
- Solo se muestran productos `is_active=true`.
- Imágenes cargan desde `image_url` (Storage público o URL pública).
- Commit: `feat(phase3): supabase read integration for landing`.

---

# FASE 4 — Deploy + QA + SEO básico (landing lista para clientes)

## Objetivo
Tener la landing lista en producción (Cloudflare Pages), estable y rápida.

## Tareas
1. Configurar **Cloudflare Pages**:
   - build command `npm run build`
   - output `dist`
   - env vars públicas (Supabase)
2. QA manual:
   - mobile (390px) + desktop (1440px)
   - enlaces, WhatsApp, búsqueda, detalle
3. Performance:
   - lazy loading de imágenes
   - tamaños correctos
4. SEO básico:
   - title + meta description por página
   - OpenGraph mínimo
5. Documentación mínima:
   - `README.md` (run local, env vars, deploy)

## DoD
- Sitio desplegado y accesible.
- Flujo compra WhatsApp confirmado en prod.
- README mínimo listo.
- Commit: `feat(phase4): production deploy + qa + basic seo`.

---

# FASE 5 — Panel Admin (Auth + CRUD + Storage + RLS completo)

## Objetivo
Crear el admin para gestionar productos (mostrar/ocultar, crear, editar si se aprueba), usando React islands solo en `/admin`.

## Tareas
1. Instalar **solo lo necesario**:
   - `@astrojs/react`, `react`, `react-dom`
2. Auth:
   - pantalla `/admin/login`
   - sesión persistente
3. Autorización:
   - tabla `admins` (email o user_id)
   - RLS: solo admin puede INSERT/UPDATE en products
4. Admin UI:
   - `/admin/products` listado
   - toggle `is_active` (mostrar/ocultar)
   - `/admin/products/new` crear
5. Crear producto:
   - upload `.webp` → Storage
   - guardar `image_url`
   - nombre, precio, opciones/plazas (lista), categoría
6. (Opcional con aprobación) editar producto + reemplazar imagen.
7. Documentación admin:
   - cómo crear/ocultar productos

## DoD
- Login admin funciona.
- Crear producto sube webp y queda visible en landing.
- Toggle ocultar/mostrar impacta landing (is_active).
- RLS impide escrituras sin ser admin.
- Commit: `feat(phase5): admin panel (auth + crud + storage + rls)`.

---

## Checklist final (cuando Martín lo solicite)
- [ ] Catálogo completo (≈40 productos) cargado en Supabase
- [ ] Todas las imágenes en WebP y optimizadas
- [ ] Sitio responsive y estable
- [ ] Admin operativo y seguro
- [ ] Documentación y handoff

---

## Protocolo de control de fases (obligatorio)
Al finalizar cada fase, el ejecutor debe:
1. Publicar resumen de cambios (qué se completó).
2. Adjuntar checklist DoD con ✅/❌.
3. Indicar riesgos/bloqueos.
4. **Pedir autorización** antes de iniciar la siguiente fase.

**No se permite** comenzar una fase sin el mensaje explícito:  
> “Avanza a Fase X”
