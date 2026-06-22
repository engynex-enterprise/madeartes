# Madeartes — Sitio web (Astro)

Sitio web profesional para **Madeartes**, negocio de muebles de madera a medida para hogar y empresa.
Construido con **Astro**, iconos **Lucide** (`astro-icon`) y sitemap automático.

## Requisitos

- Node.js 18+ (probado en Node 23)

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo -> http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # previsualiza el build de producción
```

## Estructura

```
madeartes/
├── astro.config.mjs        # config + integraciones (sitemap, icon)
├── .env / .env.example     # variables (WhatsApp + Google)
├── public/                 # favicon, robots.txt (se copian tal cual)
└── src/
    ├── config/site.ts      # lee el .env y centraliza la configuración
    ├── layouts/Layout.astro# <head>, SEO, datos estructurados, scripts Google
    ├── styles/global.css   # paleta tonos madera/nogal
    ├── layouts/Layout.astro# Nav + Footer + chat + SEO (compartido por todas las páginas)
    ├── pages/              # sitio MULTIPÁGINA (una ruta por archivo):
    │   ├── index.astro            # /            Inicio
    │   ├── servicios.astro        # /servicios
    │   ├── proyectos.astro        # /proyectos
    │   ├── nosotros.astro         # /nosotros
    │   ├── contacto.astro         # /contacto
    │   ├── terminos.astro         # /terminos
    │   ├── privacidad.astro       # /privacidad
    │   ├── tratamiento-datos.astro# /tratamiento-datos
    │   └── cookies.astro          # /cookies
    └── components/
        ├── Nav, Hero(slider), Partners, Services(bento), Projects(filtrable),
        │   Process(timeline), ARSection, WhyUs, Reviews, Faq, Cta, Contact,
        │   Footer, WhatsAppFloat, AIChat, Interactions, Brand
        └── analytics/      # GoogleTagManager, GoogleGtag (GA4 + Ads)

functions/chat.example.ts   # función serverless de ejemplo (chat con Claude)
```

## Asistente de IA (chat)

Chat flotante con dos modos:
- **Guiado (por defecto):** base de conocimiento local (FAQ) + derivación a WhatsApp. Sin backend.
- **IA (opcional):** define `PUBLIC_AI_CHAT_ENDPOINT` y el chat conversa con **Claude**
  (`claude-opus-4-8`) vía [functions/chat.example.ts](functions/chat.example.ts).
  La `ANTHROPIC_API_KEY` vive **solo en el servidor**, nunca en el frontend.

## Realidad Aumentada

La sección "Ver en 3D" usa [`<model-viewer>`](https://modelviewer.dev) (de Google): gira el
mueble en 3D y, desde el celular, "Ver en tu espacio" lo coloca con la cámara (iOS/Android).
Reemplaza los modelos con `PUBLIC_AR_MODEL_GLB` (Android/3D) y `PUBLIC_AR_MODEL_USDZ` (iOS).

## Configuración de Google y WhatsApp (`.env`)

Copia `.env.example` a `.env` y completa con tus IDs. **Solo se cargan los scripts
de las variables que tengan valor** (si están vacías, no se inyecta nada):

| Variable | Para qué sirve | Formato |
|---|---|---|
| `PUBLIC_WHATSAPP` | Número que recibe el formulario | `573154377743` |
| `PUBLIC_SITE_URL` | Dominio (SEO, canonical, sitemap) | `https://www.madeartes.com` |
| `PUBLIC_GTM_ID` | Google Tag Manager | `GTM-XXXXXXX` |
| `PUBLIC_GA4_ID` | Google Analytics 4 | `G-XXXXXXXXXX` |
| `PUBLIC_GOOGLE_ADS_ID` | Google Ads | `AW-XXXXXXXXXX` |
| `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Etiqueta de conversión (envío del formulario) | `AbC-D_efGH...` |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificación de Search Console | meta content |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | (Opcional) mapa de ubicación a futuro | API key |

> Todas llevan prefijo `PUBLIC_` porque los scripts de Google se ejecutan en el navegador.

### Conversiones

Al enviar el formulario de contacto se dispara automáticamente:
- una **conversión de Google Ads** (`gtag('event','conversion')`) si `PUBLIC_GOOGLE_ADS_ID`
  y `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` están definidos;
- un evento **`generate_lead`** al `dataLayer` (para GA4 / GTM).

## Formulario → WhatsApp

Valida los campos y abre WhatsApp con el mensaje ya redactado hacia el número
configurado en `PUBLIC_WHATSAPP` (por defecto **+57 315 437 7743**).

## Despliegue

El build es estático (`dist/`), ideal para **Netlify, Vercel, Cloudflare Pages o
GitHub Pages**. Recuerda configurar las variables de entorno en el panel del hosting.

## Notas

- Las imágenes son de Unsplash (placeholders). Reemplázalas por fotos reales de tus
  proyectos para mayor conversión.
- Antes de publicar, ajusta `PUBLIC_SITE_URL` y el dominio en `public/robots.txt`.
