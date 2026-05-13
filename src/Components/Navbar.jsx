import { useState } from "react";
import { NavLink } from "react-router";
import authStore from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, logout } = authStore();

  function toggleMobile() {
    setIsOpen((prev) => !prev);
  }

  function closeMobile() {
    setIsOpen(false);
  }

  return (
    <>
      <nav>
        <NavLink className="logo" to={"/"}>
          FOODY<span>.</span>JUNCTION
        </NavLink>

        <ul className="nav-links">
          <li>
            <a href="#hero">HOME</a>
          </li>
          <li>
            <a href="#menu">MENU</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
          <li>
            {isAuth ? (
              <NavLink className="nav-cta" onClick={logout}>
                Logout
              </NavLink>
            ) : (
              <NavLink className="nav-cta" to={"/login"}>
                Login
              </NavLink>
            )}
          </li>
        </ul>

        <button className="hamburger" onClick={toggleMobile} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <a href="#hero" onClick={closeMobile}>
          HOME
        </a>
        <a href="#menu" onClick={closeMobile}>
          MENU
        </a>
        <a href="#about" onClick={closeMobile}>
          ABOUT
        </a>
        <a href="#contact" onClick={closeMobile}>
          CONTACT
        </a>
        <a
          href="#"
          onClick={() => {
            closeMobile();
          }}
        >
          ORDER NOW
        </a>
      </div>
    </>
  );
};

export default Navbar;
