import React from "react";
import logo from "./logo.svg";

import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Node 3 Project - </h1>
      </header>
      <main className="container">
        <h2>My App</h2>
        <NavBar />
      </main>
    </div>
  );
}

export default App;
