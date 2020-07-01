import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Route path="/" component={Main} exact />
      <Route path="/login" component={Loginpage} />
      <Route path="/signup" component={Signuppage} />
    </BrowserRouter>
  );
}

export default App;
