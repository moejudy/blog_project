import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../config/firebaseConfig";
import { useTheme } from "../context/themeContext";
import { FirebaseError } from "firebase/app"
import Popup from "../components/Popup";

const Register: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    blogTitle: "",
    blogPresentation: ""
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

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
      setError("Please fill all fields")
      return;
    }
  
    try {
      const user = await signUp(userInfo.email, userInfo.password, userInfo.blogTitle, userInfo.blogPresentation);
      console.log("User registered:", user);

      if (user) {
        setShowPopup(true);
      }
    } catch (err: unknown) {
      console.error("Registration error:", error);
      let message = "Registration failed: Unknown error occurred.";

      if (err instanceof FirebaseError) {
          if (err.code === "auth/email-already-in-use") {
            message = "Registration failed: This email is already in use.";
          } else if (err.code === "auth/weak-password") {
            message = "Registration failed: Password is too weak.";
          } else {
            message = `Registration failed: ${err.message}`;
          }
        } else if (err instanceof Error) {
          // JS の一般的なエラー
          message = `Registration failed: ${err.message}`;
        }

      
      setError(message);
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
      </div>
      <div className="input-box">
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

      {error && <div className="error">{error}</div>}
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



    {showPopup && (
      <Popup 
        title="Registeration Success"
        message="Please login"
        onClose={() => navigate("/login")}
      
      />
    )}

  </div>
  )
}

export default Register;