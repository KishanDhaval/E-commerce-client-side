import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from '../../hooks/useLogout';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';

import {  Badge } from 'antd';

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {categories} = useCategory()
  const [cart ] = useCart()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            🛒 E-Commerce App
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to={`/categories`} id="categoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li><Link className="dropdown-item" to={`/categories`}>All categories</Link></li>
                {categories?.map((c) => (
                  <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </li>

            {user ? (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" onClick={toggleDropdown} role="button" aria-expanded={dropdownOpen}>
                  {user?.name}
                </Link>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li><Link className="dropdown-item" to={`/dashboard/${user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                  <li><button className="logout-btn dropdown-item" onClick={handleLogout}>Log out</button></li>
                </ul>
              </li>
            ) : (
              <div style={{ display: 'flex' }}>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Signup
                  </NavLink>
                </li>
              </div>
            )}

            <li className="nav-item">
              <Badge count={cart?.length} showZero>
              <NavLink className="nav-link" to="/cart">
               Cart 
              </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
