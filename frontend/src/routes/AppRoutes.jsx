import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Property from "../pages/Property";
import AddProperty from "../pages/AddProperty";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<Property />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
