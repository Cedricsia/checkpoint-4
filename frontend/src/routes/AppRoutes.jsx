import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Property from "../pages/Property";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<Property />} />
    </Routes>
  );
}

export default AppRoutes;
