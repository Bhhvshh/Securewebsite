import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("https://securewebsite.onrender.com/api/v1/get/catagories", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories");
      }
    };
    fetchAllCategories();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("category", input.category);
      formData.append("description", input.description);

      const res = await axios.post("https://securewebsite.onrender.com/api/v1/add/blog",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data is securely stored");
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='container shadow' style={{
      borderRadius: "10px",
      backgroundColor: "#f9f9f9", // Light background color
      padding: "20px",
    }}>
      <h2 className='text-center my-3' style={{ color: "#333" }}>Store new encrypted data</h2>
      <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label' style={{ color: "#555" }}>
                Title
              </label>
              <input
                type='text'
                name='title'
                value={input.title}
                onChange={handleChange}
                className='form-control'
                id='title'
                placeholder='Enter data title'
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='category' className='form-label' style={{ color: "#555" }}>
                Type
              </label>
              <select
                className='form-control'
                name='category'
                onChange={handleChange}
                style={{ borderRadius: "5px" }}
              >
                <option disabled selected>
                  Select type
                </option>
                {categories && categories.map((item) => {
                  return <option value={item._id}>{item.title}</option>
                })}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label' style={{ color: "#555" }}>
                Text
              </label>
              <textarea
                name='description'
                value={input.description}
                onChange={handleChange}
                placeholder='Enter the text'
                className='form-control'
                id='description'
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-block' style={{
                backgroundColor: "#28a745", // Green button
                color: "#fff",
                borderRadius: "5px"
              }}>
                Store Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
