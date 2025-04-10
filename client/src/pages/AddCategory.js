import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

  const navigate = useNavigate();
  const [input,setInput] = useState({
    title:"",
  })

  const handleCategory = async (e) =>
  {
    e.preventDefault();
    try {
       const res = await axios.post("https://securewebsite.onrender.com/api/v1/add/catagory",input,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
       );
       alert("New type added");
       navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className='container shadow' style={{
      borderRadius: "10px",
      backgroundColor: "#e0ffff", // Cyan background color
      padding: "20px",
    }}>
      <h2 className='text-center my-3' style={{ color: "#333" }}>Add a New Type</h2>
      <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleCategory}>
            <div className='mb-3'>
              <label htmlFor='categoryName' className='form-label' style={{ color: "#555" }}>
                Type Name
              </label>
              <input
                type='text'
                name='title'
                value={input.title}
                onChange={(e)=>setInput({...input,[e.target.name] : e.target.value})}
                className='form-control'
                id='categoryName'
                placeholder='Type Name'
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-block' style={{
                backgroundColor: "#28a745", // Green button
                color: "#fff",
                borderRadius: "5px"
              }}>
                Add Type
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
