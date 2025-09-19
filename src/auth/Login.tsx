import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../config/firebaseConfig";
import { getBlogTitleByEmail } from "../config/firebaseBlogDataConfig"
import { useTheme } from "../context/themeContext";

const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    email:"",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      console.log("Please enter both email and password");
      return;
    }
    
    const success = await signIn(userInfo.email, userInfo.password);
   
    if (success) {
      console.log("Login successful", userInfo);

      const blogTitle = await getBlogTitleByEmail(userInfo.email);

      if (blogTitle) {
        navigate(`/blog?blog=${encodeURIComponent(blogTitle.replace(/\s+/g, ""))}`);
      }

    } else {
      setMessage("Login failed. ")
    }
  };
  
  return (
    <div className={`container ${darkMode ? "container-dark" : "container-light"}`}>
      <h3 className={`auth-title ${darkMode ? "dark-color" : ""}`}>Login Page</h3>
      <form>
        <div className="input-box">
          <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
            User Email :
          </label>
          <input 
            className={`input ${darkMode ? "input-dark" : ""}`}
            onChange={handleChange}
            name="email"
            value={userInfo.email}
          />
        </div>
        <div className="input-box">
          <label className={`input-label ${darkMode ? "dark-color" : ""}`}>
            Password :
          </label>
          <input 
            className={`input ${darkMode ? "input-dark" : ""}`}
            type='password'
            onChange={handleChange}
            name="password"
            value={userInfo.password}
          />
        </div>

        <div className="message">{message}</div>
        <div className="auth-sub">
        <p className={darkMode ? "dark-color" : ""}>
          You don't have an account?
        </p>
        <Link to="/register">Create your account</Link>
      
      </div>
        <div className="auth-btn-box">
          <button
            className="btn btn-blue"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button className="btn btn-outline btn-right">Cancel</button>
        </div>
      </form>

    </div>
  )
}

export default Login;