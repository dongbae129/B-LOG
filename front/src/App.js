import React from "react";
import "./App.css";
import Header from "./component/Header";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import WritePage from "./pages/WritePage";
import Personalpage from "./pages/Personalpage";
import Subscribe from "./pages/Subscribe";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div>
      <Header />

      <Route path="/" component={Main} exact />
      <Route path="/login" component={Loginpage} />
      <Route path="/signup" component={Signuppage} />
      <Route path="/write" component={WritePage} />
      <Route path="/detail/:userId/:postId" component={DetailPage} />
      <Route path="/personal/:userId" component={Personalpage} />
      <Route path="/subscribe" component={Subscribe} />
    </div>
  );
}

export default App;
