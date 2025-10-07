// src/lib/openrouter.js
export async function getAIRecommendations(products, userInput) {
    const productText = products
      .map((p) => `${p.name} - $${p.price}`)
      .join("\n");
  
    const prompt = `Here is a list of products:\n${productText}\n\nUser preference: "${userInput}".\n\nWhich products would you recommend? Just return product names inside [OUT] and [/OUT] tags. Example: [OUT]iPhone 14, Pixel 7[/OUT]`;
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      const data = await response.json();
  
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error("No response from AI");
      }
  
      const text = data.choices[0].message.content.trim();
  
      // ✅ Safe multiline regex
      const match = text.match(/\[OUT\]([\s\S]*?)\[\/OUT\]/);
      const rawNames = match ? match[1] : text; // fallback
  
      const names = rawNames
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
  
      return names; // return product names only
    } catch (err) {
      console.error("OpenRouter Error:", err);
      throw new Error("Failed to fetch AI recommendations");
    }
  }
  