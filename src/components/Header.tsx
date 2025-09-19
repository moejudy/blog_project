import React from "react";
import { logOut } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/themeContext";
import logoWhite from "../../public/logo_white.png";
import logoBlack from "../../public/logo_black.png";

interface HeaderProps {
  userLoggedIn: boolean;
}
const Header: React.FC<HeaderProps> = ({ userLoggedIn }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`header ${darkMode ? "header-dark" : "header-light"}`}>
      <div className="header-box">
        <ThemeToggle/>
        <img
          src={darkMode ? logoWhite : logoBlack}
          alt="logo" className="logo-header"
          onClick={() => navigate("/")}
        />
        { userLoggedIn ? 
          <button 
            onClick={() => logOut()}
            className="btn-header"
          >Logout</button> :
          <button
            onClick={() => navigate("/login")}
            className="btn-header"
          >Login</button>
        }
      </div>
    </div>
 
  )
}

export default Header;