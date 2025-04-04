<form onSubmit={handleSubmit}>
  <input
    type="text"
    name="title"
    placeholder="Enter data title"
    value={formData.title}
    onChange={handleChange}
  />
  <textarea
    name="description"
    placeholder="Enter the text"
    value={formData.description}
    onChange={handleChange}
  />
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option disabled selected>
      Select type
    </option>
    {/* ...options... */}
  </select>
  <button type="submit">Add Blog</button>
</form>