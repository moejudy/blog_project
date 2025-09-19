import React from "react";
import Register from "../auth/Register";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import logoWhite from "../../public/logo_white.png";
import logoBlack from "../../public/logo_black.png";

interface TopProps {
  userLoggedIn: boolean;
}

const Top: React.FC<TopProps> = () => {
  const location = useLocation();
  const { darkMode } = useTheme();

  const isHomePage = location.pathname === "/";

  return (
  <div>
    <div className={`top-box ${darkMode ? "background-box-dark": "background-box-light"}`}>
      <img src={darkMode ? logoWhite : logoBlack} className="logo"/>
      <div className={`introduction ${darkMode ? "textColor-dark" : "textColor-light"}`}>
        <p>Easily create and share your own blog with friends.</p>
        <p>
        No complicated setup—just write, post, and connect. Start your blogging journey today!</p>
      </div>
    </div>
    
    {isHomePage && <Register />}
    <Link to="/blog?blog=JudyBlog">Example of blog</Link>
  </div>

  )

};

export default Top;