import { useState } from "react";
import RecommendationForm from "./components/RecommendationForm";
import ProductList from "./components/ProductList";
import { products } from "./data/products";
import { getAIRecommendations } from "./lib/openrouter";

export default function App() {
  const [recommended, setRecommended] = useState(products); // show all by default
  const [error, setError] = useState(null);

  const handleRecommend = async (userInput) => {
    setError(null);
    try {
      const names = await getAIRecommendations(products, userInput);
      const matched = products.filter((p) =>
        names.some((name) => p.name.toLowerCase().includes(name.toLowerCase()))
      );
      setRecommended(matched.length ? matched : []);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching recommendations.");
      setRecommended([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 p-6">
      <header className="flex items-center justify-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 flex items-center gap-2">
          <span role="img" aria-label="ai">🧠</span>
          AI Product Recommender
        </h1>
      </header>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <RecommendationForm onRecommend={handleRecommend} />
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <ProductList products={recommended} />
      </div>
    </div>
  );
}
