const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY!;

const cache = new Map<string, string>();

export async function searchUnsplash(query: string): Promise<string | null> {
  const cacheKey = query.toLowerCase().trim();
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const url = data.results?.[0]?.urls?.regular || null;
    if (url) cache.set(cacheKey, url);
    return url;
  } catch {
    return null;
  }
}

export async function generateImageWithNvidia(prompt: string): Promise<string | null> {
  const NVIDIA_KEY = process.env.NVIDIA_API_KEY!;
  if (!NVIDIA_KEY) return null;

  try {
    const res = await fetch(
      "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NVIDIA_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: 7,
          width: 1024,
          height: 768,
          steps: 30,
          samples: 1,
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const b64 = data.artifacts?.[0]?.base64;
    if (!b64) return null;
    return `data:image/png;base64,${b64}`;
  } catch {
    return null;
  }
}

export async function fetchPlantImage(plantName: string, scientificName?: string): Promise<string | null> {
  let url = await searchUnsplash(plantName);
  if (!url && scientificName) {
    url = await searchUnsplash(scientificName);
  }
  if (!url) {
    url = await searchUnsplash(`${plantName} plant nursery`);
  }
  if (!url) {
    url = await generateImageWithNvidia(`A beautiful ${plantName} plant in a pot, garden photography, natural lighting, high quality`);
  }
  return url;
}
