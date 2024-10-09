import React, { useState } from "react";
import "./Navbar.css";
import rainbowLogo from "../images/RainbowLogo.svg";
import { NavLink } from "react-router-dom";
import cartIcon from "../images/CartIcon.svg";
import WhatsappIcon from "../images/WhatsappIcon.svg";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="logoContainer">
          <img src={rainbowLogo} alt="rainbowLogo" />
        </div>

        <div className="navbarContentsContainer">
          <div className={isOpen ? "navLinks active" : "navLinks"}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active" : "navbarContent"
              }
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/plants/All"
              className={({ isActive }) =>
                isActive ? "active" : "navbarContent"
              }
            >
              <span>Shop</span>
            </NavLink>

            {/* <NavLink
              to="/fertilizer"
              className={({ isActive }) =>
                isActive ? "active" : "navbarContent"
              }
            >
              <span>Fertilizer</span>
            </NavLink> */}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active" : "navbarContent"
              }
            >
              <span>Contact us</span>
            </NavLink>

            {/* <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : "navbarContent"
              }
            >
              <span>About us</span>
            </NavLink> */}

            {/* <NavLink
              onClick={toggleMenu}
            >
              <span>Close</span>
            </NavLink> */}

            <NavLink to="https://wa.me/917012351551?text=I'm%20interested%20in%20your%20Plants%20"><img src={WhatsappIcon} alt=""/></NavLink>
          </div>

          {/* <div className="cartIconContainer">
            <NavLink to="/cart">
              <img src={zz} alt="cartIcon" />
            </NavLink>
          </div> */}

          <div className="hamburger" onClick={toggleMenu}>
            <span class="bar1"></span>
            <span class="bar2"></span>
            <span class="bar3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
