import { useTheme } from "../context/themeContext";

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  return (
    <div className={`footer ${darkMode ? "dark-color" : ""}`}>
      ©{currentYear} Moe Quénault
    </div>
  )
}

export default Footer;