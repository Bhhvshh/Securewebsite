export const createBlog = async (blogData) => {
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("description", blogData.description);
  formData.append("category", blogData.category);
  // Removed thumbnail field

  const response = await fetch("/api/v1/blogs", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  return response.json();
};
