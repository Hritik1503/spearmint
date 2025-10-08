import { useState } from "react";
import RecommendationForm from "./components/RecommendationForm";
import ProductList from "./components/ProductList";
import { products } from "./data/products";
import { getAIRecommendations } from "./lib/openrouter";

export default function App() {
  const [recommended, setRecommended] = useState(products);
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
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 AI Product Recommender</h1>
      </header>

      <main style={styles.main}>
        <RecommendationForm onRecommend={handleRecommend} />
        {error && <p style={styles.error}>{error}</p>}
        <ProductList products={recommended} />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #e0f2fe, #dbeafe, #bfdbfe)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    textAlign: "center",
    padding: "40px 0 20px",
    background: "transparent",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#1e3a8a",
    textShadow: "0 3px 6px rgba(0,0,0,0.1)",
  },
  main: {
    flex: 1,
    width: "100%",
    maxWidth: "1400px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    padding: "30px 40px",
    marginBottom: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    overflowY: "auto",
  },
  error: {
    color: "#dc2626",
    textAlign: "center",
    marginTop: "12px",
    fontWeight: "500",
  },
};
