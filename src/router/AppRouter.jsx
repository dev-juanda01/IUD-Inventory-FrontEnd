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

export default function AppRouter() {
  return (
    <>
      <OffCanvas />
      <ColorPage />
      <SingleColorBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/estados" element={<Estados />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/inventarios" element={<Inventarios />} />
        </Routes>
      </div>
    </>
  );
}
