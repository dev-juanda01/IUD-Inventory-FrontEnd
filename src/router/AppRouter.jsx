import React from "react";
import OffCanvas from "../components/OffCanvas";
import ColorPage from "../components/ColorPage";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Tipos from "../components/Tipos";
import Estados from "../components/Estados";
import Marcas from "../components/Marcas";
import Usuarios from "../components/Usuarios";
import Inventarios from "../components/Inventarios";
import SingleColorBar from "../components/SingleColorBar";
import Footer from "../components/Footer";

export default function AppRouter({ darkMode, lightMode, theme, setTheme }) {
  return (
    <>
      <div className="super-container">
        <OffCanvas darkMode={darkMode} lightMode={lightMode} theme={theme} />
        <ColorPage
          darkMode={darkMode}
          lightMode={lightMode}
          theme={theme}
          setTheme={setTheme}
        />
        <SingleColorBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tipos" element={<Tipos theme={theme} />} />
            <Route path="/estados" element={<Estados theme={theme} />} />
            <Route path="/marcas" element={<Marcas theme={theme} />} />
            <Route path="/usuarios" element={<Usuarios theme={theme} />} />
            <Route
              path="/inventarios"
              element={<Inventarios theme={theme} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}
