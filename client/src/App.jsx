import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from ".SingleBlog.jsx";
import Login from ".Login.jsx";
import Register from ".Register.jsx";
import Header from '.Header.jsx';
import AddCategory from '.AddCategory.jsx';
import AddBlog from '.AddBlog.jsx';
import SingleBlog from '.SingleBlog.jsx';
import PrivateRoute from '.Protected.jsx';



const App = () => {
  return (
    <>
   <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path='/' element={<PrivateRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        </Route>


      </Routes>
      </>
   
  );
};

export default App;
