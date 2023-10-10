import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <nav>
        <NavLink to={"/"}>
          🏠 Home
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderComponent;
