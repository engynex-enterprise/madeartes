// Configuración central del sitio. Lee las variables de entorno (.env)
// y expone valores con respaldo por defecto.

const env = import.meta.env;

export const site = {
  name: "Madeartes",
  title: "Madeartes | Muebles de madera a medida para hogar y empresa",
  description:
    "Madeartes diseña y fabrica muebles de madera a medida para hogares y empresas: cocinas, closets, comedores, escritorios y mobiliario corporativo. Calidad artesanal, entrega puntual. Cotiza por WhatsApp.",
  url: env.PUBLIC_SITE_URL || "https://www.madeartes.com",
  whatsapp: env.PUBLIC_WHATSAPP || "573154377743",
  whatsappPretty: "315 437 7743",
};

// Configuración de servicios de Google. Solo se cargan los scripts
// cuyas variables estén definidas en el .env.
export const google = {
  gtmId: env.PUBLIC_GTM_ID || "",
  ga4Id: env.PUBLIC_GA4_ID || "",
  adsId: env.PUBLIC_GOOGLE_ADS_ID || "",
  adsConversionLabel: env.PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "",
  siteVerification: env.PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  mapsApiKey: env.PUBLIC_GOOGLE_MAPS_API_KEY || "",
};

// Mensaje de conversión de WhatsApp con el número internacional listo.
export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
