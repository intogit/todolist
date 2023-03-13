import { useState } from "react";
import React from "react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const credentialsContext = React.createContext(null);

function App() {
  const credentialsState = useState(null); 
  return (
    <div className="App">
      <div>
        <credentialsContext.Provider value={credentialsState}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Welcome />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
            </Routes>
          </Router>
        </credentialsContext.Provider>
      </div>
    </div>
  );
}

export default App;
