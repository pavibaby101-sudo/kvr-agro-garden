const GROQ_KEY = process.env.GROQ_API_KEY!;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are KVR Agro Gardens' plant expert assistant. You help customers with:
- Plant care, watering, sunlight, soil requirements
- Pest control and plant health
- Gardening tips for Kerala's tropical climate
- Recommendations for indoor/outdoor plants
- Information about our nursery in Nemmara, Palakkad, Kerala

Be friendly, concise, and helpful. If asked about specific plants from our catalog, mention them. Keep responses under 150 words unless more detail is needed. Use a warm, approachable tone.`;

export async function chatWithGroq(messages: ChatMessage[]): Promise<string> {
  const groqMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
  ];

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!res.ok) throw new Error("Groq failed");
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";
  } catch {
    return chatWithGeminiFallback(messages);
  }
}

async function chatWithGeminiFallback(messages: ChatMessage[]): Promise<string> {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }],
    }));

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    return response.text || "I'm sorry, I couldn't process your request.";
  } catch {
    return "I'm experiencing technical difficulties. Please try again later or call us at +91 7909173649.";
  }
}
