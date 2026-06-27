import React, { useState } from 'react';
import "./NavBar.css";
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleWatchlistClick = () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
    } else {
      navigate("/watchlist");
    }
  };


  return (
    <div id='navbar'>
      <div className="nav-list">
        <img className='logo' src="/logo.webp" alt="logo" />
        <ul className='ul-list'>
          <h3 onClick={handleWatchlistClick} className='mylist'>
            <i className="bxf bx-list-play" style={{ color: "#ff0000" }} /> My List
          </h3>

          <div className="profile-sec">

            {user ? (
              <div className="dropdown-container">

                <p
                  className="user_name"
                  onClick={() => setOpen(!open)}
                >

                  Hi {user.name} <i className="bxf bx-user" style={{ color: "#f10000" }} />


                </p>

                {open && (
                  <div className="dropdown-menu">
                    <Link to='/watchlist'><i className="bxf bx-list-play" style={{ color: "#ff0000" }} /> My List</Link>
                    <button className='logout-btn' onClick={handleLogout}>
                      <i class="bxf bx-arrow-out-left-square-half" style={{ color: "#ff0000" }} /> Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <Link to='/login' className='sign-btn'>
                <i class="bxf bx-arrow-in-right-square-half" style={{ color: "#f10000" }} />Login
              </Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
