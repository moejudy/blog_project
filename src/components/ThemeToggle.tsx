
 import { useTheme } from "../context/themeContext";
 import { MdDarkMode, MdLightMode } from "react-icons/md"

      const ThemeToggle = () => {
        const { darkMode, toggleTheme } = useTheme();
      
        return (
          <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className={`slider ${darkMode ? "dark" : "light"}`}>
            <MdLightMode className={`icon-toggle ${darkMode ? "icon-t-1": "icon-t-2"}`}/>
            <MdDarkMode className={`icon-toggle ${darkMode ? "" : "icon-t-3"}`} />
          </span>
        </label>
        );
      };
      
      export default ThemeToggle;
      