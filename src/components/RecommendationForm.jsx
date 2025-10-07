import React, { useState } from "react";

export default function RecommendationForm({ onRecommend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onRecommend(input);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Search products like 'phone under $500'..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        🔍 AI Search
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "50px",
    padding: "8px 10px",
    border: "1px solid #ddd",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "50px",
    background: "transparent",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "50px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
};
