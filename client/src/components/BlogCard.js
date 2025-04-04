<div className="blog-card" style={{
  borderRadius: "10px",
  backgroundColor: "#ffe4e1", // Light pink background color
  padding: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "15px"
}}>
  <h2 style={{ color: "#333" }}>{blog.title}</h2>
  <p style={{ color: "#555" }}>{blog.description}</p>
  <p style={{ color: "#777" }}>Type: {blog.category}</p>
</div>