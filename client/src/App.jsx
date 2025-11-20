import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewNotePage from "./pages/NewNotePage";
import EditNotePage from "./pages/EditNotePage";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new' element={<NewNotePage />} />
        <Route path='/edit/:id' element={<EditNotePage />} />
      </Routes>
    </Router>
  );
}
