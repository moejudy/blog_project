import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig.ts";
import { useTheme } from "./context/themeContext.tsx";
import Top from "./components/Top.tsx";
import Login from "./auth/Login.tsx";
import Register from "./auth/Register.tsx";
import Header from "./components/Header.tsx";
import BlogPageWrapper from "./components/BlogPageWrapper.tsx";
import Footer from "./components/Footer.tsx";


const App: React.FC = () =>  {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  console.log("User LOGIN:", userLoggedIn);

  const { darkMode } = useTheme();

  console.log("dark Mode in APP", darkMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:" , user);
        setUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={`bg ${darkMode ? "bg-dark": "bg-white"}`}>
      <Router>
        <Header userLoggedIn={userLoggedIn}/>
        <div className="top">
          <Routes>
            <Route path="/" element={<Top userLoggedIn={userLoggedIn}/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/blog" element={<BlogPageWrapper userLoggedIn={userLoggedIn}/>} />
          </Routes>
        </div>
        <Footer />
  
      </Router>
    </div>

  )
}

export default App;
