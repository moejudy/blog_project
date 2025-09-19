import "./index.css";
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { UserProvider } from "./context/userContext.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
)
