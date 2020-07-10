import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Detailpage from "./pages/Detailpage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Route path="/" component={Main} exact />
      <Route path="/login" component={Loginpage} />
      <Route path="/signup" component={Signuppage} />
      <Route path="/detail" component={Detailpage} />
      <Route path="/write" component={WritePage} />
    </BrowserRouter>
  );
}

export default App;
