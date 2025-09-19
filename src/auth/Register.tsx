import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../config/firebaseConfig";
import { useTheme } from "../context/themeContext";

const Register: React.FC = () => {
  const { darkMode } = useTheme();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    blogTitle: "",
    blogPresentation: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password || !userInfo.blogTitle || !userInfo.blogPresentation) {
      console.log("Please fill all fields");
      return;
    }
  
    try {
      const user = await signUp(userInfo.email, userInfo.password, userInfo.blogTitle, userInfo.blogPresentation);
      console.log("User registered:", user);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };


  return (
  <div className={`container ${darkMode ? "container-dark" : "container-light"}`}>
    <h3 className={`auth-title ${darkMode ? "dark-color" : ""}`}>Register Page</h3>
    <form>
      <div className="input-box">
        <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
          User Email :
        </label>
        <input
          className={`input ${darkMode ? "input-dark" : ""}`}
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
      </div>
      <div className="input-box">
        <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
          Password :
        </label>
        <input 
          className={`input ${darkMode ? "input-dark" : ""}`}
          name="password"
          value={userInfo.password}
          type='password'
          autoComplete="current-password"
          onChange={handleChange}
        />
      </div>
      <div className="input-box">
        <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
          Blog Title :
        </label>
        <input 
          className={`input ${darkMode ? "input-dark" : ""}`}
          name="blogTitle"
          value={userInfo.blogTitle}
          type='text'
          onChange={handleChange}
        />
      </div>      <div className="input-box">
        <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
          Blog Presentation :
        </label>
        <textarea 
          className={`input ${darkMode ? "input-dark" : ""}`}
          name="blogPresentation"
          value={userInfo.blogPresentation}
          rows={3}
          onChange={handleChange}
        />
      </div>
      <div className="auth-sub">
        <p className={darkMode ? "dark-color" : ""}>
          You already have your account?
        </p>
        <Link to="/login">Login</Link>
      </div>
      <div className="auth-btn-box">
        <button 
          className="btn btn-blue"
          onClick={handleSubmit}
        >
          Register
        </button>
        <button className={`btn btn-right ${darkMode ? "btn-gray": "btn-outline"}`}>
          Cancel
        </button>
      </div>
    </form>

  </div>
  )
}

export default Register;