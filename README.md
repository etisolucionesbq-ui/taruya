# TARUYA / Esparragoza Music

Reconstruccion premium del press kit publico de Esparragoza Music como plataforma artistica moderna, cinematografica y administrable con Sanity.

## Stack

- Next.js 15 con App Router
- TypeScript estricto
- Tailwind CSS 4
- Framer Motion
- Sanity Studio embebido en `/studio`
- SEO con metadata dinamica, Open Graph, sitemap y robots
- Forms para contacto y newsletter listos para conectar a CRM/email
- Formulario de contacto conectado a SMTP de Hostinger

## Instalacion

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y configura:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=

SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=booking@taruyamusic.com
SMTP_PASS=clave_del_correo_en_hostinger
SMTP_FROM=booking@taruyamusic.com
SMTP_FROM_NAME=TARUYA Web
CONTACT_BOOKING_TO=booking@taruyamusic.com
CONTACT_INFO_TO=info@taruyamusic.com
CONTACT_LEGAL_TO=legal@taruyamusic.com
CONTACT_ACCOUNTING_TO=contabilidad@taruyamusic.com
CONTACT_ROYALTIES_TO=royalties@taruyamusic.com
CONTACT_PUBLISHING_TO=publishing@taruyamusic.com
CONTACT_BCC=
```

Si Sanity no esta configurado, la web usa el contenido fallback extraido del sitio original y los assets locales en `public/media/source`.

## Formulario de contacto

El endpoint `src/app/api/contact/route.ts` envia correos reales usando Nodemailer y el SMTP de Hostinger. El formulario permite elegir el area y solo enruta a los correos autorizados:

- Booking: `booking@taruyamusic.com`
- Info / prensa: `info@taruyamusic.com`
- Legal: `legal@taruyamusic.com`
- Contabilidad: `contabilidad@taruyamusic.com`
- Royalties: `royalties@taruyamusic.com`
- Publishing: `publishing@taruyamusic.com`

En Vercel agrega las variables SMTP en Project Settings > Environment Variables. `SMTP_PASS` debe ser la clave real del buzon `SMTP_USER` en Hostinger.

## Sanity CMS

El Studio vive en:

```bash
http://localhost:3000/studio
```

Schemas incluidos:

- Noticias
- Eventos
- Discografia
- Canciones
- Videos
- Galeria
- Banners
- Links sociales
- Contactos
- Artist settings

Para cargar en Sanity los datos base que ya se ven en la web:

```bash
npm run sanity:seed
```

Necesitas `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` y `SANITY_API_WRITE_TOKEN` con permisos de escritura. El seed crea documentos editables para settings, discografia, videos, noticias, eventos, galeria, redes y contactos.

## Extraccion del sitio fuente

El proyecto incluye un extractor reproducible para refrescar contenido publico del Google Site:

```bash
npm run source:extract
```

Genera:

- `content/source-cache.json`
- imagenes sincronizadas en `public/media/source-sync`

El primer set de assets oficiales ya fue copiado a `public/media/source` para que la experiencia funcione offline/local sin hotlinks.

## Deploy

### Vercel

```bash
npm install
npm run build
```

`vercel.json` ya define framework, build e install command.

En Vercel configura estas variables en `Project Settings > Environment Variables`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` si usas dataset privado
- Variables SMTP de Hostinger para el formulario

Despues del deploy, entra al Studio desde:

```bash
https://tu-dominio.com/studio
```

El link de Studio no aparece en la pagina publica. Para que el Studio funcione en produccion, agrega el dominio de Vercel en Sanity Manage > API > CORS Origins con credenciales habilitadas.

### Netlify

`netlify.toml` incluye:

- `npm run build`
- publish `.next`
- `@netlify/plugin-nextjs`

## Produccion

Antes de publicar:

```bash
npm run typecheck
npm run build
```
