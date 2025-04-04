import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout..");
    navigate("/login");
  };

  return (
    <>
      <div className="header" style={{
        backgroundColor: "#ff9800", // Orange color
        color: "#fff",
        padding: "10px",
        textAlign: "center",
        borderRadius: "5px"
      }}>
        <h1>Secure Website</h1>
      </div>
      <nav className='navbar navbar-expand-lg' style={{
        backgroundColor: "#28a745", // Green color
        color: "#fff",
        borderRadius: "5px",
        padding: "10px"
      }}>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/' style={{ color: "#fff" }}>
            SecureStorage
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/' style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/add-blog' style={{ color: "#fff" }}>
                  Store Data
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/add-category' style={{ color: "#fff" }}>
                  Add Types
                </Link>
              </li>
            </ul>
            <div className='d-flex'>
              {token ? (
                <>
                  <button className='btn btn-light mx-3'>Welcome: {username}</button>
                  <button className='btn btn-light' onClick={handlelogout}>LogOut</button>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <button className='btn btn-light mx-2'>Login</button>
                  </Link>
                  <Link to='/register'>
                    <button className='btn btn-light mx-2'>Register</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
