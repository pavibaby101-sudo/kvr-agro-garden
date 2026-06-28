import { GoogleGenAI } from "@google/genai";

const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY!;

async function callOpenRouter(prompt: string, system?: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        ...(system ? [{ role: "system", content: system }] : []),
        { role: "user", content: prompt },
      ],
      max_tokens: 2048,
    }),
  });
  if (!res.ok) throw new Error("OpenRouter failed");
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateText(prompt: string, system?: string): Promise<string> {
  if (gemini) {
    try {
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: system,
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });
      return response.text || "";
    } catch {
      // Fallback to OpenRouter
    }
  }

  try {
    return await callOpenRouter(prompt, system);
  } catch {
    return "";
  }
}

export async function generateDescription(data: {
  name: string;
  category: string;
  careLevel?: string;
  height?: string;
  sunlight?: string;
  waterNeeds?: string;
}): Promise<string> {
  const prompt = `Write a product description for a plant called "${data.name}".
Category: ${data.category}
${data.careLevel ? `Care Level: ${data.careLevel}` : ""}
${data.height ? `Height: ${data.height}` : ""}
${data.sunlight ? `Sunlight: ${data.sunlight}` : ""}
${data.waterNeeds ? `Water Needs: ${data.waterNeeds}` : ""}

Write 2-3 paragraphs. Friendly tone, suitable for an Indian plant nursery website in Kerala. Include care tips and why the customer should buy it. Do not use markdown formatting.`;

  const system = "You are a plant expert and copywriter for KVR Agro Gardens, a premium plant nursery in Nemmara, Palakkad, Kerala. Write compelling, accurate plant descriptions.";

  return generateText(prompt, system);
}

export async function generateBlogPost(topic: string, category?: string): Promise<{ title: string; excerpt: string; content: string }> {
  const prompt = `Write a blog post for a plant nursery website about: "${topic}"
${category ? `Category: ${category}` : ""}

Reply in this exact JSON format (no markdown, no code blocks):
{"title": "Your catchy title here", "excerpt": "A 2-3 sentence summary", "content": "The full blog post content, 300-500 words, with practical tips relevant to Kerala's tropical climate. Use paragraphs separated by double newlines."}`;

  const system = "You are a gardening expert writer for KVR Agro Gardens in Kerala, India. Always respond with valid JSON only, no extra text.";

  const text = await generateText(prompt, system);

  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      title: parsed.title || topic,
      excerpt: parsed.excerpt || "",
      content: parsed.content || "",
    };
  } catch {
    return {
      title: topic,
      excerpt: text.substring(0, 200),
      content: text,
    };
  }
}
