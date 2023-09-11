import React from "react";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users">
            <Route path=":title" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
