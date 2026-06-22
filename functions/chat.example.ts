/**
 * Función serverless de ejemplo para el asistente de IA de Madeartes.
 * ---------------------------------------------------------------------------
 * Conecta el chat del sitio con Claude (Anthropic). Es OPCIONAL: si no la
 * despliegas, el chat funciona en "modo guiado" con respuestas predefinidas.
 *
 * CÓMO USARLA
 * 1. Instala el SDK:           npm install @anthropic-ai/sdk
 * 2. Crea la variable secreta: ANTHROPIC_API_KEY=sk-ant-...   (en el panel del hosting)
 * 3. Despliega esta función (Vercel: /api/chat.ts · Netlify: netlify/functions/chat.ts).
 * 4. Apunta el sitio a su URL: PUBLIC_AI_CHAT_ENDPOINT="https://tu-dominio/api/chat"
 *
 * IMPORTANTE: la API key NUNCA va en el frontend. Vive solo aquí, en el servidor.
 *
 * El frontend envía:  { messages: [{ role: "user" | "assistant", content: string }] }
 * Esta función responde: { reply: string }
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // lee ANTHROPIC_API_KEY del entorno

const SYSTEM = `Eres el asistente virtual de Madeartes, un negocio colombiano que
diseña y fabrica muebles de madera a medida para hogar y empresa (cocinas integrales,
closets, comedores, mobiliario corporativo).

Tu objetivo es ayudar a resolver dudas y guiar al cliente hacia una cotización.
- Responde en español, cálido, breve y claro (2-4 frases).
- Datos útiles: proyectos a medida; entrega típica 2 a 5 semanas; instalación incluida;
  garantía en cada trabajo; cobertura en toda Colombia.
- No inventes precios exactos: el costo depende del diseño, materiales y medidas;
  invita a una cotización sin costo.
- Cuando el cliente muestre intención de comprar o pida precio, sugiere continuar por
  WhatsApp al 315 437 7743.
- Si no sabes algo, ofrece conectar con un asesor humano por WhatsApp.`;

// Handler estándar (Web Fetch API: Vercel Edge, Netlify, Cloudflare, etc.)
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const { messages } = await request.json();
    if (!Array.isArray(messages)) {
      return json({ error: "messages requerido" }, 400);
    }

    // Solo conservamos los últimos 20 turnos y validamos los roles.
    const history = messages
      .slice(-20)
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m: any) => ({ role: m.role, content: m.content }));

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 512,
      system: SYSTEM,
      messages: history,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return json({ reply: reply || "¿Te conecto con un asesor por WhatsApp?" });
  } catch (err) {
    console.error("chat error:", err);
    return json({ error: "internal_error" }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
