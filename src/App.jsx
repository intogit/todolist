import { useState } from "react";
import React from "react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export const credentialsContext = React.createContext(null);

function App() {
  const credentialsState = useState(null); 
  return (
    <div className="App">
      <div className="p-5">
        <credentialsContext.Provider value={credentialsState}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Welcome />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/dashboard" element={<Dashboard/>}></Route>
            </Routes>
          </Router>
        </credentialsContext.Provider>
      </div>
    </div>
  );
}

export default App;
