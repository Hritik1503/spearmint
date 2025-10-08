// src/lib/openrouter.js
export async function getAIRecommendations(products, userInput) {
  // 🧩 --- STEP 1: Extract price info from user input ---
  const rangeMatch = userInput.match(/\$?(\d+\.?\d*)\D{1,10}\$?(\d+\.?\d*)/); // e.g. between $500 and $1000
  const singlePriceMatch = userInput.match(/\$?(\d+\.?\d*)/);

  let minPrice = null;
  let maxPrice = null;

  if (rangeMatch) {
    minPrice = parseFloat(rangeMatch[1]);
    maxPrice = parseFloat(rangeMatch[2]);
  } else if (singlePriceMatch) {
    const value = parseFloat(singlePriceMatch[1]);
    if (/under|below|less than/i.test(userInput)) {
      maxPrice = value;
    } else if (/over|above|more than/i.test(userInput)) {
      minPrice = value;
    }
  }

  // 🧠 --- STEP 2: Prepare AI prompt ---
  const productText = products.map((p) => `${p.name} - $${p.price}`).join("\n");

  const prompt = `
  You are an intelligent product recommender system.
  
  Here is a list of available products:
  ${productText}
  
  User query: "${userInput}"
  
  Your task:
  1. Recommend only products relevant to the user's preferences (category, brand, etc.).
  2. Don't worry about numeric filtering — that will be handled automatically.
  3. Just output the product names that semantically match the query.
  4. Format strictly like this:
  [OUT]Product 1, Product 2, Product 3[/OUT]
  `;

  // ⚙️ --- STEP 3: Call OpenRouter API ---
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("No response from AI");
    }

    const text = data.choices[0].message.content.trim();
    const match = text.match(/\[OUT\]([\s\S]*?)\[\/OUT\]/);
    const rawNames = match ? match[1] : text;

    let names = rawNames
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    // 🧮 --- STEP 4: Match AI products locally ---
    let filteredProducts = products.filter((p) =>
      names.some((n) => p.name.toLowerCase().includes(n.toLowerCase()))
    );

    // 💰 --- STEP 5: Apply price filtering locally ---
    if (minPrice !== null && maxPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    } else if (maxPrice !== null) {
      filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice);
    } else if (minPrice !== null) {
      filteredProducts = filteredProducts.filter((p) => p.price >= minPrice);
    }

    // ✅ --- STEP 6: Return final product names ---
    return filteredProducts.map((p) => p.name);
  } catch (err) {
    console.error("OpenRouter Error:", err);
    throw new Error("Failed to fetch AI recommendations");
  }
}
