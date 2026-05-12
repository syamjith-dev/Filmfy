import React from 'react'
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src="/logo.webp" alt="logo" />
      <div className="nav-list">
        <ul>
          <li>Home</li>
          <li>Tv shows</li>
          <li>Movies</li>
          <li>Latest</li>
          <li>My List</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
