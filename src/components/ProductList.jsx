import React from "react";

export default function ProductList({ products }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recommended Products</h2>
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image || "https://via.placeholder.com/200x150"}
              alt={p.name}
              style={styles.image}
            />
            <div style={styles.info}>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>${p.price}</p>
              <button style={styles.button}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "20px",
    color: "#222",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  info: {
    padding: "12px",
    textAlign: "center",
  },
  name: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "6px",
  },
  price: {
    color: "#007bff",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
