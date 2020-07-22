import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import WritePage from "./pages/WritePage";
import Personalpage from "./pages/Personalpage";
import Subscribe from "./pages/Subscribe";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Route path="/" component={Main} exact />
      <Route path="/login" component={Loginpage} />
      <Route path="/signup" component={Signuppage} />
      <Route path="/write" component={WritePage} />
      <Route path="/detail" component={DetailPage} />
      <Route path="/personal/:nickname" component={Personalpage} />
      <Route path="/subscribe" component={Subscribe} />
    </BrowserRouter>
  );
}

export default App;
