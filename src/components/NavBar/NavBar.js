import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const NavBar = () => {
  return (
    <header>
      <nav>
        <div></div>
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
