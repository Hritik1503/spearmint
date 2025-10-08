import React from "react";

export default function ProductList({ products }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✨ Recommended Products ✨</h2>
      <div style={styles.grid}>
        {products.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={styles.imageWrapper}>
              <img
                src={p.image || "https://via.placeholder.com/200x150"}
                alt={p.name}
                style={styles.image}
              />
            </div>
            <div style={styles.info}>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>${p.price}</p>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #0056b3, #007bff)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #007bff, #00c6ff)")
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    background: "linear-gradient(120deg, #f5f7fa, #e6ebf1)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
    color: "#1a1a1a",
    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },
  card: {
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  imageWrapper: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    borderBottom: "1px solid #eee",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.3s ease",
  },
  info: {
    padding: "16px",
    textAlign: "center",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  price: {
    color: "#007bff",
    fontWeight: "700",
    marginBottom: "12px",
    fontSize: "16px",
  },
  button: {
    background: "linear-gradient(135deg, #007bff, #00c6ff)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
};
