import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "./images/logo.png";

const Navbar = () => {
  const links = [
    {
      path: "/matches",
      name: "MATCHES",
    },
    {
      path: "/stats",
      name: "STATS",
    },
    {
      path: "/news",
      name: "NEWS",
    },
  ];

  return (
    <div className="navbar-container">
      {/* Navbar */}
      <nav className="navbar fixed top-0 z-40 bg-donkerblauw border-b border-white text-white flex justify-between items-center px-4 lg:px-16">
        {/* Hamburger menu voor mobile */}
        <div className="block lg:hidden">
          <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 lg:w-10 lg:h-10 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        
        {/* Logo */}
        <Link to="/euroscores" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-16 lg:h-20" /> {/* Aangepaste hoogte van het logo */}
        </Link>
        
        {/* Navbar links */}
        <ul className="hidden lg:flex space-x-8">
          {links.map(({ path, name }) => (
            <li key={name}>
              <NavLink to={path} activeClassName="text-yellow-400" className="text-white">{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar (Drawer) */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle hidden lg:hidden" />
      <div className="drawer-side lg:hidden z-50">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-donkerblauw">
          {links.map(({ path, name }) => (
            <li key={name}>
              <Link to={path} className="text-white">{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
