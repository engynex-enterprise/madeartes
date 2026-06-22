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
    ├── pages/index.astro   # ensambla la página
    └── components/
        ├── Nav, Hero, Partners, Services, Projects, WhyUs,
        │   Reviews, Faq, Cta, Contact, Footer, WhatsAppFloat, Brand
        └── analytics/      # GoogleTagManager, GoogleGtag (GA4 + Ads)
```

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
