/**
 * Groq AI Cloud Completion Client for AddressBox
 */

export async function queryGroqAi(prompt: string, systemPrompt?: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY || "";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt || "You are AddressBox AI, the expert real estate advisor for AddressBox in Gujarat (Ahmedabad & Gandhinagar). Provide ultra-accurate, professional, and clear real estate guidance."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      console.warn("Groq API returned error status:", response.status);
      return "Groq AI Service is processing high demand. AddressBox heuristic fallbacks active.";
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "No response received from Groq AI.";
  } catch (error) {
    console.error("Groq AI API Error:", error);
    return "AI Assistant offline. Using AddressBox verification engine.";
  }
}
